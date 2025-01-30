const socket = io();
const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = document.getElementById('nickname').value;
  const message = document.getElementById('message').value;

  const comment = { nickname, message };
  socket.emit('newComment', comment);
  document.getElementById('message').value = '';
});

// Получение комментариев с сервера
fetch('/api/comments')
  .then(response => response.json())
  .then(comments => {
    comments.forEach(comment => {
      addCommentToList(comment);
    });
  });

// Обработка новых комментариев
socket.on('receiveComment', (comment) => {
  addCommentToList(comment);
});

// Функция для добавления комментария в список
function addCommentToList(comment) {
  const li = document.createElement('li');
  li.textContent = `${comment.nickname}: ${comment.message}`;
  commentsList.prepend(li);
}
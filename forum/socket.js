const socketIo = require('socket.io');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Новый пользователь подключен');

    // Отправка новых комментариев всем клиентам
    socket.on('newComment', (comment) => {
      io.emit('receiveComment', comment);
    });

    socket.on('disconnect', () => {
      console.log('Пользователь отключен');
    });
  });
};
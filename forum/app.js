const express = require('express');
const mongoose = require('mongoose');
const commentRoutes = require('./routes/comments');
const socket = require('./socket');
const app = express();
const http = require('http').createServer(app);

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/forum', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Маршруты
app.use('/api/comments', commentRoutes);

// Socket.IO
socket(http);

// Запуск сервера
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
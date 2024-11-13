const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();

const favoritesRouter = require('./routes/favorites');
const generatorRouter = require('./routes/generator');
const namesRouter = require('./routes/names');

const app = express();

// 安全和性能中间件
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// SEO相关中间件
app.use((req, res, next) => {
  // 允许搜索引擎爬虫
  res.setHeader('X-Robots-Tag', 'index, follow');
  next();
});

// MongoDB连接
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API路由
app.use('/api/favorites', favoritesRouter);
app.use('/api/generator', generatorRouter);
app.use('/api/names', namesRouter);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
const mongoose = require('mongoose');

const petNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  meaning: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'bird']
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  personality: {
    type: String,
    required: true,
    enum: ['friendly', 'brave', 'cute']
  },
  language: {
    type: String,
    required: true,
    enum: ['en', 'zh']
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  views: {
    type: Number,
    default: 0
  },
  culturalContext: String,
  origin: String,
  isGenerated: {
    type: Boolean,
    default: false
  },
  combinationInfo: String
}, {
  timestamps: true
});

// 添加索引以提高查询性能
petNameSchema.index({ slug: 1 });
petNameSchema.index({ type: 1, language: 1, personality: 1 });
petNameSchema.index({ createdAt: -1 });

module.exports = mongoose.model('PetName', petNameSchema); 
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const PetName = require('../models/PetName');

// 获取用户收藏列表
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('favorites');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 添加收藏
router.post('/:userId', async (req, res) => {
  try {
    const { nameId } = req.body;
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 检查是否已经收藏
    if (user.favorites.includes(nameId)) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    user.favorites.push(nameId);
    await user.save();

    const updatedUser = await User.findById(req.params.userId)
      .populate('favorites');

    res.json(updatedUser.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除收藏
router.delete('/:userId/:nameId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter(
      id => id.toString() !== req.params.nameId
    );
    
    await user.save();
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
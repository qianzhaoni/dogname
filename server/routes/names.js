const express = require('express');
const router = express.Router();
const PetName = require('../models/PetName');
const slugify = require('slugify');

// 获取名字历史记录
router.get('/history', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 12;
    const skip = (page - 1) * perPage;

    const [records, total] = await Promise.all([
      PetName.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage),
      PetName.countDocuments()
    ]);

    res.json({
      records,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / perPage)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取名字详情
router.get('/:slug', async (req, res) => {
  try {
    const name = await PetName.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!name) {
      return res.status(404).json({ message: 'Name not found' });
    }

    res.json(name);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取相关名字
router.get('/:id/related', async (req, res) => {
  try {
    const name = await PetName.findById(req.params.id);
    if (!name) {
      return res.status(404).json({ message: 'Name not found' });
    }

    const relatedNames = await PetName.find({
      _id: { $ne: name._id },
      type: name.type,
      language: name.language,
      $or: [
        { personality: name.personality },
        { gender: name.gender }
      ]
    }).limit(6);

    res.json(relatedNames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 创建新名字记录
router.post('/', async (req, res) => {
  try {
    const nameData = {
      ...req.body,
      slug: slugify(req.body.name, { lower: true }),
      views: 0
    };

    const name = new PetName(nameData);
    await name.save();
    res.status(201).json(name);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 
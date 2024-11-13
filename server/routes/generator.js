const express = require('express');
const router = express.Router();
const NameGenerator = require('../services/nameGenerator');

router.post('/generate', async (req, res) => {
  try {
    const criteria = req.body;
    const generatedName = await NameGenerator.generateName(criteria);
    
    // 计算名字评分
    const score = NameGenerator.scoreName(generatedName.name, criteria);
    
    res.json({
      name: generatedName,
      score,
      isGenerated: generatedName.isGenerated || false
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
const PetName = require('../models/PetName');

class NameGenerator {
  // 根据条件获取基础名字
  static async getBaseNames(criteria) {
    const { type, gender, personality, language } = criteria;
    
    // 获取完全匹配的名字
    const exactMatches = await PetName.find({
      type,
      gender,
      personality,
      language
    });

    // 获取部分匹配的名字（用于组合）
    const partialMatches = await PetName.find({
      type,
      language,
      $or: [{ gender }, { personality }]
    });

    return {
      exactMatches,
      partialMatches
    };
  }

  // 生成组合名字
  static combineNames(name1, name2, language) {
    if (language === 'zh') {
      // 中文名字组合规则
      if (name1.length === 2 && name2.length === 2) {
        return name1[0] + name2[1]; // 取第一个名字的第一个字和第二个名字的第二个字
      }
      return name1 + name2[name2.length - 1]; // 否则取第一个名字加第二个名字的最后一个字
    } else {
      // 英文名字组合规则
      const firstHalf = name1.slice(0, Math.ceil(name1.length / 2));
      const secondHalf = name2.slice(Math.floor(name2.length / 2));
      return firstHalf + secondHalf;
    }
  }

  // 生成名字的含义解释
  static generateMeaning(name1, name2, personality) {
    const personalityTraits = {
      brave: ['strong', 'courageous', 'fearless', 'bold'],
      cute: ['adorable', 'lovely', 'charming', 'sweet'],
      friendly: ['sociable', 'kind', 'gentle', 'warm']
    };

    const trait = personalityTraits[personality][Math.floor(Math.random() * personalityTraits[personality].length)];
    return `Combined from "${name1}" and "${name2}" - A ${trait} name for your pet`;
  }

  // 主要生成方法
  static async generateName(criteria) {
    const { language } = criteria;
    const { exactMatches, partialMatches } = await this.getBaseNames(criteria);

    // 生成策略：
    // 1. 如果有完全匹配的名字，80%概率直接使用
    // 2. 20%概率或没有完全匹配时，尝试组合名字
    const useExactMatch = Math.random() < 0.8 && exactMatches.length > 0;

    if (useExactMatch) {
      const randomIndex = Math.floor(Math.random() * exactMatches.length);
      return exactMatches[randomIndex];
    }

    // 组合名字
    if (partialMatches.length >= 2) {
      const name1 = partialMatches[Math.floor(Math.random() * partialMatches.length)];
      const name2 = partialMatches[Math.floor(Math.random() * partialMatches.length)];

      if (name1._id === name2._id) {
        return name1; // 如果选到相同的名字，直接返回
      }

      const combinedName = this.combineNames(name1.name, name2.name, language);
      const meaning = this.generateMeaning(name1.name, name2.name, criteria.personality);

      return {
        name: combinedName,
        meaning,
        type: criteria.type,
        gender: criteria.gender,
        personality: criteria.personality,
        language: criteria.language,
        isGenerated: true
      };
    }

    // 如果无法组合，返回部分匹配的名字
    if (partialMatches.length > 0) {
      return partialMatches[Math.floor(Math.random() * partialMatches.length)];
    }

    throw new Error('No suitable names found');
  }

  // 评分系统
  static scoreName(name, criteria) {
    let score = 0;
    const { type, gender, personality } = criteria;

    // 长度评分
    const idealLength = type === 'bird' ? 5 : 6;
    score += 10 - Math.abs(name.length - idealLength);

    // 音节评分（英文）
    if (criteria.language === 'en') {
      const syllables = name.toLowerCase().match(/[aeiou]/g)?.length || 0;
      const idealSyllables = type === 'bird' ? 2 : 3;
      score += 10 - Math.abs(syllables - idealSyllables);
    }

    // 性格匹配评分
    const personalityScores = {
      brave: /^[BKRST]/i,
      cute: /^[MPLW]/i,
      friendly: /^[AEIOU]/i
    };
    if (personalityScores[personality].test(name)) {
      score += 5;
    }

    return Math.min(100, Math.max(0, score));
  }
}

module.exports = NameGenerator; 
class CharacterCalculation {
  CalculationMaxHealth(level = 1) {
    return 5 * level;
  }

  CalculationMaxExperience(level = 1) {
    return 10 ^ level;
  }

  CalculationMaxSkillExperience(level = 1) {
    return 15 ^ level;
  }

  CalculationRewardPunnishmentSkillExperience(level = 1, difficult = 'easy') {
    const baseAttribute = (Math.floor(Math.random() * 10) + 5) + (level ^ 2);

    if (difficult === 'easy') {
      baseAttribute += baseAttribute * 0/100 ;
    } else if (difficult === 'normal') {
      baseAttribute += baseAttribute * 20/100 ;
    } else if (difficult === 'hard') {
      baseAttribute += baseAttribute * 40/100 ;
    }
  }
}

export default CharacterCalculation;

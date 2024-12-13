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
}

export default CharacterCalculation;

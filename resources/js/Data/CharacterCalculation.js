class CharacterCalculation {
  calculationMaxHealth(level = 1) {
    return 5 * level;
  }

  calculationMaxExperience(level = 1) {
    return Math.pow(10, level);
  }

  calculationMaxSkillExperience(level = 1) {
    return Math.pow(15, level);
  }

  calculationExperience({
    skillExp1,
    skillExp2,
    skillExp3,
    skillExp4,
    skillExp5,
  }) {
    return (skillExp1 + skillExp2 + skillExp3 + skillExp4 + skillExp5) / 5;
  }
}

export default CharacterCalculation;

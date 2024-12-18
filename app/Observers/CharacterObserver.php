<?php

namespace App\Observers;

use App\Events\LevelCharacterEvent;
use App\Models\Character;

class CharacterObserver
{
  public function updated(Character $character)
  {
    $maxSkillExperience = 0;
    $experienceTotal = 0;

    foreach ($character->skills as $skill) {
      $maxSkillExperience = pow(15, $skill->level);
      $skillLevelUp = $skill->level + 1;
      $experienceTotal += ($skill->level / 5);

      if ($skill->experience >= $maxSkillExperience) {
        $skill->experience = $skill->experience - $maxSkillExperience;
        $skill->level = $skillLevelUp;
        $skill->save();
      }
    }

    $character->experience = $experienceTotal;
    $character->save();
    $maxCharacterExperience = pow(10, $character->level);
    $characterLevelUp = $character->level + 1;

    if ($character->experience >= $maxCharacterExperience) {
      $character->level = $characterLevelUp;
      $character->save();
    }

    event(new LevelCharacterEvent($character));
  }
}

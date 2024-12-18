<?php

namespace App\Observers;

use App\Events\LevelCharacterEvent;
use App\Models\Skill;

class SkillObserver
{
  public function updated(Skill $skill)
  {
    $character = $skill->character;
    if ($character) {
      $character->checkLevelUp();
    }
  }
}

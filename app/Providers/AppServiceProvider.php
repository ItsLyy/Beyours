<?php

namespace App\Providers;

use App\Models\Character;
use App\Models\Skill;
use App\Observers\CharacterObserver;
use App\Observers\SkillObserver;
use Validator;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   */
  public function register(): void
  {
    //
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void
  {
    Character::observe(CharacterObserver::class);
    Skill::observe(SkillObserver::class);
    Validator::extend('without_spaces', function ($attr, $value) {
      return preg_match('/^\S*$/u', $value);
    });
    Vite::prefetch(concurrency: 3);
  }
}

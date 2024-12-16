<?php

use App\Http\Controllers\AssignmentCommunityController;
use App\Http\Controllers\AttendanceCommunityController;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MemberCommunityController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\CharacterMiddleware;
use App\Http\Middleware\OwnerCommunityMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
  Route::post('/task/{task}/done', [TaskController::class, 'done'])->name('task.done');
  Route::resource('task', TaskController::class);
  Route::post('/community/join/{token}', [CommunityController::class, 'join'])->name('community.join');
  Route::resource('community.assignment', AssignmentCommunityController::class);
  Route::get('/community/{community}/attendance/report', [AttendanceCommunityController::class, 'report'])->name('community.attendance.report');
  Route::put('/community/{community}/attendance/{attendance}/verify', [AttendanceCommunityController::class, 'verify'])->middleware(OwnerCommunityMiddleware::class)->name('community.attendance.verify');
  Route::resource('community.attendance', AttendanceCommunityController::class);
  Route::resource('community.member', MemberCommunityController::class);
  Route::resource('community', CommunityController::class);
  Route::resource('character', CharacterController::class)->middleware([CharacterMiddleware::class]);
});

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

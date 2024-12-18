<?php

namespace App\Http\Controllers;

use App\Events\LevelCharacterEvent;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $character = auth()->user()->character;
    $tasks = $character->tasks()->paginate(10);

    return inertia('Task/Index', [
      "tasks" => TaskResource::collection($tasks),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $character = auth()->user()->character;
    $skills = $character->skills;

    return inertia('Task/Create', [
      'skills' => $skills,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $character = auth()->user()->character;

    $validateData = $request->validate([
      "title" => 'required|string|max:500',
      'description' => 'nullable|string|max:500',
      'due_at' => 'nullable|date',
      'category' => 'nullable|string',
      'difficult' => 'nullable|string',
    ]);

    $difficulty = $validateData['difficult'];
    $rewards = [
      ["name" => "health"],
      ["name" => "dicipline"],
      ["name" => "charisma"],
    ];

    $rewards[] = $validateData['category'] !== 'none' ? ["name" => $validateData['category']] : $rewards;

    for ($i = 0; $i < count($rewards); $i++) {
      $baseAttribute = (mt_rand(5, 10 + ($character->level * 2))) + ($character->level ** 2);

      if ($difficulty === 'easy') {
        $baseAttribute += $baseAttribute * (0 / 100);
      } elseif ($difficulty === 'normal') {
        $baseAttribute += $baseAttribute * (20 / 100);
      } elseif ($difficulty === 'hard') {
        $baseAttribute += $baseAttribute * (40 / 100);
      }

      $rewards[$i]["quantity"] = floor($baseAttribute);
    }

    $taskCreated = Task::create([
      "title" => $validateData['title'],
      "description" => $validateData['description'],
      "due_at" => $validateData['due_at'],
      "assign_by" => $character->id,
    ]);

    $taskCreated->assignTo()->syncWithoutDetaching([
      ($character->id) => [
        "done" => false,
      ]
    ]);

    $rewards[0]['task_id'] = $taskCreated->id;
    $rewards[1]['task_id'] = $taskCreated->id;
    $rewards[2]['task_id'] = $taskCreated->id;
    $rewards[3]['task_id'] = $taskCreated->id;


    $taskCreated->rewards()->insert($rewards);

    return to_route("task.index");
  }

  /**
   * Display the specified resource.
   */
  public function show(Task $task)
  {
    return inertia('Task/Show', [
      "task" => new TaskResource($task),
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id) {}

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Task $task)
  {
    $character = auth()->user()->character;
    $task->assignTo()->detach($character->id);

    if ($task->where('assign_by', $character->id)) {
      $task->delete();
    }

    return to_route('task.index');
  }

  public function done(String $id)
  {
    $character = auth()->user()->character;
    $task = Task::find($id);

    if ($task) {
      if ($character) {
        foreach ($task->rewards as $reward) {
          foreach ($character->skills as $skill) {
            if (strtolower($skill->name) === strtolower($reward['name'])) {
              $skillImprovement = $skill->experience + $reward['quantity'];
              $skill->update([
                "experience" => $skillImprovement,
              ]);
              $reward->delete();
            }
          }
        }
        $characterId = auth()->user()->character->id;
        $task->assignTo()->syncWithoutDetaching([
          $characterId => ['done' => true]
        ]);
      }

      return to_route('task.index')->with('success', 'Task deleted successfully and experience updated.');
    }
    return to_route('task.index')->with('error', 'Task not found.');
  }
}

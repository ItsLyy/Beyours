<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskDetailResource;
use App\Models\Character;
use App\Models\CharacterTask;
use App\Models\Task;
use Illuminate\Http\Request;

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
      "tasks" => TaskDetailResource::collection($tasks),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return inertia('Task/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validateData = $request->validate([
      "title" => 'required|string|max:500',
      'description' => 'nullable|string|max:500',
      'due_at' => 'nullable|date',
    ]);

    $character = auth()->user()->character;

    $taskCreated = Task::create([
      "title" => $validateData['title'],
      "description" => $validateData['description'],
      "due_at" => $validateData['due_at'],
      "assign_by" => $character->id,
    ]);

    CharacterTask::create([
      "task_id" => $taskCreated->id,
      "assign_to" => $character->id,
      "done" => false,
    ]);

    return to_route("task.index");
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    $task = CharacterTask::find($id)->first();

    return inertia('Task/Show', [
      "task" => new TaskDetailResource($task),
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
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(String $id)
  {
    $task = CharacterTask::find($id);

    if ($task) {
      $id = $task->task_id;
      $task->delete();
      Task::destroy($id);
      return to_route('task.index')->with('success', 'Task deleted successfully.');
    }

    return to_route('task.index')->with('error', 'Task not found.');
  }
}

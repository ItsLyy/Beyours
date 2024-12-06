<?php

namespace App\Http\Controllers;

use App\Http\Resources\AttendanceMemberResource;
use App\Http\Resources\CommunityMemberResource;
use App\Models\Attendance;
use App\Models\Community;
use App\Models\CommunityAttendances;
use App\Models\CommunityAttendance;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AttendanceCommunityController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Community $community)
  {
    $character = auth()->user()->character;
    $startOfDay = Carbon::today();
    $endOfDay = Carbon::tomorrow();

    $community->load('attendances');
    $attendance = $community->attendances->filter(function ($attendance) use ($startOfDay, $endOfDay) {
      return $attendance->created_at->between($startOfDay, $endOfDay);
    })->first();

    return inertia('Community/Attendance/Index', [
      "community" => $community,
      "yourCharacter" => $character->communities->where('pivot.community_id', $community->id)->first(),
      "attendanceDatas" => AttendanceMemberResource::collection($attendance->characters),
      "members" => CommunityMemberResource::collection($community->characters),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create(Community $community)
  {
    $character = auth()->user()->character;
    return inertia("Community/Attendance/Create", [
      "community" => $community,
      "yourCharacter" => $character->communities->where('pivot.community_id', $community->id)->first(),
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Community $community, Request $request)
  {
    $character = auth()->user()->character;


    $validatedAttendance = $request->validate([
      "journal" => 'required|string',
      "status" => 'required|max:30|string',
      "first_journal_image" => 'required|mimes:png,jpg,jpeg,webp',
    ]);


    if ($request->has('first_journal_image')) {
      $fileJournalPhoto = $request->file('first_journal_image');
      $extensionJournalPhoto = $fileJournalPhoto->getClientOriginalExtension();

      $filenameJournalPhoto = time() . '.' . $extensionJournalPhoto;
      $pathJournalPhoto = 'images/community_attendance/' . $community->id . '/' . Carbon::now()->timestamp . '/' . str()->random(20);
      $fileJournalPhoto->move($pathJournalPhoto, $filenameJournalPhoto);
    }

    $attendanceData = [
      'journal' => $validatedAttendance['journal'],
      'status' => $validatedAttendance['status'],
      'photo_path' => $pathJournalPhoto . '/' . $filenameJournalPhoto,
    ];

    $startOfDay = Carbon::today();
    $endOfDay = Carbon::tomorrow();

    $community->load('attendances');
    $attendance = $community->attendances->filter(function ($attendance) use ($startOfDay, $endOfDay) {
      return $attendance->created_at->between($startOfDay, $endOfDay);
    })->first();

    if ($attendance) {
      $attendance->characters()->sync([
        ($character->id) => [
          "journal" => $attendanceData['journal'],
          "status" => $attendanceData['status'],
          'first_photo_path' => $pathJournalPhoto . '/' . $filenameJournalPhoto,
        ]
      ]);

      return to_route('community.attendance.index', $community->id);
    }

    $attendanceCreated = Attendance::create([
      "community_id" => $community->id,
    ]);

    $attendanceCreated->characters()->sync([
      ($character->id) => [
        "journal" => $attendanceData['journal'],
        "status" => $attendanceData['status'],
        'first_photo_path' => $pathJournalPhoto . '/' . $filenameJournalPhoto,
      ]
    ]);

    return to_route('community.attendance.index', $community->id);
  }

  /**
   * Display the specified resource.
   */
  public function show(Community $community, CommunityAttendances $attendance)
  {
    $character = auth()->user()->character;
    $community->load('attendances');

    return inertia('Community/Attendance/Show', [
      "community" => $community,
      "attendance" => $attendance,
      "yourCharacter" => $character->communities->where('pivot.community_id', $community->id)->first(),
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


  public function update(Request $request, Community $community, CommunityAttendances $attendance)
  {
    dd($request);

    $validated = $request->validate([
      "second_journal_image" => 'required|mimes:png,jpg,jpeg,webp|max:2048', // Validate the image
      'journal' => 'nullable|string|max:500',
      'status' => 'nullable|string',
    ]);

    // Handle file upload if provided
    if ($request->hasFile('second_journal_image')) {
      $fileJournalPhoto = $request->file('second_journal_image');
      $filenameJournalPhoto = time() . '.' . $fileJournalPhoto->getClientOriginalExtension();
      $path = 'images/community_attendance/' . $community->id . '/' . Carbon::now()->timestamp . '/' . str()->random(20);

      // Store the file
      $fileJournalPhoto->storeAs('public/' . $path, $filenameJournalPhoto);

      // Update the attendance with the new photo path
      $attendance->update([
        'second_photo_path' => $path . '/' . $filenameJournalPhoto,
      ]);
    }

    return redirect()->route('community.attendance.index', $community->id)->with('success', 'Attendance updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}

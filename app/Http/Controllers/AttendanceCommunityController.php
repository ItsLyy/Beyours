<?php

namespace App\Http\Controllers;

use App\Http\Resources\AttendanceMemberResource;
use App\Http\Resources\CommunityMemberResource;
use App\Http\Resources\MemberCommunityResource;
use App\Models\Attendance;
use App\Models\Community;
use App\Models\CommunityAttendances;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AttendanceCommunityController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Community $community)
  {
    $characterId = auth()->user()->character->id;

    $startOfDay = Carbon::today();
    $endOfDay = Carbon::tomorrow();

    $community->load('attendances')->attendances->filter(function ($attendance) use ($startOfDay, $endOfDay) {
      return $attendance->created_at->between($startOfDay, $endOfDay);
    });

    $attendances = $community->attendances()
    ->with('characters')
    ->whereBetween('created_at', [$startOfDay, $endOfDay])
    ->first();

    if ($attendances) {
      $attendances = new AttendanceMemberResource($attendances);
    }

    $character = $community->members->firstWhere('id', $characterId);

    return inertia('Community/Attendance/Index', [
      "community" => $community,
      "character" => new MemberCommunityResource($character),
      "attendances" => $attendances,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create(Community $community)
  {
    $characterId = auth()->user()->character->id;
    $character = $community->members->firstWhere('id', $characterId);

    $startOfDay = Carbon::today();
    $endOfDay = Carbon::tomorrow();

    $community->load('attendances');
    $attendance = $community->attendances->filter(function ($attendance) use ($startOfDay, $endOfDay) {
      return $attendance->created_at->between($startOfDay, $endOfDay);
    })->first();

    if ($attendance) {
      $attendance = $attendance->characters->first();
    }

    return inertia("Community/Attendance/Create", [
      "community" => $community,
      "character" => new MemberCommunityResource($character),
      "attendance" => $attendance ,
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
      $attendance->characters()->syncWithoutDetaching([
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

    $attendanceCreated->characters()->syncWithoutDetaching([
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
  public function show(Community $community, Attendance $attendance, Request $request)
  {
    $characterId = $request->query('character_id');
    $authCharacterId = auth()->user()->character->id;
    $character = $community->members->firstWhere('id', $authCharacterId);

    $community->load('attendances');
    $attendance = $community->attendances->find($attendance->id);

    return inertia('Community/Attendance/Show', [
      "community" => $community,
      "character" => new MemberCommunityResource($character),
      "attendance" => $attendance->characters->firstWhere("id", $characterId),
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


  public function update(Request $request, Community $community, Attendance $attendance)
  {
    $characterId = auth()->user()->character->id;

    $request->validate([
      "second_journal_image" => 'required|mimes:png,jpg,jpeg,webp|max:2048', // Validate the image
    ]);

    // Handle file upload if provided
    if ($request->hasFile('second_journal_image')) {
      $fileJournalPhoto = $request->file('second_journal_image');
      $extensionJournalPhoto = $fileJournalPhoto->getClientOriginalExtension();

      $filenameJournalPhoto = time() . '.' . $extensionJournalPhoto;
      $pathJournalPhoto = 'images/community_attendance/' . $community->id . '/' . Carbon::now()->timestamp . '/' . str()->random(20);
      $fileJournalPhoto->move($pathJournalPhoto, $filenameJournalPhoto);

      $attendance->characters()->syncWithoutDetaching([ $characterId => [
        'second_photo_path' => $pathJournalPhoto . '/' . $filenameJournalPhoto,
      ]]);
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

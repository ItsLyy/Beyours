<?php

namespace App\Http\Controllers;

use App\Http\Resources\AttendanceMemberDetailResource;
use App\Http\Resources\AttendanceReportMemberResource;
use App\Http\Resources\AttendanceReportResource;
use App\Http\Resources\CommunityDetailResource;
use App\Http\Resources\CommunityResource;
use App\Http\Resources\MemberAttendancesResource;
use App\Http\Resources\MemberCommunityResource;
use App\Models\Attendance;
use App\Models\Community;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\View;

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

    if (request("date")) {
      $startOfDay = Carbon::parse(request('date'))->startOfDay();
      $endOfDay = Carbon::parse(request('date'))->endOfDay();
    }


    $members = $community->members()->wherePivot("role", "!=", "owner")
      ->with(['attendances' => function ($query) use ($startOfDay, $endOfDay, $community) {
        return $query->whereBetween('attendances.created_at', [$startOfDay, $endOfDay])->where('attendances.community_id', $community->id);
      }])
      ->get();

    $memberAttendances = MemberAttendancesResource::collection($members);

    $character = $community->members->firstWhere('id', $characterId);

    return inertia('Community/Attendance/Index', [
      "community" => new CommunityResource($community),
      "character" => new MemberCommunityResource($character),
      "attendances" => $memberAttendances,
      "queryParams" => request()->query() ? request()->query() : null ,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create(Community $community)
  {
    $characterId = auth()->user()->character->id;
    $character = $community->members->firstWhere('id', $characterId);

    $community->load('attendances');

    return inertia("Community/Attendance/Create", [
      "community" => new CommunityResource($community),
      "character" => new MemberCommunityResource($character),
      "logoBeyours" => asset('storage/logobeyours.svg'),
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Community $community, Request $request)
  {
    $character = auth()->user()->character;


    $validatedAttendance = $request->validate([
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

    $startOfDay = Carbon::today();
    $endOfDay = Carbon::tomorrow();

    $community->load('attendances');
    $attendance = $community->attendances->filter(function ($attendance) use ($startOfDay, $endOfDay) {
      return $attendance->created_at->between($startOfDay, $endOfDay);
    })->first();

    if ($attendance) {
      $attendance->characters()->syncWithoutDetaching([
        ($character->id) => [
          "status" => $validatedAttendance['status'],
          "first_photo_path" => $pathJournalPhoto . '/' . $filenameJournalPhoto,
          "first_attendance_time" => Carbon::now(),
        ]
      ]);

      return to_route('community.attendance.index', $community->id);
    }

    $attendanceCreated = Attendance::create([
      "community_id" => $community->id,
    ]);

    $attendanceCreated->characters()->syncWithoutDetaching([
      ($character->id) => [
        "status" => $validatedAttendance['status'],
        'first_photo_path' => $pathJournalPhoto . '/' . $filenameJournalPhoto,
        "first_attendance_time" => Carbon::now(),
      ]
    ]);

    return to_route('community.attendance.index', $community->id);
  }

  /**
   * Display the specified resource.
   */
  public function show(Community $community, Attendance $attendance, Request $request)
  {
    $characterId = $request->query('c');
    $authCharacterId = auth()->user()->character->id;
    $character = $community->members->firstWhere('id', $authCharacterId);


    $community->load('attendances');
    $attendance = $community->attendances->find($attendance->id);

    return inertia('Community/Attendance/Show', [
      "community" => new CommunityResource($community),
      "character" => new MemberCommunityResource($character),
      "attendance" => new AttendanceMemberDetailResource($attendance->characters->firstWhere("id", $characterId)),
      "logoBeyours" => asset('storage/logobeyours.svg'),
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
    $character = auth()->user()->character;

    $request->validate([
      "journal" => 'required|string',
      "second_journal_image" => 'required|mimes:png,jpg,jpeg,webp|max:2048',
    ]);

    if ($request->hasFile('second_journal_image')) {
      $fileJournalPhoto = $request->file('second_journal_image');
      $extensionJournalPhoto = $fileJournalPhoto->getClientOriginalExtension();

      $filenameJournalPhoto = time() . '.' . $extensionJournalPhoto;
      $pathJournalPhoto = 'images/community_attendance/' . $community->id . '/' . Carbon::now()->timestamp . '/' . str()->random(20);
      $fileJournalPhoto->move($pathJournalPhoto, $filenameJournalPhoto);

      $character->attendances()->syncWithoutDetaching([($attendance->id) => [
        'journal' => $request->journal,
        'second_photo_path' => $pathJournalPhoto . '/' . $filenameJournalPhoto,
        'second_attendance_time' => Carbon::now(),
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

  public function report(Community $community)
  {
    $authCharacterId = auth()->user()->character->id;
    $character = $community->members->firstWhere('id', $authCharacterId);

    $startOfMonth = Carbon::parse(request('date'))->startOfMonth();
    $endOfMonth = Carbon::parse(request('date'))->endOfMonth();

    $attendances = $community->attendances->whereBetween('created_at', [$startOfMonth, $endOfMonth]);
    $members = $community->members;
    $memberAttendances = $members->load('attendances')->map(function ($member) use ($community) {
      return [
        "id" => $member->id,
        "fullname" => $member->fullname,
        "pkl" => $member->pkl,
        "role" => $member->community->role,
        "instructor" => $member->instructor,
        "attendances" => $member->attendances->map(function ($attendance) use ($community) {
          if ($attendance->community_id == $community->id) {
            $attendance["pivot"]["first_photo_path"] = asset($attendance["pivot"]["first_photo_path"]);
            $attendance["pivot"]["second_photo_path"] = asset($attendance["pivot"]["second_photo_path"]);
            return [
              "id" => $attendance->id,
              "community_id" => $attendance->community_id,
              "created_at" => Carbon::parse($attendance->created_at)->format('D, d F Y'),
              "pivot" => $attendance->pivot,
            ];
          }
        })->filter(function ($attendance) {
          return $attendance;
        })
      ];
    })->whereBetween('attendances.created_at', $startOfMonth, $endOfMonth);

    return inertia('Community/Attendance/Report/Index', [
      'community' => new CommunityResource($community),
      "character" => new MemberCommunityResource($character),
      'attendances' => AttendanceReportResource::collection($attendances),
      'memberAttendances' => $memberAttendances,
    ]);
  }

  public function verify(Community $community, Attendance $attendance)
  {
    $characterId = request('member');

    $attendance->characters()->syncWithoutDetaching([($characterId) => [
      'verified' => true,
    ]]);

    return redirect()->route('community.attendance.index', $community->id)->with('success', 'Attendance updated successfully.');
  }
}

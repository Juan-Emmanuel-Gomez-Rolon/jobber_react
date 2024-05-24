<?php

namespace App\Http\Controllers;

use App\ApplicationStatus;
use App\Models\Application;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Gate::authorize('viewAny', Application::class);

        $applications = Auth::user()->applications()->paginate(100);

        $applications->load('offer');

        return response()->json($applications);
    }

    /**
     * Display the specified resource.
     */
    public function show(Application $application)
    {
        Gate::authorize('view', $application);

        return response()->json(['application' => $application]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Application $application)
    {
        Gate::authorize('delete', $application);

        $application->delete();

        return response()->json(['message' => 'Application deleted']);
    }

    public function accept(Application $application)
    {
        Gate::authorize('accept', $application);

        $application->status = ApplicationStatus::Accepted;
        $application->save();

        return response()->json(['message' => 'Application accepted']);
    }

    public function reject(Application $application)
    {
        Gate::authorize('reject', $application);

        $application->status = ApplicationStatus::Rejected;
        $application->save();

        return response()->json(['message' => 'Application rejected']);
    }
}

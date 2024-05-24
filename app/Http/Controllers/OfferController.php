<?php

namespace App\Http\Controllers;

use App\AccountType;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $offers = Offer::paginate(100);

        $offers->load('recruiter');

        if ($offers->isEmpty()) {
            return response()->json(['message' => 'No offers found'], 404);
        }

        if (Auth::user()->account_type === AccountType::Applicant) {
            $user = Auth::user();
            $user->load('applications');

            $offers->map(function ($offer) use ($user) {
                $offer->is_applied = $user->applications->contains('offer_id', $offer->id);
            });
        }

        return response()->json($offers);
    }

    public function my_offers()
    {
        if (Auth::user()->account_type !== AccountType::Recruiter) {
            return response()->json(['message' => 'You are not a recruiter'], 403);
        }

        $offers = Auth::user()->offers()->paginate(100);

        if ($offers->isEmpty()) {
            return response()->json(['message' => 'No offers found'], 404);
        }

        $offers->load('recruiter');

        return response()->json($offers);
    }

    public function index_by_category($category)
    {
        $offers = Offer::category($category)->paginate(100);

        if ($offers->isEmpty()) {
            return response()->json(['message' => 'No offers found'], 404);
        }

        return response()->json($offers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('create', Offer::class);

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
        ]);

        $offer = Offer::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category' => $validated['category'],
            'user_id' => Auth::id(),
        ]);

        return response()->json(['offer' => $offer], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Offer $offer)
    {
        Gate::authorize('view', $offer);

        $user = Auth::user();

        if ($user->account_type === AccountType::Applicant) {
            $user->load('applications');

            $offer->load(['recruiter']);
            $offer->is_applied = $user->applications->contains('offer_id', $offer->id);

            $offer->application = $user->applications->where('offer_id', $offer->id)->first();
        } else if ($offer->user_id === $user->id) {
            $offer->load(['applications.user', 'recruiter']);
        } else {
            $offer->load('recruiter');
        }

        return response()->json(['offer' => $offer]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Offer $offer)
    {
        Gate::authorize('update', $offer);

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
        ]);

        $offer->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category' => $validated['category'],
        ]);

        return response()->json(['offer' => $offer]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Offer $offer)
    {
        Gate::authorize('delete', $offer);

        $offer->delete();

        return response()->json(['message' => 'Offer deleted']);
    }

    public function apply(Offer $offer)
    {
        Gate::authorize('apply', $offer);

        $offer->applications()->create([
            'user_id' => Auth::id(),
        ]);

        return response()->json(['message' => 'Application submitted'], 201);
    }
}

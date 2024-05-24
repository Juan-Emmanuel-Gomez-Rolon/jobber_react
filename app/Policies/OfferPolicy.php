<?php

namespace App\Policies;

use App\AccountType;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class OfferPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Everyone can view offers
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Offer $offer): bool
    {
        return true; // Everyone can view an offer
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->account_type === AccountType::Recruiter;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Offer $offer): bool
    {
        return $user->id === $offer->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Offer $offer): bool
    {
        return $user->id === $offer->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Offer $offer): bool
    {
        return $user->id === $offer->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Offer $offer): bool
    {
        return $user->id === $offer->user_id;
    }

    /**
     * Determine whether the user can apply to the offer.
     */
    public function apply(User $user, Offer $offer): Response
    {
        return $user->account_type === AccountType::Applicant
            ? Response::allow()
            : Response::deny('Only applicants can apply to offers');
    }
}

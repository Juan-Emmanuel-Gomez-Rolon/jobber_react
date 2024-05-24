<?php

namespace App\Policies;

use App\Models\Application;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ApplicationPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Application $application): bool
    {
        // Only the user who created the application or the user who created the offer can view the application
        return $user->id === $application->user_id || $user->id === $application->offer->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Application $application): bool
    {
        // Only the user who created the application
        return $user->id === $application->user_id;
    }

    /**
     * Determine whether the user can accept the model.
     */
    public function accept(User $user, Application $application): bool
    {
        // Only the user who created the offer can accept the application
        return $user->id === $application->offer->user_id;
    }

    /**
     * Determine whether the user can reject the model.
     */
    public function reject(User $user, Application $application): bool
    {
        // Only the user who created the offer can reject the application
        return $user->id === $application->offer->user_id;
    }
}

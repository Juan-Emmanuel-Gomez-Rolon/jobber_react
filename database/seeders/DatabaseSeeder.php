<?php

namespace Database\Seeders;

use App\Models\Offer;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(1)->create([
            'email' => 'recruiter@example.com',
            'account_type' => 'recruiter',
        ]);

        User::factory(1)->create([
            'email' => 'aplicantt@example.com',
        ]);


        User::factory(5)->create([
            'account_type' => 'recruiter',
        ]);

        $recruiters = User::where('account_type', 'recruiter')->get();

        foreach ($recruiters as $recruiter) {
            Offer::factory(5)->create([
                'user_id' => $recruiter->id,
            ]);
        }

        User::factory(100)->create();

        $applicants = User::where('account_type', 'applicant')->get();

        foreach ($applicants as $applicant) {
            Offer::all()->random(3)->each(function (Offer $offer) use ($applicant) {
                $offer->applications()->create([
                    'user_id' => $applicant->id,
                ]);
            });
        }
    }
}

<?php

namespace Tests\Feature;

use App\AccountType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApplicationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_apply_to_offer()
    {
        $recruiter = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ]);

        $offer = $recruiter->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
        ]);

        $this->assertDatabaseHas('offers', [
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
            'user_id' => $recruiter->id,
        ]);

        $candidate = User::factory()->create([
            'account_type' => AccountType::Applicant,
        ]);

        $response = $this->actingAs($candidate)
            ->postJson("/api/offers/{$offer->id}/apply");

        $response->assertStatus(201);

        $this->assertDatabaseHas('applications', [
            'offer_id' => $offer->id,
            'user_id' => $candidate->id,
        ]);
    }

    public function test_apply_to_offer_as_recruiter()
    {
        $recruiter = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ]);

        $offer = $recruiter->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
        ]);

        $this->assertDatabaseHas('offers', [
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
            'user_id' => $recruiter->id,
        ]);

        $response = $this->actingAs($recruiter)
            ->postJson("/api/offers/{$offer->id}/apply");

        $response->assertStatus(403);
    }

    public function test_apply_to_offer_as_unauthenticated_user()
    {
        $recruiter = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ]);

        $offer = $recruiter->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
        ]);

        $this->assertDatabaseHas('offers', [
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
            'user_id' => $recruiter->id,
        ]);

        $response = $this->postJson("/api/offers/{$offer->id}/apply");

        $response->assertStatus(401);
    }

    public function test_accept_application_as_recruiter()
    {
        $recruiter = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ]);

        $offer = $recruiter->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
        ]);

        $candidate = User::factory()->create([
            'account_type' => AccountType::Applicant,
        ]);

        $application = $offer->applications()->create([
            'user_id' => $candidate->id,
        ]);

        $response = $this->actingAs($recruiter)
            ->postJson("/api/applications/{$application->id}/accept");

        $response->assertStatus(200);

        $this->assertDatabaseHas('applications', [
            'id' => $application->id,
            'status' => 'accepted',
        ]);
    }

    public function test_accept_application_as_candidate()
    {
        $candidate = User::factory()->create([
            'account_type' => AccountType::Applicant,
        ]);

        $offer = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ])->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
        ]);

        $application = $offer->applications()->create([
            'user_id' => $candidate->id,
        ]);

        $response = $this->actingAs($candidate)
            ->postJson("/api/applications/{$application->id}/accept");

        $response->assertStatus(403);
    }

    public function test_accept_application_as_unauthenticated_user()
    {
        $candidate = User::factory()->create([
            'account_type' => AccountType::Applicant,
        ]);

        $offer = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ])->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
        ]);

        $application = $offer->applications()->create([
            'user_id' => $candidate->id,
        ]);

        $response = $this->postJson("/api/applications/{$application->id}/accept");

        $response->assertStatus(401);
    }

    public function test_reject_application_as_recruiter()
    {
        $recruiter = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ]);

        $offer = $recruiter->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
        ]);

        $candidate = User::factory()->create([
            'account_type' => AccountType::Applicant,
        ]);

        $application = $offer->applications()->create([
            'user_id' => $candidate->id,
        ]);

        $response = $this->actingAs($recruiter)
            ->postJson("/api/applications/{$application->id}/reject");

        $response->assertStatus(200);

        $this->assertDatabaseHas('applications', [
            'id' => $application->id,
            'status' => 'rejected',
        ]);
    }

    public function test_reject_application_as_candidate()
    {
        $candidate = User::factory()->create([
            'account_type' => AccountType::Applicant,
        ]);

        $offer = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ])->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
        ]);

        $application = $offer->applications()->create([
            'user_id' => $candidate->id,
        ]);

        $response = $this->actingAs($candidate)
            ->postJson("/api/applications/{$application->id}/reject");

        $response->assertStatus(403);
    }

    public function test_reject_application_as_unauthenticated_user()
    {
        $candidate = User::factory()->create([
            'account_type' => AccountType::Applicant,
        ]);

        $offer = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ])->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
        ]);

        $application = $offer->applications()->create([
            'user_id' => $candidate->id,
        ]);

        $response = $this->postJson("/api/applications/{$application->id}/reject");

        $response->assertStatus(401);
    }

    public function test_delete_application_as_recruiter()
    {
        // Recruiters can't delete applications, only candidates can

        $recruiter = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ]);

        $offer = $recruiter->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
        ]);

        $candidate = User::factory()->create([
            'account_type' => AccountType::Applicant,
        ]);

        $application = $offer->applications()->create([
            'user_id' => $candidate->id,
        ]);

        $response = $this->actingAs($recruiter)
            ->deleteJson("/api/applications/{$application->id}");

        $response->assertStatus(403);

        $this->assertDatabaseHas('applications', [
            'id' => $application->id,
        ]);
    }

    public function test_delete_application_as_candidate()
    {
        $candidate = User::factory()->create([
            'account_type' => AccountType::Applicant,
        ]);

        $offer = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ])->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
        ]);

        $application = $offer->applications()->create([
            'user_id' => $candidate->id,
        ]);

        $response = $this->actingAs($candidate)
            ->deleteJson("/api/applications/{$application->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('applications', [
            'id' => $application->id,
        ]);
    }
}

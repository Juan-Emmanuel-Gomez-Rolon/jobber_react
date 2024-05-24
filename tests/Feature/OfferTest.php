<?php

namespace Tests\Feature;

use App\AccountType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OfferTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_create_offer()
    {
        $recruiter = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ]);

        // test me
        $response = $this->actingAs($recruiter)
            ->get('/api/me');

        $response->assertStatus(200);

        $response = $this->actingAs($recruiter)
            ->postJson('/api/offers', [
                'title' => 'Senior Developer',
                'description' => 'We are looking for a senior developer',
                'category' => 'Web Development',
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['offer']);

        $this->assertDatabaseHas('offers', [
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
            'user_id' => $recruiter->id,
        ]);
    }

    public function test_create_offer_as_applicant()
    {
        $candidate = User::factory()->create([
            'account_type' => AccountType::Applicant,
        ]);

        $response = $this->actingAs($candidate)
            ->postJson('/api/offers', [
                'title' => 'Senior Developer',
                'description' => 'We are looking for a senior developer',
            ]);

        $response->assertStatus(403);
    }

    public function test_update_offer()
    {
        $recruiter = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ]);

        $offer = $recruiter->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
            'category' => 'Web Development',
        ]);

        $response = $this->actingAs($recruiter)
            ->putJson("/api/offers/{$offer->id}", [
                'title' => 'Junior Developer',
                'description' => 'We are looking for a junior developer',
                'category' => 'Web Development',
            ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['offer']);

        $this->assertDatabaseHas('offers', [
            'title' => 'Junior Developer',
            'description' => 'We are looking for a junior developer',
            'user_id' => $recruiter->id,
        ]);
    }

    public function test_delete_offer()
    {
        $recruiter = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ]);

        $offer = $recruiter->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
            'category' => 'Web Development',
        ]);

        $this->assertDatabaseHas('offers', [
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
            'user_id' => $recruiter->id,
        ]);

        $response = $this->actingAs($recruiter)
            ->deleteJson("/api/offers/{$offer->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('offers', [
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
            'user_id' => $recruiter->id,
        ]);
    }

    public function test_apply()
    {
        $recruiter = User::factory()->create([
            'account_type' => AccountType::Recruiter,
        ]);

        $offer = $recruiter->offers()->create([
            'title' => 'Senior Developer',
            'description' => 'We are looking for a senior developer',
            'category' => 'Web Development',
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
}

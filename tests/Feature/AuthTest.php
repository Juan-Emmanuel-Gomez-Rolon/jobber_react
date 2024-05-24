<?php

namespace Tests\Feature;

use App\AccountType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_test_endpoint(): void
    {
        $response = $this->get('/api/test');

        $response->assertStatus(200);
    }

    public function test_login(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['token', 'user']);
    }

    public function test_register(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => 'password',
            'account_type' => AccountType::Applicant,
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['token', 'user']);

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
        ]);

        // test for existing email
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => 'password',
            'account_type' => AccountType::Applicant,
        ]);

        $response->assertStatus(422);

        // test for invalid account type
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => 'password',
            'account_type' => 'invalid',
        ]);

        $response->assertStatus(422);
    }

    public function test_me(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/api/me');

        $response->assertStatus(200)
            ->assertJsonStructure(['user']);
    }


    public function test_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(200);

        $token = $response->json('token');

        $response = $this->withHeader('Authorization', "Bearer $token")->postJson('/api/logout');

        $response->assertStatus(200);
    }

    public function test_update_account(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->putJson('/api/me', [
            'name' => 'John Doe',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['user']);

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
        ]);

        $response = $this->actingAs($user)->putJson('/api/me', [
            'password' => '123456',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['user']);
    }
}

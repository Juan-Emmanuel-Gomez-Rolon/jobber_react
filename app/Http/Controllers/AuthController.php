<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::check() && !Auth::attempt($validated)) {
            return response()->json(['message' => 'Correo o contraseña incorrectos'], 401);
        }

        // clear previous tokens
        Auth::user()->tokens()->delete();

        return response()->json(['token' => Auth::user()->createToken('auth_token')->plainTextToken, 'user' => Auth::user()]);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'phone' => 'nullable',
            'description' => 'nullable',
            'account_type' => 'required|in:recruiter,applicant',
        ]);

        $validated['password'] = bcrypt($validated['password']);

        $user = User::create($validated);

        return response()->json(['token' => $user->createToken('auth_token')->plainTextToken, 'user' => $user]);
    }

    public function me()
    {
        return response()->json(['user' => Auth::user()]);
    }

    public function update_account(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable',
            'email' => 'nullable|email|unique:users,email,' . Auth::id(),
            'phone' => 'nullable',
            'description' => 'nullable',
        ]);

        Auth::user()->update($validated);

        return response()->json(['user' => Auth::user()]);
    }

    public function update_password(Request $request)
    {
        $validated = $request->validate([
            'password' => 'required',
            'new_password' => 'required',
            'confirm_password' => 'required|same:new_password',
        ]);

        $user = User::find(Auth::id());

        if (!password_verify($validated['password'], $user->password)) {
            return response()->json(['message' => 'Contraseña incorrecta'], 400);
        }

        $user->update(['password' => bcrypt($validated['new_password'])]);

        return response()->json(['message' => 'Password updated']);
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    public function profile(User $user)
    {
        return response()->json(['user' => $user]);
    }
}

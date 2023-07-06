<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use App\Providers\RouteServiceProvider;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {

        if ($request->authenticate()) {
            $auth_user = User::where("email", $request->email)->first();

            if ($auth_user->hasAnyRole(["super-admin", 'admin', "staff", 'employee'])) {
                $request->session()->regenerate();
            } else {
                Auth::guard('web')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return redirect()->back()->with("message", ["text" => "You don't have permission to access this site!", "status" => "error"]);
            }

            if ($auth_user->hasAnyRole(["super-admin", 'admin'])) {
                return redirect()->intended("/admin/dashboard");
            } else if ($auth_user->hasAnyRole(["staff", 'employee'])) {
                return redirect()->intended(route("staff.dashboard"));
            }
        };

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}

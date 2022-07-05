<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Repositories\UserRepository;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        $returnUrl = $request->query('returnUrl', '/');

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'returnUrl' => $returnUrl
        ]);
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {

        $userRepo = new UserRepository();

        $validator = $request->validate([
            'email' => 'required',
            'password' => 'required',
            'remember' => 'boolean',
            'returnUrl' => 'required'
        ]);

        $user = $userRepo->getAdminByEmail($validator, 'ROLE_ADMIN');
        if (!$user) {
            return response()->json([
                'status' => 200,
                'data' => [
                    'error' => 'UserNotFound',
                    'message' => 'this user with email '.$validator['email'].' not found'
                ],
            ], 400);
        }

        if (!Auth::attempt(['email' => $validator['email'], 'password' => $validator['password']], $validator['remember'])) {
            return response()->json([
                'status' => 200,
                'data' => [
                    'error' => 'UserNotFound',
                    'message' => 'this user with email '.$validator['email'].' not found'
                ],
            ], 400);
        };

        $request->session()->regenerate();

        return response()->json([
            'status' => 200,
            'data' => [
                'returnUrl' => $validator['returnUrl']
            ]
        ], 200);;
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}

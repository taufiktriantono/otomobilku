<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;

use Inertia\Inertia;

use App\Repositories\UserRepository;

class UserController extends Controller
{
    public function index(Request $request) {

        $params = $request->all();

        $params['limit'] = $request->query('limit', 10);
        $params['page'] = $request->query('page', 1);

        $userRepo = new UserRepository();

        $users = $userRepo->findAll()
            ->paginate($params['limit'])
            ->withQueryString();

        return Inertia::render('Admin/Settings/ListUser', [
            'users' => $users
        ]);
    }

    public function store(Request $request) {

        if ($request->isMethod('post')) {
            $validator = $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'role_id' => 'required'
            ]);

            $userRepo = new UserRepository();

            if ($userRepo->getAdminByEmail($validator, 'ROLE_ADMIN')) {
                return redirect()
                    ->back()
                    ->withErrors($validator)
                    ->withInput();
            }

            if (!$userRepo->store($validator)) {
                return redirect()
                    ->back()
                    ->withErrors($validator)
                    ->withInput();
            }

            return redirect(route('list-user'));

        }

        return Inertia::render('Admin/Settings/AddUser', [
            'action' => 'store'
        ]);
    }

    public function show($id) {

        $userRepo = new UserRepository();
        $user = $userRepo->findOneById($id)->first();

        return Inertia::render('Admin/Settings/AddUser', [
            'action' => 'show',
            'user' => $user
        ]);
    }

    public function update($id, Request $request) {

        if ($request->isMethod('put')) {

        }

        $userRepo = new UserRepository();
        $user = $userRepo->findOneById($id)->first();

        return Inertia::render('Admin/Settings/AddUser', [
            'action' => 'update',
            'user' => $user
        ]);

    }

}

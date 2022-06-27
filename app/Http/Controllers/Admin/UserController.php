<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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

        }

        return Inertia::render('Admin/Settings/ListUser', [
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

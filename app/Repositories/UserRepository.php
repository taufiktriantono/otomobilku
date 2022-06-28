<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\UserRole;
use App\Models\Role;

use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use Ramsey\Uuid\Uuid;

use DB;

class UserRepository
{

  public function getAdminByEmail($params, $role) {
    return User::where('email', '=', $params['email'])->whereHas('roles', function($query) {
      $query->where('roles.name', '=', 'ROLE_ADMIN');
    })->first();
  }

  public function getUserByEmail($params, $role) {
    return User::where('email', '=', $params['email'])->whereHas('roles', function($query) {
      $query->where('roles.name', '=', 'ROLE_USER');
    })->first();
  }

  public function findAll() {
    return User::whereHas('roles', function($query) {
      $query->where('roles.name', '=', 'ROLE_ADMIN');
    });
  }

  public function findOneById($id) {}

  public function updateById($id, $params) {}

  public function store($params) {
    DB::beginTransaction();

    $user = User::create([
      'uuid' => Uuid::uuid4()->toString(),
      'first_name' => $params['first_name'],
      'last_name' => $params['last_name'],
      'email' => $params['email'],
      'password' => Hash::make($params['password']),
      'email_verified_at' => now(),
    ]);
    if (!$user) {
      DB::rollback();
    }

    if (!UserRole::create([
      'user_id' => $user->id,
      'role_id' => $params['role_id']
    ])) {
      DB::rollback();
    };

    DB::commit();

    return $user;
  }

}
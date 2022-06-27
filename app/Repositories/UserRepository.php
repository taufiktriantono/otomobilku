<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\UserRole;
use App\Models\Role;

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

}
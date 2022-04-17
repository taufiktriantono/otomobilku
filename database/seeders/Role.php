<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid as Generator;

class Role extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            [
                'name' => 'ROLE_ADMIN'
            ],
            [
                'name' => 'ROLE_USER'
            ]
        ];

        foreach ($roles as $role) {
            \App\Models\Role::create($role);
        }

    }
}

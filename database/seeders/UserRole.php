<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid as Generator;

class UserRole extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userRoles = [
            [
                'id' => Generator::uuid4(),
                'user_id' => 1,
                'role_id' => 1
            ],
            [
                'id' => Generator::uuid4(),
                'user_id' => 2,
                'role_id' => 2
            ]
        ];

        foreach ($userRoles as $userRole) {
            \App\Models\UserRole::create($userRole);
        }
    }
}

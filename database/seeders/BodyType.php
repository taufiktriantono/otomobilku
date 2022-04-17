<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BodyType extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bodyTypes = [
            [
                'type_name' => 'Sedan',
                'order' => 1,
            ],
            [
                'type_name' => 'Hatchback',
                'order' => 2,
            ],
            [
                'type_name' => 'SUV',
                'order' => 3,
            ],
            [
                'type_name' => 'MPV',
                'order' => 4,
            ],
            [
                'type_name' => 'Double Cabin',
                'order' => 5,
            ],
        ];

        foreach ($bodyTypes as $bodyType) {
            \App\Models\BodyType::create($bodyType);
        }
    }
}

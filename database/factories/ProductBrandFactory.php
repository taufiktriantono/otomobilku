<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductBrandFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            [
                'name' => 'Toyota',
                'slug' => 'toyota',
                'order' => 1,
                'is_active' => true
            ],
            [
                'name' => 'Honda',
                'slug' => 'honda',
                'order' => 2,
                'is_active' => true
            ],
            [
                'name' => 'Suzuki',
                'slug' => 'suzuki',
                'order' => 3,
                'is_active' => true
            ],
            [
                'name' => 'Mazda',
                'slug' => 'mazda',
                'order' => 4,
                'is_active' => true
            ],
            [
                'name' => 'Hyundai',
                'slug' => 'hyundai',
                'order' => 5,
                'is_active' => true
            ],
            [
                'name' => 'Kia',
                'slug' => 'kia',
                'order' => 6,
                'is_active' => true
            ],
            [
                'name' => 'Wuling',
                'slug' => 'wuling',
                'order' => 7,
                'is_active' => true
            ],
            [
                'name' => 'Mercedez Benz',
                'slug' => 'mercedez-benz',
                'order' => 8,
                'is_active' => true
            ],
            [
                'name' => 'BMW',
                'slug' => 'bmw',
                'order' => 9,
                'is_active' => true
            ],
            [
                'name' => 'Volkwagen',
                'slug' => 'volkwagen',
                'order' => 10,
                'is_active' => true
            ],
            [
                'name' => 'Ford',
                'slug' => 'ford',
                'order' => 11,
                'is_active' => true
            ],
            [
                'name' => 'Mitsubitshi',
                'slug' => 'mitsubitshi',
                'order' => 12,
                'is_active' => true
            ],
            [
                'name' => 'Nissan',
                'slug' => 'nissan',
                'order' => 13,
                'is_active' => true
            ]
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'brand_id' => '14644675-a5c1-4fae-afa1-5b7fdc1e9d7f',
            'name' => 'Toyota 86',
            'slug' => 'toyota-86',
            'order' => 1,
            'is_active' => true
        ];
    }
}

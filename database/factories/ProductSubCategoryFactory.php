<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductSubCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'category_id' => '3d3d96eb-1025-4dba-8793-1a316c238a8a',
            'name' => 'Car',
            'slug' => 'car',
            'description' => 'This sub-category will hold Car'
        ];
    }
}

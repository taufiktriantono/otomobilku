<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'product_sub_category_id' => '547dc152-2722-46a9-8292-df3b559f94ba',
            'product_model_id' => 'f11cfe8b-cd1a-42b4-967e-296dbdb85ca4',
            'product_fuel_id' => 1,
            'product_transmission_id' => 1,
            'product_district_id' => 1906,
            'product_body_type_id' => 1,
            'product_owner_id' => '5b92078d-ffcd-4890-a923-cb30768167dc',
            'name' => 'Toyota Alphard (2011)',
            'slug' => 'toyota-alphard-toyota-alphard-2011-'.Str::random(6),
            'description' => 'Toyota Alphard (2011)',
            'price' => 460000000,
            'build_year' => 2011,
            'distance' => 3000,
            'is_active' => true,
            'seller_id' => 1
        ];
    }
}

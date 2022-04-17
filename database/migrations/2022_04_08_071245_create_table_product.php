<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('seller_id');
            $table->uuid('product_sub_category_id');
            $table->uuid('product_model_id');
            $table->bigInteger('product_district_id');
            $table->string('name');
            $table->string('slug');
            $table->text('description');
            $table->bigInteger('price');
            $table->bigInteger('build_year');
            $table->bigInteger('distance');
            $table->integer('product_body_type_id');
            $table->integer('product_fuel_id');
            $table->integer('product_transmission_id');
            $table->boolean('is_active');
            $table->timestamps();
            $table->foreign('seller_id')
                ->references('id')
                ->on('users');
            $table->foreign('product_sub_category_id')
                ->references('id')
                ->on('product_sub_category');
            $table->foreign('product_model_id')
                ->references('id')
                ->on('product_models');
            $table->foreign('product_district_id')
                ->references('district_id')
                ->on('districts');
            $table->foreign('product_body_type_id')
                ->references('id')
                ->on('body_types');
            $table->foreign('product_fuel_id')
                ->references('id')
                ->on('fuel');
            $table->foreign('product_transmission_id')
                ->references('id')
                ->on('transmission')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};

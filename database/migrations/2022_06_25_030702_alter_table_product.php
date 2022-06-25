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
        Schema::table('products', function(Blueprint $table) {
            $table->integer('seller_id')->nullable()->change();
            $table->bigInteger('product_district_id')->nullable()->change();
            $table->string('name')->nullable()->change();
            $table->string('slug')->nullable()->change();
            $table->text('description')->nullable()->change();
            $table->bigInteger('price')->nullable()->change();
            $table->integer('product_body_type_id')->nullable()->change();
            $table->integer('product_fuel_id')->nullable()->change();
            $table->bigInteger('distance')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::table('products', function(Blueprint $table) {
        //     $table->dropColumn('product_district_id');
        // });
    }
};

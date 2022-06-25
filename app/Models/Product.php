<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Traits\Uuid;

class Product extends Model
{
    use HasFactory, Uuid;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'product_sub_category_id',
        'product_model_id',
        'product_body_type_id',
        'product_transmission_id',
        'product_district_id',
        'product_owner_id',
        'product_fuel_id',
        'build_year',
        'distance',
        'geo_point',
        'seller_id',
        'is_active',
        'archive',
        'verified'
    ];

    public function bodyType() {
        return $this->hasOne(BodyType::class, 'id', 'product_body_type_id');
    }

    public function seller() {
        return $this->hasOne(User::class, 'id', 'seller_id');
    }

    public function fuel() {
        return $this->hasOne(Fuel::class, 'id', 'product_fuel_id');
    }

    public function transmission() {
        return $this->hasOne(Transmission::class, 'id', 'product_transmission_id');
    }

    public function models() {
        return $this->hasOne(ProductModel::class, 'id', 'product_model_id')->with('brand');
    }

    public function district() {
        return $this->hasOne(District::class, 'district_id', 'product_district_id')->with('city');
    }

    public function images() {
        return $this->hasMany(ProductImage::class);
    }

    public function owner() {
        return $this->hasOne(ProductOwner::class, 'id', 'product_owner_id');
    }

    public function variants() {
        return $this->hasMany(ProductVariants::class, 'product_id', 'id')->with('variant');
    }

}

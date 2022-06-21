<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Traits\Uuid;

class ProductBrand extends Model
{
    use HasFactory, Uuid;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'name',
        'slug',
        'is_active'
    ];

    public function models() {
        return $this->hasMany(ProductModel::class, 'brand_id', 'id');
    }

}

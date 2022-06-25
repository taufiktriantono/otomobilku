<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Traits\Uuid;

class ProductVariants extends Model
{
    use HasFactory, Uuid;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'product_id',
        'variant_id',
        'is_master',
    ];

    public function variant() {
        return $this->hasOne(Variants::class, 'id', 'variant_id');
    }

}

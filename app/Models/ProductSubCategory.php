<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Traits\Uuid;

class ProductSubCategory extends Model
{
    use HasFactory, Uuid;

    protected $table = 'product_sub_category';

    protected $keyType = 'string';

    public $incrementing = false;

}

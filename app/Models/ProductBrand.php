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

}

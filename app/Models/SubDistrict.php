<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubDistrict extends Model
{
    use HasFactory;

    protected $protected = 'subdistricts';

    public function district() {
        return $this->hasOne(District::class, 'district_id', 'dis_id');
    }
}

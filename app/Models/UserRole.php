<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Traits\Uuid;

class UserRole extends Model
{
    use HasFactory, Uuid;

    public $fillable = [
        'user_id',
        'role_id'
    ];

    public function role() {
        return $this->hasOne(Role::class, 'id', 'role_id');
    }
}

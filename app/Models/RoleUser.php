<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleUser extends Model
{
    use HasFactory;
    protected $table = "role_user";
    protected $fillabel = ['role_id ','user_id','salesperson_no'];
    protected $casts = [
        'id' => 'string',
        'role_id' => 'string',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory;
    protected $table = 'tentants';
    protected $fillable = [
        'domain',
        'name',
        'image',
        'status',
    ];
    protected $casts = ['id' => 'string'];

    public function user()
    {
        return $this->hasMany(User::class);        
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'article', 'status', 'data'];

    /**
     * @param $query
     * @return mixed
     */
    public function scopeAvailable($query): mixed
    {
        return $query->where('status', 'available');
    }
}

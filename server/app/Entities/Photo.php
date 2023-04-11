<?php namespace App\Entities;

use CodeIgniter\Entity\Entity;

class Photo extends Entity
{
    protected $attributes = [];

    protected $casts = [
        'id'     => 'integer',
        'author' => 'integer'
    ];
}

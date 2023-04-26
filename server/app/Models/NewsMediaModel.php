<?php namespace App\Models;

use CodeIgniter\Model;

class NewsMediaModel extends Model
{
    protected $table      = 'news_media';
    protected $primaryKey = 'id';

    protected $useAutoIncrement = true;

    protected $returnType     = \App\Entities\NewsMedia::class;
    protected $useSoftDeletes = true;

    // The updatable fields
    protected $allowedFields = [
        'news_id', 'telegram_id', 'telegram_date', 'group_id',
        'views', 'forwards', 'media_type', 'media_file',  'media_ext'
    ];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];
}
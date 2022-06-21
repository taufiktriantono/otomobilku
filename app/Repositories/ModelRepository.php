<?php

namespace App\Repositories;

use App\Models\ProductModel;

class ModelRepository
{

  public function findAll($params) {
    $stmt = ProductModel::select('*');

    if (isset($params['brand_ids'])) {
      $stmt->whereIn('brand_id', $params['brand_ids']);
    }

    if (isset($params['brand_id'])) {
      $stmt->where('brand_id', $params['brand_id']);
    }

    $stmt->orderBy('name', 'asc');

    return $stmt->with('variants');

  }

}
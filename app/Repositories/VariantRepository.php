<?php

namespace App\Repositories;

use App\Models\Variants;

class VariantRepository
{

  public function findAll($params) {
    return Variants::where('model_id', '=', $params['model_id'])->get();
  }

}
<?php

namespace App\Repositories;

use App\Models\BodyType;
use App\Models\Transmission;
use App\Models\Fuel;

class GeneralRepository
{

  public function findAllBodyType($params) {
    $stmt = BodyType::select("*");

    if (isset($params['body_type_ids'])) {
      $stmt->whereIn('id', $params['body_type_ids']);
    }

    return $stmt->orderBy('order', 'asc')->get();
  }

  public function findAllTransmission() {
    return Transmission::orderBy('order', 'asc')->get();
  }

  public function findAllFuel() {
    return Fuel::orderBy('order', 'asc')->get();
  }

}
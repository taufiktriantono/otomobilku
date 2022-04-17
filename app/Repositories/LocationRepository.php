<?php

namespace App\Repositories;

use App\Models\City;
use App\Models\Province;
use App\Models\District;

class LocationRepository
{

  public function getAllCity() {
    return City::whereIn('prov_id', [11, 12])
      ->orderBy('prov_id', 'asc')
      ->get();
  }

  public function getAllProvince() {
    return Province::whereIn('prov_id', [11, 12])
      ->orderBy('prov_id', 'asc')
      ->get();
  }

  public function getAllDistricts($params) {
    $stmt = District::select('*')
      ->orderBy('district_name', 'asc');

    if (isset($params['district_id'])) {
      $stmt->where('id', '=', $params['district_id']);
    }

    if (isset($params['city_id'])) {
      $stmt->where('city_id', '=', $params['city_id']);
    }

    return $stmt->get();
  }

}
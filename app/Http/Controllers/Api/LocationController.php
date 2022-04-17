<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\LocationRepository;

class LocationController extends Controller
{
    public function findAll(Request $request) {
        $locationRepo = new LocationRepository();

        $cities = $locationRepo->getAllCity();

        return response()->json($cities, 200);
    }

    public function findAllDistrict(Request $request) {
        $districtId = $request->query('district_id');
        $cityId = $request->query('city_id');

        $locationRepo = new LocationRepository();

        $districts = $locationRepo->getAllDistricts([
            'district_id' => $districtId,
            'city_id' => $cityId
        ]);

        return response()->json($districts, 200);
    }
}

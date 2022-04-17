<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\GeneralRepository;

class GeneralController extends Controller
{

    public function listFuel(Request $request) {
        $generalRepo = new GeneralRepository();

        $fuels = $generalRepo->findAllFuel();

        return response()->json($fuels, 200);
    }

    public function listBodyType(Request $request) {

        $params = $request->all();

        $generalRepo = new GeneralRepository();

        $bodyTypes = $generalRepo->findAllBodyType($params);

        return response()->json($bodyTypes, 200);
    }

    public function listTransmission(Request $request) {
        $generalRepo = new GeneralRepository();

        $transmissions = $generalRepo->findAllTransmission();

        return response()->json($transmissions, 200);
    }
}

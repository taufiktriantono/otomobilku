<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Repositories\ModelRepository;

class SettingController extends Controller
{

    public function index(Request $request) {

        $params = $request->all();

        $params['limit'] = $request->query('limit', 10);
        $params['page'] = $request->query('page', 1);

        $modelRepo = new ModelRepository();
        $models = $modelRepo->findAll($params);

        return Inertia::render('Admin/Settings/ListModel', [
            'models' => $models
        ]);
    }

}

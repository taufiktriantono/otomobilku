<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Repositories\BrandRepository;
use App\Repositories\ModelRepository;

class SettingController extends Controller
{

    public function listBrand(Request $request) {

        $params = $request->all();

        $params['limit'] = $request->query('limit', 10);
        $params['page'] = $request->query('page', 1);

        $brandRepo = new BrandRepository();
        $brands = $brandRepo->findAll()
            ->paginate($params['limit'])
            ->withQueryString();

        return Inertia::render('Admin/Settings/ListBrand', [
            'brands' => $brands
        ]);

    }

    public function showBrand($id, Request $request) {
        $brandRepo = new BrandRepository();
        $brands = $brandRepo->findOneByID($id)->first();
        return Inertia::render('Admin/Settings/AddBrand', [
            'action' => 'show',
            'brand' => $brands
        ]);
    }

    public function addBrand(Request $request) {
        return Inertia::render('Admin/Settings/AddBrand', [
            'action' => 'store'
        ]);
    }

    public function listModel(Request $request) {

        $params = $request->all();

        $params['limit'] = $request->query('limit', 10);
        $params['page'] = $request->query('page', 1);

        $modelRepo = new ModelRepository();
        $models = $modelRepo->findAll($params)
            ->paginate($params['limit'])
            ->withQueryString();

        return Inertia::render('Admin/Settings/ListModel', [
            'models' => $models
        ]);
    }

}

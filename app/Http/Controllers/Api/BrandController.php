<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\BrandRepository;
use App\Repositories\ModelRepository;
use App\Repositories\VariantRepository;

class BrandController extends Controller
{
    public function findAll() {
        $brandRepo = new BrandRepository();

        $brands = $brandRepo->findAll();

        return response()->json($brands, 200);
    }

    public function show($id) {}

    public function findAllModels(Request $request) {
        $validator = $request->validate([
            'brand_ids' => 'array',
        ]);

        $modelRepo = new ModelRepository();

        $models = $modelRepo->findAll($validator);

        return response()->json($models, 200);
    } 

    public function findAllModel($brandId) {
        $modelRepo = new ModelRepository();

        $models = $modelRepo->findAll([
            'brand_id' => $brandId
        ]);

        return response()->json($models, 200);
    }

    public function findAllVariant($modelId) {
        $variantRepo = new VariantRepository();

        $variants = $variantRepo->findAll([
            'model_id' => $modelId
        ]);

        return response()->json($variants, 200);
    }
}

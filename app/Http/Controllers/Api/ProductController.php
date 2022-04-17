<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

use App\Repositories\ProductRepository;

class ProductController extends Controller
{
    public function findAll(Request $request) {
        $params = $request->all();

        $params['limit'] = $request->query('limit', 10);

        $productRepo = new ProductRepository();

        $products = $productRepo->findAll($params);

        return response()->json($products, 200);
    }

    public function getProductByID($id) {
        $productRepo = new ProductRepository();
        $product = $productRepo->getProductByID($slug);

        return response()->json($product, 200);
    }

    public function getProductBySlug($slug) {
        $productRepo = new ProductRepository();
        $product = $productRepo->getProductBySlug($slug);

        return response()->json($product, 200);
    }

    public function addProduct(Request $request) {

        $validator = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
            'product_sub_category_id' => 'required',
            'price' => 'required',
            'product_model_id' => 'required',
            'build_year' => 'required',
            'product_body_type_id' => 'required',
            'distance' => 'required',
            'product_fuel_id' => 'required',
            'product_transmission_id' => 'required',
            'product_district_id' => 'required',
            'distance' => 'required',
            'geo_point' => 'required',
            'is_active' => 'required',
            'seller_id' => 'required',
            'full_name' => 'required',
            'phone_number' => 'required',
            'image_path' => 'array'
        ]);

        $productRepo = new ProductRepository();

        $product = $productRepo->store($validator);
        if (!$product) {

        }

        if ($request->expectsJson()) {
            return response()->json($product, 200);
        }

        return redirect()->route('dashboard');
    }
}

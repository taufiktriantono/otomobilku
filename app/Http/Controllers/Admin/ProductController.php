<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Repositories\ProductRepository;

class ProductController extends Controller
{
    public function index(Request $request) {
        $params = $request->all();

        $params['limit'] = $request->query('limit', 2);
        $params['page'] = $request->query('page', 1);
        $params['archive'] = $request->query('archive', true);

        $productRepo = new ProductRepository();

        $products = $productRepo->findAll($params);

        return Inertia::render('Admin/ListProduct', ['products' => $products]);
    }

    public function show($id) {
        $productRepo = new ProductRepository();
        $product = $productRepo->getProductById($id);
        return Inertia::render('Admin/DetailProduct', ['product' => $product]);
    }

    public function store(Request $request) {
        return Inertia::render('Admin/AddProduct');
    }

    public function edit($id) {
        $productRepo = new ProductRepository();
        $product = $productRepo->getProductById($id);
        return Inertia::render('Admin/EditProduct', ['product' => $product]);
    }

    public function doEdit($id, Request $request) {

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
            'geo_point' => 'string|nullable',
            'is_active' => 'required',
            'seller_id' => 'required',
            'image_path' => 'array',
            'owner' => [
                'full_name' => 'required',
                'phone_number' => 'required'
            ],
            'archive' => 'nullable',
            'verified' => 'nullable'
        ]);

        $productRepo = new ProductRepository();

        $product = $productRepo->updateProductByID($id, $validator);

        return redirect()->route('get:product', ['id' => $product->id]);
    }

    public function editPermintaan($id, Request $request) {

        $validator = $request->validate([
            'archive' => 'nullable',
            'verified' => 'nullable'
        ]);

        $productRepo = new ProductRepository();

        $product = $productRepo->editRequest($id, $validator);

        return redirect()->route('list:product');
    }
}

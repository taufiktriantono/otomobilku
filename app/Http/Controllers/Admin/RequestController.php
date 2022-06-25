<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Repositories\ProductRepository;

class RequestController extends Controller
{
    public function index(Request $request) {
        $params = $request->all();

        $params['limit'] = $request->query('limit', 10);
        $params['page'] = $request->query('page', 1);
        $params['archive'] = true;

        $productRepo = new ProductRepository();

        $products = $productRepo->findAll($params);

        return Inertia::render('Admin/ListRequest', ['products' => $products]);
    }

    public function update($id, Request $request) {

        $validator = $request->validate([
            'archive' => 'required',
            'verified' => 'required'
        ]);

        $productRepo = new ProductRepository();

        $product = $productRepo->getProductById($id);
        if (!isset($product)) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        if ($productRepo->updateProductByID($id, $validator)) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        return redirect()->back()->withErrors($validator)->withInput();

    }
}

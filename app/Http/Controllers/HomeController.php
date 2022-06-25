<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Repositories\ProductRepository;
use App\Repositories\LocationRepository;
use App\Repositories\BrandRepository;
use App\Repositories\ModelRepository;
use App\Repositories\GeneralRepository;

class HomeController extends Controller
{
    public function index(Request $request) {
        return redirect()->route('list.product');
    }

    public function listProduct(Request $request) {
        $keyword = $request->query('q');
        return Inertia::render('ListProduct', [
            'cs_phone' => env('OFFICIAL_PHONE'),
            'keyword' => $keyword
        ]);
    }

    public function showProduct($slug) {
        $breadcrumb = [
            [
                'name' => 'Mobil Bekas',
                'slug' => 'mobil-bekas'
            ]
        ];
        return Inertia::render('DetailProduct', [ 'slug' => $slug, 'breadcrumb' => $breadcrumb, 'cs_phone' => env('OFFICIAL_PHONE'),]);
    }

    public function form(Request $request) {
        return Inertia::render('AddRequest');
    }

    public function storeForm(Request $request) {

        $validator = $request->validate([
            'product_sub_category_id' => 'required',
            'product_model_id' => 'required',
            'product_transmission_id' => 'required',
            'product_variant_id' => 'string',
            'variant_id' => 'string|nullable',
            'build_year' => 'required',
            'is_active' => 'required',
            'archive' => 'required',
            'verified' => 'required',
            'phone_number' => 'required',
        ]);

        $productRepo = new ProductRepository();
        if (!$productRepo->storeSellRequest($validator)) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        return redirect()->route('sell:product:success');
    }

    public function success(Request $request) {
        return Inertia::render('SuccessRequest');
    }

}

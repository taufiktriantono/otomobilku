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

    public function form(Request $request) {}

    public function storeForm(Request $request) {} 
}

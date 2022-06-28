<?php

namespace App\Http\Controllers\Inspector;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Repositories\ProductRepository;

class ProductController extends Controller
{

    public function store(Request $request) {
        return Inertia::render('Inspector/AddProduct');
    }

    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        return response()->json([
            'success' => 200
        ], 200);

    }

}

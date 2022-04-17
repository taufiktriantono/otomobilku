<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Repositories\ProductRepository;

class HomeController extends Controller
{
    public function index(Request $request) {
        return redirect()->route('list:product');
        // return Inertia::render('Admin/ListProduct', [
        //     'canLogin' => Route::has('login'),
        //     'canRegister' => Route::has('register'),
        //     'laravelVersion' => Application::VERSION,
        //     'phpVersion' => PHP_VERSION,
        // ]);
    }
}

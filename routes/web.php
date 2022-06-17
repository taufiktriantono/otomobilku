<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\Admin\HomeController as AdminController;
use App\Http\Controllers\Admin\ProductController as ProductController;
use App\Http\Controllers\Admin\ImageController as ImageController;
use App\Http\Controllers\Admin\RequestController as RequestController;
use App\Http\Controllers\Api\ProductController as ApiProductController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::domain(env('APP_DOMAIN'))->group(function() {
    Route::get('/', [HomeController::class, 'listProduct'])->name('home');
    // Route::get('/mobil-bekas', [HomeController::class, 'listProduct'])->name('list.product');
    Route::get('/mobil-bekas/{slug}', [HomeController::class, 'showProduct'])->name('show:product');
});

Route::domain('admin.'.env('APP_DOMAIN'))->group(function() {
    Route::middleware(['auth'])->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('dashboard');
        Route::get('/products', [ProductController::class, 'index'])->name('list:product');
        Route::get('/products/add', [ProductController::class, 'store'])->name('store:product');
        Route::post('/products', [ApiProductController::class, 'addProduct']);
        Route::get('/products/{slug}', [ProductController::class, 'show'])->name('get:product');
        Route::get('/products/{slug}/edit', [ProductController::class, 'edit'])->name('update:product');
        Route::put('/products/{id}', [ProductController::class, 'doEdit']);
        Route::post('/images', [ImageController::class, 'upload']);
        Route::get('/permintaan', [RequestController::class, 'index'])->name('list-permintaan');
        Route::put('/permintaan/{id}', [RequestController::class, 'update'])->name('update-permintaan');
    });

    require __DIR__.'/auth.php';
});
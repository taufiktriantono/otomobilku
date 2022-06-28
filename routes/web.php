<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\BlogController;

use App\Http\Controllers\Admin\HomeController as AdminController;
use App\Http\Controllers\Admin\ProductController as ProductController;
use App\Http\Controllers\Admin\ImageController as ImageController;
use App\Http\Controllers\Admin\RequestController as RequestController;
use App\Http\Controllers\Admin\SettingController as SettingController;
use App\Http\Controllers\Admin\UserController as UserController;
use App\Http\Controllers\Api\ProductController as ApiProductController;

use App\Http\Controllers\Inspector\ProductController as InspectorProductController;

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
    Route::get('/jual-mobil', [HomeController::class, 'form'])->name('sell:product');
    Route::post('/jual-mobil', [HomeController::class, 'storeForm'])->name('sell:product:store');
    Route::get('/jual-mobil/success', [HomeController::class, 'success'])->name('sell:product:success');
});

Route::domain('accounts.'.env('APP_DOMAIN'))->group(function() {
    require __DIR__.'/auth.php';
});

Route::domain(env('ADMIN_DOMAIN'))->group(function() {
    Route::middleware(['auth'])->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('dashboard');
        Route::get('/products', [ProductController::class, 'index'])->name('list:product');
        Route::get('/products/add', [ProductController::class, 'store'])->name('store:product');
        Route::post('/products', [ApiProductController::class, 'addProduct']);
        Route::get('/products/{id}', [ProductController::class, 'show'])->name('get:product');
        Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('update:product');
        Route::put('/products/{id}', [ProductController::class, 'doEdit']);
        Route::post('/images', [ImageController::class, 'upload']);
        Route::get('/permintaan', [RequestController::class, 'index'])->name('list-permintaan');
        Route::put('/permintaan/{id}', [ProductController::class, 'editPermintaan'])->name('update-permintaan');
        Route::post('/logout', [AdminController::class, 'destroy'])->name('admin-logout');

        Route::prefix('settings')->group(function () {
                Route::get('/brands', [SettingController::class, 'listBrand'])->name('setting-brand');
                Route::get('/brands/{id}/show', [SettingController::class, 'showBrand'])->name('setting-show-brand');
                Route::get('/brands/add', [SettingController::class, 'addBrand'])->name('setting-add-brand');
                // Route::post('/brands/add', [SettingController::class, 'addBrand']);

                Route::get('/models', [SettingController::class, 'listModel'])->name('setting-model');
                Route::get('/models/add', [SettingController::class, 'listModel'])->name('setting-add-model');
                // Route::post('/models/add', [SettingController::class, 'addModel']);

                Route::get('/models/{id}/show', [SettingController::class, 'showModel'])->name('setting-show-model');
                Route::get('/models/{id}/edit', [SettingController::class, 'updateModel'])->name('setting-update-model');
                Route::put('/models/{id}', [SettingController::class, 'update'])->name('update-model');

                Route::get('/users', [UserController::class, 'index'])->name('list-user');
                Route::get('/users/add', [UserController::class, 'store'])->name('store-user');
                Route::post('/users/add', [UserController::class, 'store']);
                Route::get('/user/{id}', [UserController::class, 'show'])->name('show-user');
                Route::put('/user/{id}', [UserController::class, 'update'])->name('update-user');
        });

    });

});

Route::domain(env('INSPECTOR_DOMAIN'))->middleware(['auth'])->group(function() {
    Route::get('/', [InspectorProductController::class, 'store'])->name('home-inspector');
    Route::post('/', [ApiProductController::class, 'addProduct']);
    Route::post('/logout', [InspectorProductController::class, 'destroy'])->name('logout-inspector');
});
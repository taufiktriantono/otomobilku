<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\GeneralController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/cities', [LocationController::class, 'findAll']);
Route::get('/districts', [LocationController::class, 'findAllDistrict']);

Route::get('/fuels', [GeneralController::class, 'listFuel']);
Route::get('/bodyTypes', [GeneralController::class, 'listBodyType']);
Route::get('/transmissions', [GeneralController::class, 'listTransmission']);

Route::get('/models', [BrandController::class, 'findAllModels']);
// Route::post('/models', [BrandController::class, 'findAllModels']);

Route::get('/models/{model_id}/variants', [BrandController::class, 'findAllVariants']);
// Route::post('/models/{model_id}/variants', [BrandController::class, 'findAllVariants']);

Route::get('/brands', [BrandController::class, 'findAll']);
Route::get('/brands/{brand_id}', [BrandController::class, 'show']);
Route::get('/brands/{brand_id}/models', [BrandController::class, 'findAllModel']);
Route::get('/brands/{brand_id}/models/{model_id}', [BrandController::class, 'showModel']);

Route::get('/products', [ProductController::class, 'findAll']);
Route::get('/products/{slug}', [ProductController::class, 'getProductBySlug']);

Route::post('/uploads/images', [ImageController::class, 'upload']);

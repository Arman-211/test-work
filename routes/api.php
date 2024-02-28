<?php

use App\Http\Controllers\ProductController;
use App\Http\Middleware\CheckProductAccess;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::group(['middleware' => [CheckProductAccess::class]], function () {
    Route::delete('/products/delete/{productId}', [ProductController::class, 'delete']);
    Route::post('products/create', [ProductController::class, 'create'])->name('products.create');
    Route::put('/products/update', [ProductController::class, 'update'])->name('products.update');

//});

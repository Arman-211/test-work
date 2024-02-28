<?php

use App\Http\Controllers\ProductController;
use App\Http\Middleware\CheckProductAccess;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/products', [App\Http\Controllers\ProductController::class, 'index'])->name('product');
Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
Route::get('/products/get/{id}', [ProductController::class, 'edit'])->name('products.get');




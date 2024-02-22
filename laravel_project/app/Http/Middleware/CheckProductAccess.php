<?php

namespace App\Http\Middleware;

use App\Models\Product;
use Closure;

class CheckProductAccess
{
    /**
     * Handle an incoming request.
     *
     * @param $request
     * @param Closure $next
     * @return mixed|void
     */
    public function handle($request, Closure $next)
    {
        // Check if the user is an admin
        if (auth()->user()->role === config('products.role')) {
            return $next($request); // Admin has full access
        }

        // Retrieve the product ID from the request route parameters
        $productId = $request->route('product');

        // Fetch the product from the database
        $product = Product::query()->find($productId);

        // Check if the product exists
        if (!$product) {
            abort(404, 'Product not found.');
        }

        // Check if the user has permission to update the product
        if ($request->user()->can('update', $product)) {
            return $next($request);
        }

        // User is not authorized to update this product
        abort(403, 'You are not authorized to update this product.');
    }
}

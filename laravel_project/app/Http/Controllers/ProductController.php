<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductDeleteRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use App\Services\Product\ProductServiceInterface;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use JetBrains\PhpStorm\NoReturn;

class ProductController extends Controller
{
    protected ProductServiceInterface $productService;

    /**
     * @param ProductServiceInterface $productService
     */
    public function __construct(ProductServiceInterface $productService)
    {
        $this->productService = $productService;
    }

    /**
     * @param ProductCreateRequest $request
     * @return RedirectResponse
     */
    #[NoReturn] public function create(ProductCreateRequest $request): RedirectResponse
    {
      return $this->productService->productCreate($request);
    }

    /**
     * @param ProductUpdateRequest $request
     */
    public function update(ProductUpdateRequest $request)
    {
        return $this->productService->productUpdate($request);
    }

    public function delete($productId)
    {
        try {
            $product = Product::findOrFail($productId);
            $product->delete();

            // Return a successful response
            return response()->json(['message' => 'Product deleted successfully'], 200);
        } catch (\Exception $e) {
            // Return an error response if deletion fails
            return response()->json(['error' => 'Failed to delete product'], 500);
        }
    }

    /**
     * @return Factory|\Illuminate\Foundation\Application|View|Application
     */
    public function index(): Factory|\Illuminate\Foundation\Application|View|Application
    {
        return $this->productService->productPage();
    }

    /**
     * @param $productId
     */
    public function edit($productId)
    {
        return $this->productService->productEdit($productId);
    }
}

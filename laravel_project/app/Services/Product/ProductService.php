<?php

namespace App\Services\Product;

use App\Jobs\SendProductCreationNotification;
use App\Models\Product;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class ProductService implements ProductServiceInterface
{
    /**
     * @param $request
     * @return RedirectResponse
     */
    public function productCreate($request): RedirectResponse
    {
        // Extract attributes from the request
        $attributes = array_combine(
            $request->input('attributes.key', []),
            $request->input('attributes.value', [])
        );

        // Create the product
        $product = Product::query()->create([
            'name' => $request->input('name'),
            'article' => $request->input('article'),
            'status' => $request->input('status'),
            'data' => $attributes ? json_encode($attributes) : null,
        ]);

        // Dispatch notification job
        if (config('products.email')) {
            SendProductCreationNotification::dispatch($product)->onQueue('notifications');
        }

        return redirect()->route('product')->with('success', 'Product created successfully');
    }

    /**
     * @param $request
     * @return JsonResponse|RedirectResponse
     */
    public function productUpdate($request): JsonResponse|RedirectResponse
    {

        $requestData = $request->only(['article', 'name', 'status', 'data']);
        $product = Product::query();
        $product->where('id', $request->id)->update($requestData);

        $newAttributes = array_combine(
            $request->input('newAttributes.key', []),
            $request->input('newAttributes.value', [])
        );
        $oldAttributes = array_combine(
            $request->input('attributes.key', []),
            $request->input('attributes.value', []),
        );
        $product = $product->findOrFail($request->id);
        $attributes = $product->data ? json_decode($product->data, true) : [];

        if(!empty($oldAttributes)){
            $attributes = $oldAttributes;
        }else{
            $attributes = [];
        }
        if(!empty($newAttributes)){
            $attributes = $oldAttributes + $newAttributes;
        }

        $product->data = json_encode($attributes);
        $product->save();

        return redirect()->route('product')->with('success', 'Product updated successfully');
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function productDelete($id): JsonResponse
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            return response()->json(['message' => 'Product deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete product'], 500);
        }
    }

    /**
     * @return Factory|\Illuminate\Foundation\Application|View|Application
     */
    public function productPage(): Factory|\Illuminate\Foundation\Application|View|Application
    {
        $products = Product::query()->orderByDesc('id')->get();
        return view('product.products')->with('products', $products);
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function productEdit($id): JsonResponse
    {
        $product = Product::find($id);
        return response()->json($product);
    }
}

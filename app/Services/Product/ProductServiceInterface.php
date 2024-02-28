<?php

namespace App\Services\Product;

use App\Models\Product;

interface ProductServiceInterface
{
    /**
     * @param $request
     */
    public function productCreate($request);

    /**
     * @param $request
     */
    public function productUpdate($request);

    /**
     * @param $id
     */
    public function productDelete($id);

    /**
     * @return mixed
     */
    public function productPage(): mixed;

    /**
     * @param $id
     */
    public function productEdit($id);
}

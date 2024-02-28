<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use JetBrains\PhpStorm\ArrayShape;

class ProductCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return string[]
     */
    #[ArrayShape(['name' => "string", 'article' => "string", 'status' => "string"])] public function rules(): array
    {
        return [
            'name' => 'required|min:10',
            'article' => 'required|alpha_num|unique:products',
            'status' => ['sometimes', Rule::in(['available', 'unavailable'])], // Add validation for the status field
        ];
    }
}

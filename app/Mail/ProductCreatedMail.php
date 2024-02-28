<?php

namespace App\Mail;

use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ProductCreatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public Product $product;

    public function __construct($product)
    {
        $this->product = $product;
    }

    /**
     * @return ProductCreatedMail
     */
    public function build(): ProductCreatedMail
    {
        return $this->markdown('emails.product-created')
            ->subject('Product Created Notification');
    }
}

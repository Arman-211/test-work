<?php

namespace App\Notifications;

use App\Mail\ProductCreatedMail;
use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ProductCreated extends Notification implements \Illuminate\Contracts\Mail\Mailable
{
    use Queueable;

    protected Product $product;

    /**
     * @param $product
     */
    public function __construct($product)
    {
        $this->product = $product;
    }

    /**
     * @param $notifiable
     * @return string[]
     */
    public function via($notifiable): array
    {
        return ['mail'];
    }

    /**
     * @param $notifiable
     * @return ProductCreatedMail
     */
    public function toMail($notifiable): ProductCreatedMail
    {
        return (new ProductCreatedMail($this->product));
    }

    /**
     * @param $notifiable
     * @return array
     */
    public function toArray($notifiable): array
    {
        return [
            //
        ];
    }
}

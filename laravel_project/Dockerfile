# Use an official PHP image as a base
FROM php:8.2-fpm

# Set the working directory in the container
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libpq-dev \
    zip \
    unzip \
    npm \
    vite \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql pdo_pgsql \
    && apt-get clean

# Install Node.js
RUN apt-get install -y nodejs

# Copy composer.lock and composer.json
COPY composer.lock composer.json ./

# Install composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-scripts --no-autoloader

# Copy existing application directory contents
COPY . .

RUN composer dump-autoload --optimize

# Expose port 9000 and start php-fpm server
EXPOSE 8000

CMD  php artisan serve --host=0.0.0.0 --port=8000 && npm run dev

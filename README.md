<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

## About Frangalo

Ghana Cocoa Board (Cocobod) - Management System.

## Project Setup

### Backend Configurations

1. First clone this repository using:

    ```bash
    git clone https://github.com/Louxsdon/cocobod.git
    ```

2. Then navigate into the project folder and run the below command to install the dependencies

    ```bash
    composer install
    ```

3. Copy or rename `.env.example` to `.env` then fill in your database credentials
4. Generate new `APP_KEY`

    ```bash
    php artisan key:generate
    ```

    This will generate a new APP_KEY and place it in your `.env` file.

5. Run database migration and store the default account crendentials

````bash
    php artisan migrate --seed
    ```
6. Run the backend server
    ```bash
    php artisan serve
    ```

### Frontend Configurations

1. In the same directory, the command below to install node packages neccessary for the frontend

    ```bash
    npm install
    ```
    or with yarn

    ```bash
    yarn
    ```

2. Start the frontend development server

     ```bash
    npm run dev
    ```
    or with yarn

    ```bash
    yarn dev
    ```

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
````

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::table('users')->insert([
        $user = User::create([
            'name' => "Louxs Don",
            'email' => 'admin@gmail.com',
            'phone' => '0552444055',
            'password' => Hash::make('admin123'),
        ]);

        $user->assignRole('super-admin');

        // $user = User::create([
        //     'name' => "Man Fuji",
        //     'email' => 'manf@gmail.com',
        //     'phone' => '0541444050',
        //     'approved' => true,
        //     'referrer_code' => 'Super10',
        //     'password' => Hash::make('admin123'),
        // ]);

        // $user->wallet()->create(["balance"=>10.00]);
        // $user = User::create([
        //     'name' => "John Doe",
        //     'email' => 'johnd@gmail.com',
        //     'phone' => '0541444050',
        //     'approved' => true,
        //     'referrer_code' => 'Super10',
        //     'password' => Hash::make('admin123'),
        // ]);

        // $user->wallet()->create(["balance"=>10.00]);
        // $user = User::create([
        //     'name' => "Jane Doe",
        //     'email' => 'janed@gmail.com',
        //     'phone' => '0541444050',
        //     'approved' => true,
        //     'referrer_code' => 'Super10',
        //     'password' => Hash::make('admin123'),
        // ]);

        // $user->wallet()->create(["balance"=>10.00]);
        // $user = User::create([
        //     'name' => "Will Smith",
        //     'email' => 'willsmith@gmail.com',
        //     'phone' => '0541444050',
        //     'approved' => true,
        //     'referrer_code' => 'Super10',
        //     'password' => Hash::make('admin123'),
        // ]);

        // $user->wallet()->create(["balance"=>10.00]);
        // $user = User::create([
        //     'name' => "John Smith",
        //     'email' => 'johns@gmail.com',
        //     'phone' => '0541444050',
        //     'approved' => true,
        //     'referrer_code' => 'Super10',
        //     'password' => Hash::make('admin123'),
        // ]);

        // $user->wallet()->create(["balance"=>10.00]);
        // $user = User::create([
        //     'name' => "Jackson W",
        //     'email' => 'jackw@gmail.com',
        //     'phone' => '0541444050',
        //     'approved' => true,
        //     'referrer_code' => 'Super10',
        //     'password' => Hash::make('admin123'),
        // ]);

        // $user->wallet()->create(["balance"=>10.00]);
        // $user = User::create([
        //     'name' => "Louxs Don",
        //     'email' => 'louxsdon@gmail.com',
        //     'phone' => '0541444050',
        //     'approved' => true,
        //     'referrer_code' => 'Super10',
        //     'password' => Hash::make('louxs123'),
        // ]);

        // $user->wallet()->create(["balance"=>210.00]);
        // $user = User::create([
        //     'name' => "Test User1",
        //     'email' => 'test1@gmail.com',
        //     'phone' => '0541444050',
        //     'approved' => true,
        //     'referrer_code' => 'Super10',
        //     'password' => Hash::make('louxs123'),
        // ]);

        // $user->wallet()->create(["balance"=>210.00]);
        // $user = User::create([
        //     'name' => "Test User2",
        //     'email' => 'test2@gmail.com',
        //     'phone' => '0541444050',
        //     'approved' => true,
        //     'referrer_code' => 'Super10',
        //     'password' => Hash::make('louxs123'),
        // ]);

        // $user->wallet()->create(["balance"=>210.00]);
    }
}

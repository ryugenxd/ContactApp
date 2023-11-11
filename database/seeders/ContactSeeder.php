<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{
    Contact,
    User
};

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('username','test')->first();
        Contact::create([
            'first_name'=>'test',
            'last_name'=>'test',
            'email'=>'test@gmail.com',
            'phone'=>'11111111',
            'user_id'=>$user -> id,
        ]);
    }
}

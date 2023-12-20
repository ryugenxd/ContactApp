<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        for($i=0;$i<50;$i++){
            \App\Models\Contact::create([
                'first_name'=>fake()->name(),
                'last_name'=>fake()->name(),
                'email'=>fake()->unique()->safeEmail(),
                'phone'=>fake()->phoneNumber(),
                'user_id'=>95,
            ]);
        }
        
        

        

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}

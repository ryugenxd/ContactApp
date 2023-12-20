<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{
    User,
    Contact
};

class SearchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('username','test')->first();
        for($i = 0;$i < 20 ; $i++){
        Contact::create([
                'first_name'=>'first '.$i,
                'last_name'=>'last '.$i,
                'email'=>'test'.$i.'@gmail.com',
                'phone'=>'11111'.$i,
                'user_id'=>$user -> id
            ]);
        }
    }
}

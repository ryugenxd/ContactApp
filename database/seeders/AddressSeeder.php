<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{
    Contact,
    Address
};

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contact = Contact::query()->limit(1)->first();
        Address::create([
            "street"=>'test',
            "city"=>'test',
            "province"=>'test',
            "country"=>'test',
            "postal_code"=>'123123',
            "contact_id"=>$contact->id
        ]);
    }
}

<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\{
    Contact,
    Address
};
use Database\Seeders\{
    UserSeeder,
    ContactSeeder,
    AddressSeeder
};

class AddressTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_create_success(): void
    {
        $this -> seed([UserSeeder::class,ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first(); 
        $this -> post('/api/contacts/'.$contact->id.'/addresses',[
            'street'=>'test',
            'city'=>'test',
            'province'=>'test',
            'country'=>'test',
            'postal_code'=>'123123'
        ],[
            'Authorization'=>'test'
        ])
        ->assertStatus(201)
        ->assertJson([
            'data'=>[
                'street'=>'test',
                'city'=>'test',
                'province'=>'test',
                'country'=>'test',
                'postal_code'=>'123123',
            ]
        ]);
    }

    public function test_create_failed():void
    {
        $this -> seed([UserSeeder::class,ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first(); 
        $this -> post('/api/contacts/'.$contact->id.'/addresses',[
            'street'=>'test',
            'city'=>'test',
            'province'=>'test',
            'country'=>'',
            'postal_code'=>'123123'
        ],[
            'Authorization'=>'test'
        ])
        ->assertStatus(400)
        ->assertJson([
            'errors'=>[
                'country'=>[
                    "The country field is required."
                ],
            ]
        ]);
    }

    public function test_create_contact_not_found():void
    {

        $this -> seed([UserSeeder::class,ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first(); 
        $this -> post('/api/contacts/'.($contact->id+1).'/addresses',[
            'street'=>'test',
            'city'=>'test',
            'province'=>'test',
            'country'=>'test',
            'postal_code'=>'123123'
        ],[
            'Authorization'=>'test'
        ])
        ->assertStatus(404)
        ->assertJson([
        'errors'=>[
        'message'=>[
            'not found'
            ]
        ]
        ]);
    }

    public function test_get_success():void
    {
        $this -> seed([
            UserSeeder::class,
            ContactSeeder::class,
            AddressSeeder::class
        ]);

        $address = Address::query()->limit(1)->first();
        $this -> get('/api/contacts/'.$address->contact_id.'/addresses/'.$address->id,[
            'Authorization'=>'test'
        ])
        ->assertStatus(200)
        ->assertJson([
            "data"=>[
                "street"=>'test',
                "city"=>'test',
                "province"=>'test',
                "country"=>'test',
                "postal_code"=>'123123',
            ]
        ]);
    }

    public function test_get_not_found():void
    {
        $this -> seed([
            UserSeeder::class,
            ContactSeeder::class,
            AddressSeeder::class
        ]);

        $address = Address::query()->limit(1)->first();
        $this -> get('/api/contacts/'.$address->contact_id.'/addresses/'.($address->id+1),[
            'Authorization'=>'test'
        ])
        ->assertStatus(404)
        ->assertJson([
            "errors"=>[
                "message"=>['not found']
            ]
        ]);
    }

    public function test_update_success():void
    {
        $this -> seed([
            UserSeeder::class,
            ContactSeeder::class,
            AddressSeeder::class
        ]);
        $address = Address::query()->limit(1)->first();
        $this -> put('/api/contacts/'.$address->contact_id.'/addresses/'.($address->id),[
            'street'=>'test2',
            'city'=>'test2',
            'province'=>'test2',
            'country'=>'test2',
            'postal_code'=>'321321',
        ],[
            'Authorization'=>'test'
        ])
        ->assertStatus(200)
        ->assertJson([
            "data"=>[
                'street'=>'test2',
                'city'=>'test2',
                'province'=>'test2',
                'country'=>'test2',
                'postal_code'=>'321321',
            ]
        ]);
    }

    public function test_update_failed():void 
    {
        $this -> seed([
            UserSeeder::class,
            ContactSeeder::class,
            AddressSeeder::class
        ]);
        $address = Address::query()->limit(1)->first();
        $this -> put('/api/contacts/'.$address->contact_id.'/addresses/'.($address->id),[
            'street'=>'test2',
            'city'=>'test2',
            'province'=>'test2',
            'country'=>'',
            'postal_code'=>'321321',
        ],[
            'Authorization'=>'test'
        ])
        ->assertStatus(400)
        ->assertJson([
            "errors"=>[
                'country'=>['The country field is required.'],
            ]
        ]);
    }

    public function test_update_not_found():void 
    {
        $this -> seed([
            UserSeeder::class,
            ContactSeeder::class,
            AddressSeeder::class
        ]);
        $address = Address::query()->limit(1)->first();
        $this -> put('/api/contacts/'.($address->contact_id+1).'/addresses/'.($address->id),[
            'street'=>'test2',
            'city'=>'test2',
            'province'=>'test2',
            'country'=>'test2',
            'postal_code'=>'321321',
        ],[
            'Authorization'=>'test'
        ])
        ->assertStatus(404)
        ->assertJson([
            "errors"=>[
                'message'=>[
                    'not found'
                ],
            ]
        ]);
    }

    public function test_delete_success():void 
    {
        $this -> seed([
            UserSeeder::class,
            ContactSeeder::class,
            AddressSeeder::class
        ]);
        $address = Address::query()->limit(1)->first();
        $this -> delete('/api/contacts/'.$address->contact_id.'/addresses/'.$address->id,[],[
            'Authorization'=>'test'
        ])
        -> assertStatus(200)
        -> assertJson([
            'data'=>TRUE
        ]);
    }

    public function test_delete_not_found():void
    {
        $this -> seed([
            UserSeeder::class,
            ContactSeeder::class,
            AddressSeeder::class
        ]);
        $address = Address::query()->limit(1)->first();
        $this -> delete('/api/contacts/'.$address->contact_id.'/addresses/'.$address->id+1,[],[
            'Authorization'=>'test'
        ])
        -> assertStatus(404)
        -> assertJson([
            'errors'=>[
                "message"=>["not found"]
            ]
        ]);
    }

    public function test_list_success():void
    {
        $this -> seed([
            UserSeeder::class,
            ContactSeeder::class,
            AddressSeeder::class
        ]);
        $contact = Contact::query()->limit(1)->first();
        $this -> get('/api/contacts/'.$contact->id.'/addresses',[
            'Authorization'=>'test'
        ])
        ->assertStatus(200)
        ->assertJson([
            'data'=>[
                ['street'=>'test',
                'city'=>'test',
                'province'=>'test',
                'country'=>'test',
                'postal_code'=>'123123',]
            ]
        ]);
    }

    public function test_list_contact_not_found():void
    {
        $this -> seed([
            UserSeeder::class,
            ContactSeeder::class,
            AddressSeeder::class
        ]);
        $contact = Contact::query()->limit(1)->first();
        $this -> get('/api/contacts/'.($contact->id+1).'/addresses',[
            'Authorization'=>'test'
        ])
        ->assertStatus(404)
        ->assertJson([
            'errors'=>[
                'message'=>[
                    'not found'
                ]
            ]
        ]);
    }
}

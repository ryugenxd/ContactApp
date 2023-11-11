<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Contact;
use Database\Seeders\{
    UserSeeder,
    ContactSeeder,
    SearchSeeder
};

use Illuminate\Support\Facades\Log;

class ContactTest extends TestCase
{
    
    public function test_create_success(): void
    {
        $this -> seed([UserSeeder::class]);
        $this -> post('/api/contacts',[
            'first_name' => 'ryugen',
            'last_name' => 'xd',
            'email' => 'ryugenxd@gmail.com',
            'phone' => '+6281340662711'
        ],[
            'Authorization' => 'test'
        ])
        -> assertStatus(201)
        ->assertJson([
            'data'=>[
                'first_name'=>'ryugen',
                'last_name'=>'xd',
                'email'=>'ryugenxd@gmail.com',
                'phone'=>'+6281340662711'
            ]
        ]);

    }

    public function test_create_failed(): void
    {
        
        $this -> seed([UserSeeder::class]);
        $this -> post('/api/contacts',[
            'first_name' => '',
            'last_name' => 'xd',
            'email' => 'ryugenxd',
            'phone' => '+6281340662711'
        ],[
            'Authorization' => 'test'
        ])
        -> assertStatus(400)
        ->assertJson([
            'errors'=>[
                'first_name'=>[
                    "The first name field is required."
                ],
                'email'=>[
                    "The email field must be a valid email address."
                ]
            ]
        ]);
    }

    public function test_create_unauthorizad():void 
    {
        $this -> seed([UserSeeder::class]);
        $this -> post('/api/contacts',[
            'first_name' => '',
            'last_name' => 'xd',
            'email' => 'ryugenxd',
            'phone' => '+6281340662711'
        ],[
            'Authorization' => 'ex'
        ])
        -> assertStatus(401)
        ->assertJson([
            'errors'=>[
                'message'=>"unauthorized",
            ]
        ]);
    }

    public function test_get_success():void
    {
        $this -> seed([UserSeeder::class,ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();
        $this -> get('api/contacts/'.$contact->id,[
            'Authorization'=>'test'
        ])
        -> assertStatus(200)
        -> assertJson([
            'data'=>[
                'first_name'=>'test',
                'last_name'=> 'test',
                'email'=> 'test@gmail.com',
                'phone' => '11111111'
            ]
        ]);
    }

    public function test_get_not_found():void
    {
        $this -> seed([UserSeeder::class,ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();
        $this -> get('api/contacts/'.($contact->id+1),[
            'Authorization'=>'test'
        ])
        -> assertStatus(404)
        -> assertJson([
            'errors'=>[
                'message'=>[
                    'not found'
                ],
            ]
        ]);
    }
    
    public function test_get_other_user_contact():void 
    {
        $this -> seed([UserSeeder::class,ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();
        $this -> get('api/contacts/'.$contact->id,[
            'Authorization'=>'test2'
        ])
        -> assertStatus(404)
        -> assertJson([
            'errors'=>[
                'message'=>[
                    'not found'
                ],
            ]
        ]);
    }

    public function test_update_success():void 
    {
        $this -> seed([UserSeeder::class,ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();
        $this -> put('api/contacts/'.$contact->id,[
            'first_name'=>'test2',
            'last_name'=> 'test2',
            'email'=> 'test2@gmail.com',
            'phone' => '22222222'
        ],[
            'Authorization'=>'test'
        ])
        -> assertStatus(200)
        -> assertJson([
            'data'=>[
                'first_name'=>'test2',
                'last_name'=> 'test2',
                'email'=> 'test2@gmail.com',
                'phone' => '22222222'
            ]
        ]);
    }

    public function test_update_validation_error():void 
    {

        $this -> seed([UserSeeder::class,ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();
        $this -> put('api/contacts/'.$contact->id,[
            'first_name'=>'',
            'last_name'=> 'test2',
            'email'=> 'test2@gmail.com',
            'phone' => '22222222'
        ],[
            'Authorization'=>'test'
        ])
        -> assertStatus(400)
        -> assertJson([
            "errors"=>[
                "first_name" => [
                    "The first name field is required."
                ]
            ]
        ]);
    }

    public function test_delete_success():void
    {

        $this -> seed([UserSeeder::class,ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();
        $this -> delete('api/contacts/'.$contact->id,[],[
            'Authorization'=>'test'
        ])
        -> assertStatus(200)
        -> assertJson([
            'data'=>TRUE
        ]);
    }

    public function test_delete_not_found():void
    {
        $this -> seed([UserSeeder::class,ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();
        $this -> delete('api/contacts/'.$contact->id+1,[],[
            'Authorization'=>'test'
        ])
        -> assertStatus(404)
        -> assertJson([
            'errors'=>[
                "message"=>[
                    "not found"
                ]
            ]
        ]);
    }

    public function test_search_by_first_name():void
    {
        $this -> seed([UserSeeder::class,SearchSeeder::class]);
        $response = $this -> get('/api/contacts?name=first',[
            'Authorization'=>'test'
        ])
        -> assertStatus(200)
        ->json();
        Log::info(json_encode($response));
        self::assertEquals(10,count($response['data']));
        self::assertEquals(20,$response['meta']['total']);
    }

    public function test_search_by_last_name():void
    {
        $this -> seed([UserSeeder::class,SearchSeeder::class]);
        $response = $this -> get('/api/contacts?name=last',[
            'Authorization'=>'test'
        ])
        -> assertStatus(200)
        ->json();
        Log::info(json_encode($response));
        self::assertEquals(10,count($response['data']));
        self::assertEquals(20,$response['meta']['total']);
    }

    public function test_search_by_email():void
    {
        
        $this -> seed([UserSeeder::class,SearchSeeder::class]);
        $response = $this -> get('/api/contacts?email=test',[
            'Authorization'=>'test'
        ])
        -> assertStatus(200)
        ->json();
        Log::info(json_encode($response));
        self::assertEquals(10,count($response['data']));
        self::assertEquals(20,$response['meta']['total']);
    }

    public function test_search_by_phone():void
    {
        
        $this -> seed([UserSeeder::class,SearchSeeder::class]);
        $response = $this -> get('/api/contacts?phone=11111',[
            'Authorization'=>'test'
        ])
        -> assertStatus(200)
        ->json();
        Log::info(json_encode($response,JSON_PRETTY_PRINT));
        //echo json_encode($response,JSON_PRETTY_PRINT);
        self::assertEquals(10,count($response['data']));
        self::assertEquals(20,$response['meta']['total']);
    }

    public function test_search_not_found():void
    {
        $this -> seed([UserSeeder::class,SearchSeeder::class]);
        $response = $this -> get('/api/contacts?name=notfound',[
            'Authorization'=>'test'
        ])
        -> assertStatus(200)
        ->json();
        Log::info(json_encode($response,JSON_PRETTY_PRINT));
        //echo json_encode($response,JSON_PRETTY_PRINT);
        self::assertEquals(0,count($response['data']));
        self::assertEquals(0,$response['meta']['total']);
    }

    public function test_search_with_page():void
    {
        $this -> seed([UserSeeder::class,SearchSeeder::class]);
        $response = $this -> get('/api/contacts?size=5&page=2',[
            'Authorization'=>'test'
        ])
        -> assertStatus(200)
        ->json();
        Log::info(json_encode($response,JSON_PRETTY_PRINT));
        //echo json_encode($response,JSON_PRETTY_PRINT);
        self::assertEquals(5,count($response['data']));
        self::assertEquals(20,$response['meta']['total']);
        self::assertEquals(2,$response['meta']['current_page']);
    }
}

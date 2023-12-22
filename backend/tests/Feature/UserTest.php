<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use  Database\Seeders\UserSeeder;
use App\Models\User;

class UserTest extends TestCase
{

    public function test_register_success(): void
    {
       $this -> post('/api/users',[
        'username'=>'ryugenxd',
        'password'=>'12345678',
        'name'=>'ryugen'
       ])->assertStatus(201)
       ->assertJson([
            'username'=>'ryugenxd',
            'name'=>'ryugen'
      ]);

    }

    public function test_register_failed():void
    {
        $this -> post('/api/users',[
            'username'=>'',
            'password'=>'',
            'name'=>''])
            ->assertStatus(400)
            ->assertJson([
            'errors'=>[
                'username'=>[
                    "The username field is required."
                ],
                'name'=>[
                    "The name field is required."
                ],
                'password'=>[
                    "The password field is required."
                ]
            ]
        ]);
    }

    public function test_register_username_already_to_exists():void
    {
        $this -> test_register_success();
        $this -> post('/api/users',[
            'username'=>'ryugenxd',
            'password'=>'12345678',
            'name'=>'ryugen'
        ])->assertStatus(400)
        ->assertJson([
            'errors'=>[
                'username'=>[
                    "username already to exists"
                ],
            ]
        ]);
    }

    public function test_login_success():void
    {
        $this -> seed([UserSeeder::class]);
        $this -> post('/api/users/login',[
            'username'=>'test',
            'password'=>'test',
        ])->assertStatus(200)
        ->assertJson([
                'username'=>'test',
                'name'=>'test'
        ]);

        $user =  User::where('username','test')->first();
        self::assertNotNull($user->token);

    }

    public function test_login_failed_username_notfoud():void
    {
        $this -> post('/api/users/login',[
            'username'=>'test',
            'password'=>'test'
        ])
        -> assertStatus(401)
        ->assertJson([
            "errors"=>[
                "message"=>[
                    "username or password wrong"
                ]
            ]
        ]);

    }

    public function test_login_failed_password_wrong():void
    {
        $this -> seed([UserSeeder::class]);
        $this -> post('/api/users/login',[
            'username'=>'test',
            'password'=>'3245'
        ])
        -> assertStatus(401)
        ->assertJson([
            "errors"=>[
                "message"=>[
                    "username or password wrong"
                ]
            ]
        ]);

    }

    public function test_get_success():void
    {
        $this -> seed([UserSeeder::class]);
        $this -> get('/api/users/current',[
            'Authorization'=>'test'
        ])
        -> assertStatus(200)
        -> assertJson([
                'username'=>'test',
                'name'=>'test'
        ]);
    }

    public function test_get_unauthorized():void
    {
        $this -> seed([UserSeeder::class]);
        $this -> get('/api/users/current')
        -> assertStatus(401)
        -> assertJson([
            'errors'=>[
                'message'=>'unauthorized',
            ]
        ]);
    }

    public function test_get_invalid_token():void
    {
        $this -> seed([UserSeeder::class]);
        $this -> get('/api/users/current',[
            'Authorization'=>'salah'
        ])
        -> assertStatus(401)
        -> assertJson([
            'errors'=>[
                'message'=>'unauthorized',
            ]
        ]);
    }

    public function test_update_password_success():void
    {
        $this -> seed([UserSeeder::class]);
        $oldUser = User::where('username','test')->first();
        $this -> patch('/api/users/current',[
            'password'=>'new'
        ],
        [
            'Authorization'=>'test'
        ])
        -> assertStatus(200)
        ->assertJson([
                'username'=>'test',
                'name'=>'test'
        ]);
        $newUser = User::where('username','test')->first();
        self::assertNotEquals($oldUser->password,$newUser->password);
    }

    public function test_update_name_success():void
    {
        $this -> seed([UserSeeder::class]);
        $oldUser = User::where('username','test')->first();
        $this -> patch('/api/users/current',[
            'name'=>'new'
        ],
        [
            'Authorization'=>'test'
        ])
        -> assertStatus(200)
        ->assertJson([
                'username'=>'test',
                'name'=>'new'
        ]);
        $newUser = User::where('username','test')->first();
        self::assertNotEquals($oldUser->name,$newUser->name);
    }



    public function test_update_failed():void
    {
        $this -> seed([UserSeeder::class]);
        $this -> patch('/api/users/current',[
            'name'=>'ndjnscjnnwcjnwnchbfhwwwebwfwtfvwetfvwtfvwetfvetfvtfvwtefvwtfvetfvefvftevftwfvtwefvwtefvwtefvwtefveffyefyfwyefbyeftweftefeyhfehuhduwhdgwegwefgefgwfgeyhsjajjjaaaeygaygaegettdettfbaydbday'
        ],
        [
            'Authorization'=>'test'
        ])
        -> assertStatus(400)
        ->assertJson([
            'errors'=>[
                'name'=>[
                    'The name field must not be greater than 100 characters.'
                ]
            ]
        ]);
    }

    public function test_logout_success():void
    {
        $this -> seed(UserSeeder::class);
        $this -> delete(uri:'/api/users/logout',headers:[
            'Authorization'=>'test'
        ])
        ->assertStatus(200)
        ->assertJson([
            'data'=>true
        ]);
        $user = User::where('username','test')->first();
        self::assertNull($user->token);
    }

    public function test_logout_failed():void
    {
        $this -> seed(UserSeeder::class);
        $this -> delete(uri:'/api/users/logout',headers:[
            'Authorization'=>'salah'
        ])
        ->assertStatus(401)
        ->assertJson([
            'errors'=>[
                'message'=>'unauthorized'
            ]
        ]);
    }
}

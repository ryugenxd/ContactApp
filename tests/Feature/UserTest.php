<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use  Database\Seeders\UserSeeder;
use App\Models\User;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_register_success(): void
    {
       $this -> post('/api/users',[
        'username'=>'ryugenxd',
        'password'=>'12345678',
        'name'=>'ryugen'
       ])->assertStatus(201)
       ->assertJson([
        'data'=>[
            'username'=>'ryugenxd',
            'name'=>'ryugen'
        ]
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
            'data'=>[
                'username'=>'test',
                'name'=>'test'
            ]
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
}

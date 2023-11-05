<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

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
            'name'=>''
           ])->assertStatus(400)
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
}

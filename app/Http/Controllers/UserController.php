<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\{
    UserRegisterRequest,
    UserLoginRequest
};
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Http\Resources\UserResource;
use Illuminate\Support\{
    Facades\Hash,
    Str
};
use Illuminate\Http\JsonResponse;
use App\Models\User;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request):JsonResponse
    {
        $data = $request -> validated();

        if(User::where('username',$data['username'])->count() == 1){
            throw new HttpResponseException(response([
                "errors"=>[
                    "username"=>[
                        "username already to exists"
                    ]
                ]
            ],400));
        }

        $user = new User($data);
        $user -> password = Hash::make($data['password']);
        $user -> save();

        return (new UserResource($user))->response()->setStatusCode(201);
    }

    public function login(UserLoginRequest $request):UserResource
    {
        $data = $request -> validated();
        $user = User::where('username',$data['username'])->first();
        if(!$user || !Hash::check($data['password'], $user->password)){
            throw new HttpResponseException(response([
                "errors"=>[
                    "message"=>[
                        "username or password wrong"
                    ]
                ]
            ],401));
        }

        $user -> token = Str::uuid()->toString();
        $user -> save();

        return new UserResource($user);
    }
}

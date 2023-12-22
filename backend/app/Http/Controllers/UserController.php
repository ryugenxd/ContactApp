<?php

namespace App\Http\Controllers;

use App\Http\Requests\{UserRegisterRequest,UserLoginRequest,UserUpdateRequest};
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\{Facades\Hash,Str,Facades\Auth,};
use Illuminate\Http\{Request,JsonResponse};
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request):JsonResponse
    {
        $data = $request -> validated();

        if(User::where('username',$data['username'])->count() == 1) throw new HttpResponseException(response([
                "errors"=>[
                    "username"=>[
                        "username already to exists"
                    ]
                ]
        ],400));

        $user = new User($data);
        $user -> password = Hash::make($data['password']);
        $user -> token = Str::uuid()->toString();
        $user -> save();

        return (new UserResource($user))->response()->setStatusCode(201);
    }

    public function login(UserLoginRequest $request):UserResource
    {
        $data = $request -> validated();
        $user = User::where('username',$data['username'])->first();
        if(!$user || !Hash::check($data['password'], $user->password)) throw new HttpResponseException(response([
          "errors"=>[
              "message"=>[
                    "username or password wrong"
              ]
          ]
        ],401));

        $user -> token = Str::uuid()->toString();
        $user -> save();

        return new UserResource($user);
    }

    public function get(Request $request):UserResource
    {
        $user = Auth::user();
        return new UserResource($user);
    }

    public function update(UserUpdateRequest $request):UserResource
    {
        $data = $request-> validated();

        $user = Auth::user();
        if(isset($data['name'])) $user -> name = $data['name'];
        if(isset($data['password'])) $user -> password = Hash::make($data['password']);
        $user -> save();

        return new UserResource($user);
    }

    public function logout(Request $request):JsonResponse
    {
        $user = Auth::user();
        $user -> token = null;
        $user -> save();

        return response()->json([
            'data'=>true
        ])->setStatusCode(200);
    }
}

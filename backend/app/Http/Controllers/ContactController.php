<?php

namespace App\Http\Controllers;

use Illuminate\Http\{Request,JsonResponse,Exceptions\HttpResponseException};
use App\Http\Requests\{ContactCreateRequest,ContactUpdateRequest};
use App\Http\Resources\{ContactResource,ContactCollection};
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\{Facades\Auth};
use App\Models\Contact;

class ContactController extends Controller
{
    public function create( ContactCreateRequest $request):JsonResponse
    {
        $data = $request->validated();
        $user = Auth::user();

        $contact = new Contact($data);
        $contact -> user_id = $user->id;
        $contact -> save();

        return (new ContactResource($contact))->response()
        -> setStatusCode(201);
    }

    public function get(int $id):ContactResource
    {
        $user = Auth::user();
        $contact = Contact::where('id',$id)->where('user_id',$user->id)->first();
        if(!$contact) throw new HttpResponseException(response()->json([
                'errors'=>[
                    'message'=> [
                        "not found"
                    ]
                ]
            ])->setStatusCode(404));

        return new ContactResource($contact);
    }

    public function update(int $id,ContactUpdateRequest $request):ContactResource
    {
        $user = Auth::user();

        $contact = Contact::where('id',$id)->where('user_id',$user->id)->first();
        if(!$contact) throw new HttpResponseException(response()->json([
                'errors'=>[
                    'message'=> [
                        "not found"
                    ]
                ]
        ])->setStatusCode(404));

        $data = $request -> validated();
        $contact -> fill($data);
        $contact -> save();

        return new ContactResource($contact);
    }

    public function delete(int $id):JsonResponse
    {
        $user = Auth::user();

        $contact = Contact::where('id',$id)->where('user_id',$user->id)->first();
        if(!$contact) throw new HttpResponseException(response()->json([
                'errors'=>[
                    'message'=> [
                        "not found"
                    ]
                ]
        ])->setStatusCode(404));

        $contact -> delete();

        return response()->json([
            'data'=>TRUE
        ])->setStatusCode(200);

    }
    public function search(Request $request):ContactCollection
    {
        $user = Auth::user();
        $page = $request -> input('page',1);
        $size = $request -> input('size',10);

        $contacts = Contact::query()->where('user_id',$user->id);
        $contacts -> where(function(Builder $builder) use ($request) {

            //search by first name && last name
            $name = $request -> input('name');
            if($name) $builder -> where(function (Builder $builder) use ($name) {
                    $builder -> orWhere('first_name','like','%'.$name.'%');
                    $builder -> orWhere('last_name','like','%'.$name.'%');
            });

            // search by email
            $email = $request -> input('email');
            if($email) $builder -> where('email','like','%'.$email.'%');

            // search by phone
            $phone = $request -> input('phone');
            if($phone) $builder -> where('phone','like','%'.$phone.'%');
        });
        $contacts = $contacts -> latest() -> paginate(perPage:$size,page:$page);

        // return collection
        return new ContactCollection($contacts);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;
use App\Models\Profile;
class AuthController extends Controller
{
    public function login (Request $request){
        $credentials = $request->only('email', 'password');
        try{
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['status' => 401, 'error' => 'invalid_credentials'], 401);
            }
            $user = User::where('email', $request->get('email'))->first();
            return response()->json(['status'=> 200, 'data'=> $user, 'token' => $token ], 200);
        }catch(JWTException $e){
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
    public function register(Request $request){
        try{
            $user = User::create([
                'username' => $request->get('username'),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password')),
                'role' => 2,
                'type' => 2,
                'deleted' => 0,
                'verified' => 0,
            ]);
            $profile = Profile::create([
                'first_name' => $request->get('first_name'),
                'last_name' => $request->get('last_name'),
                'address' => $request->get('address'),
                'country' => json_encode($request->get('country')),
                'postal_code' => $request->get('postal_code'),
                'deleted' => 0,
                'user_id' => $user->id
            ]);
            $token = JWTAuth::fromUser($user);
            $user->password = 'SECRET';
            return response()->json([ 'data' => $user, 'status' => 201, 'token' => $token ], 201);
        }catch(Exception $e){
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
}

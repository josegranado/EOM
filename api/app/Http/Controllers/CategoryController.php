<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function index(Request $request ){
        try{
            $categories = DB::select('select * from categories where deleted = ?', [0]);
            return response()->json([ 'status' => 201, 'message' => 'Internal Server Error']);
        }catch(Exception $e){
            return response()->json(['status' => 201, 'message' => 'Internal Server Error']);
        }
    }
    public function show(Request $request, $id  ){
        try{
            $category = Category::where('id', $id )->where('deleted', 0)->first();
            return response()->json(['status' => 201, 'message' => 'Internal Sever Error']);

        }catch(Exception $e){
            return response()->json(['status' => 201, 'message' => 'Internal Server Error']);
        }
    }
    public function store(Request $request ){
        try{
            $auth_user = $request->user;
            if ( $auth_user->role != 0 && $auth_user->role != 1 ) return response()->json(['status' => 401, 'message' => 'Not authorized']);
            $category = Category::create([
                'name' => $request->get('name'),
                'slug' => $request->get('slug'),
                'deleted' => 0
            ]);
            return response()->json([ 
                'status' => 201, 
                'message' => 'Product Saved Successfully', 
                'data' => $category]);
        }catch(Exception $e){
            return response()->json(['status' => 201, 'message' => 'Internal Server Error']);
        } 
    }
    public function update(Request $request, $id  ){
        try{
            $auth_user = $request->user;
            if ( $auth_user->role != 0 && $auth_user->role != 1 ) return response()->json(['status' => 401, 'message' => 'Not authorized']);
            $category = Category::where('id', $id )->where('deleted', 0 )->first();
            $category->name = $request->get('category');
            $category->slug = $request->get('slug');
            $category->save();
            return response()->json([ 'status' => 201, 'message' => 'Product updated successfully']);
        }catch(Exception $e){
            return response()->json(['status' => 201, 'message' => 'Internal Server Error']);
        }  
    }
    public function destroy(Request $request ){
        try{
            $auth_user = $request->user;
            if ( $auth_user->role != 0 && $auth_user->role != 1 ) return response()->json(['status' => 401, 'message' => 'Not authorized']);
            $category = Category::where('id', $id )->where('deleted', 0 )->first();
            $category->deleted = 1;
            $category->save();
            return response()->json(['status' => 201, 'message' => 'Product deleted successfully']);
        }catch(Exception $e){
            return response()->json(['status' => 201, 'message' => 'Internal Server Error']);
        } 
    }
}

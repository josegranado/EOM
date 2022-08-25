<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index( Request $request){
        try{
            $products = DB::select('select * from products where deleted = ?', [0]);
            return response()->json([ 'status' => 201, 'data' => $products ]);
        }catch(Exception $e ){
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
    public function show( Request $request, $id ){
        try{
            $product = Product::where('deleted', 0 )->where('id', $id )->first();
            return response()->json([ 'status' => 201, 'data' => $product ]);
        }catch(Exception $e ){
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
    public function store( Request $request ){
        try{
            $auth_user = $request->user;
            $product = Product::create([
               'title' => $request->get('title'),
               'user_id' => $auth_user->id,
               'category_id' => $request->get('category_id'),
               'description' => $request->get('description'),
               'is_used' => $request->get('is_used'),
               'price' => $request->get('price'),
               'duration' => $request->get('duration'),
               'deleted' => 0
            ]);
            return response()->json([ 'status' => 200, 'data' => $product ]);
        }catch(Exception $e ){
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
    public function update( Request $request, $id ){
        try{
            $auth_user = $request->user;
            $product = Product::where('id', $id )->where('deleted'. 0)->first();
            if ( $auth_user->id != $product->user_id ) return response()->json(['status' => 401, 'message' => 'Not authorized']);
            $product->title = $request->get('title');
            $product->description = $request->get('description');
            $product->is_used = $request->get('is_used');
            $product->price = $request->get('price');
            $product->duration = $request->get('duration');
            $product->save();
            return response()->json([ 'status' => 201, 'message' => 'Product updated successfully']);
            
        }catch(Exception $e ){
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
    public function destroy( Request $request, $id ){
        try{
            $auth_user = $request->user;
            $product = Product::where('id', $id )->where('deleted'. 0)->first();
            if ( $auth_user->id != $product->user_id ) return response()->json(['status' => 401, 'message' => 'Not authorized']);
            $product->deleted = 1;
            $product->save();
            return response()->json(['status' => 201, 'message' => 'Product deleted successfully']);
        }catch(Exception $e ){
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }        
    }
}

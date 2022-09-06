'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('login', 'AuthController.login');
Route.post('register', 'AuthController.register');
Route.group(() => {
    Route.get('', 'ProductController.index')
    Route.post('', 'ProductController.store').middleware(['auth:jwt'])
    Route.get(':id', 'ProductController.show')
    Route.put(':id', 'ProductController.update').middleware(['auth:jwt'])
    Route.delete(':id', 'ProductController.destroy').middleware(['auth:jwt'])
}).prefix('products')
Route.group(() => {
    Route.get('', 'CategoryController.index')
    Route.post('', 'CategoryController.store').middleware(['auth:jwt'])
    Route.get(':id', 'CategoryController.show')
    Route.put(':id', 'CategoryController.update').middleware(['auth:jwt'])
    Route.delete(':id', 'CategoryController.destroy').middleware(['auth:jwt'])
}).prefix('categories')
Route.on('/').render('welcome')

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
Route.get('loginByToken', 'AuthController.loginByToken').middleware(['auth:jwt']);
Route.group(() => {
    Route.put('', 'UserController.update').middleware(['auth:jwt']);
}).prefix('users')
Route.group(() => {
    Route.get('', 'ProductController.index')
    Route.get('favorites', 'ProductController.allFavoritesByUser')
    
    Route.post('', 'ProductController.store').middleware(['auth:jwt'])
    Route.get(':id', 'ProductController.show')
    Route.put(':id', 'ProductController.update').middleware(['auth:jwt'])
    Route.delete(':id', 'ProductController.destroy').middleware(['auth:jwt'])
    Route.get(':id/favorites', 'ProductController.store_favorite').middleware(['auth:jwt'])
    Route.post(':product_id/comments', 'CommentController.store').middleware(['auth:jwt'])
    Route.put(':product_id/comments', 'CommentController.update').middleware(['auth:jwt'])
    Route.delete(':product_id/comments', 'CommentController.destroy').middleware(['auth:jwt'])
    Route.put(':product_id/califications', 'CalificationController.update').middleware(['auth:jwt'])

    Route.post(':productId/interactions', 'InteractionController.store').middleware(['auth:jwt'])
    Route.delete(':productId/interactions', 'InteractionController.destroy').middleware(['auth:jwt'])
}).prefix('products')
Route.group(() => {
    Route.get('', 'ServiceController.index')
    Route.post('', 'ServiceController.store').middleware(['auth:jwt'])
    Route.get(':id', 'ServiceController.show')
    Route.put(':id', 'ServiceController.store').middleware(['auth:jwt'])
    Route.delete(':id', 'ServiceController.destroy').middleware(['auth:jwt'])
}).prefix('services')
Route.group(() => {
    Route.get('', 'CategoryController.index')
    Route.post('', 'CategoryController.store').middleware(['auth:jwt'])
    Route.get(':id', 'CategoryController.show')
    Route.put(':id', 'CategoryController.update').middleware(['auth:jwt'])
    Route.delete(':id', 'CategoryController.destroy').middleware(['auth:jwt'])
}).prefix('categories')
Route.group(() => {
    
    Route.get('', 'UserController.index').middleware(['auth:jwt'])
    Route.post('', 'UserController.store').middleware(['auth:jwt'])
    Route.post('avatar', 'UserController.uploadAvatar').middleware(['auth:jwt'])
    Route.post('cover', 'UserController.uploadCover').middleware(['auth:jwt'])
    Route.get(':id', 'UserController.show').middleware(['auth:jwt'])
    Route.put(':id', 'UserController.update').middleware(['auth:jwt'])
    Route.delete(':id', 'UserController.destroy').middleware(['auth:jwt'])
    Route.get(':id/products', 'ProductController.allByUser').middleware(['auth:jwt'])
    Route.get(':id/approve', 'AuthController.approve')
}).prefix('users')
Route.group(() => {
    Route.get('', 'CalificationController.index')
    Route.post('', 'CalificationController.store').middleware(['auth:jwt'])
    Route.get(':id', 'CalificationController.show')
    Route.put(':id', 'CalificationController.update').middleware(['auth:jwt'])
    Route.delete(':id', 'CalificationController.destroy').middleware(['auth:jwt'])
}).prefix('califications')
Route.group(() => {
    Route.post('', 'FollowController.store').middleware(['auth:jwt'])
    Route.post('all', 'FollowController.index')
    Route.get(':id', 'FollowController.show')
    Route.delete(':id', 'FollowController.destroy').middleware(['auth:jwt'])
}).prefix('follows')
Route.group(() => {
    Route.get('', 'MessageController.index')
    Route.post('', 'MessageController.store').middleware(['auth:jwt'])
    Route.get(':id', 'MessageController.show')
    Route.delete(':id', 'MessageController.destroy').middleware(['auth:jwt'])
}).prefix('messages')
Route.group(() => {
    Route.get('', 'NotificationController.index')
    Route.post('', 'NotificationController.store').middleware(['auth:jwt'])
    Route.get(':id', 'NotificationController.show')
    Route.delete(':id', 'NotificationController.destroy').middleware(['auth:jwt'])
}).prefix('notifications')
Route.group(() => {
    Route.get('', 'TransactionController.index')
    Route.post('', 'TransactionController.store').middleware(['auth:jwt'])
    Route.get(':id', 'TransactionController.show')
    Route.delete(':id', 'TransactionController.destroy').middleware(['auth:jwt'])
}).prefix('transactions')
Route.group(() => {
    Route.get('', 'TwinController.index')
    Route.post('', 'TwinController.store').middleware(['auth:jwt'])
    Route.get(':id', 'TwinController.show')
    Route.delete(':id', 'TwinController.destroy').middleware(['auth:jwt'])
}).prefix('twins')
Route.group(() => {
    Route.get('members/:page', 'AdminUserController.index').middleware(['auth:jwt'])
    Route.get('members/:id', 'AdminUserController.show').middleware(['auth:jwt'])
    Route.post('members', 'AdminUserController.store').middleware(['auth:jwt'])
    Route.put('members/:id', 'AdminUserController.update').middleware(['auth:jwt'])
    Route.delete('members/:id', 'AdminUserController.destroy').middleware(['auth:jwt'])
    Route.post('members/:id', 'AdminUserController.undestroy').middleware(['auth:jwt'])

    Route.get('transactions/:page', 'AdminTransactionController.index').middleware(['auth:jwt'])
    Route.get('transaction/:id', 'AdminTransactionController.show').middleware(['auth:jwt'])
    Route.post('transaction', 'AdminTransactionController.store').middleware(['auth:jwt'])
    Route.put('transaction/:id', 'AdminTransactionController.update').middleware(['auth:jwt'])
    Route.delete('transaction/:id', 'AdminTransactionController.destroy').middleware(['auth:jwt'])
    Route.post('transaction/:id', 'AdminTransactionController.undestroy').middleware(['auth:jwt'])

    Route.get('products/:page', 'AdminProductController.index').middleware(['auth:jwt'])
    Route.get('products/:id', 'AdminProductController.show').middleware(['auth:jwt'])
    Route.post('products', 'AdminProductController.store').middleware(['auth:jwt'])
    Route.put('product/:id', 'AdminProductController.update').middleware(['auth:jwt'])
    Route.delete('product/:id', 'AdminProductController.destroy').middleware(['auth:jwt'])
    Route.post('product/:id', 'AdminProductController.undestroy').middleware(['auth:jwt'])
}).prefix('admin');
Route.group(() => {
    Route.post('', 'SearchController.index').middleware(['auth:jwt'])
}).prefix('search')
Route.group(() => {
    Route.get('', 'AccountController.index').middleware(['auth:jwt'])
}).prefix('accounts')
Route.on('/').render('welcome')

'use strict'
const Database = use('Database');
const Category = use('App/Models/Category');
const Product = use('App/Models/Product');
const User = use('App/Models/User');
const  {  v4 : uuidv4  }  =  require('uuid');
const Comment = use('App/Models/Comment');
const Profile = use('App/Models/Profile');
const Favorite = use('App/Models/Favorite');
class ProductController {
    async index({ request, response }){
        try{
            const products = await Database.from('products').where('deleted', 0);
            for( let i = 0; i < products.length; i++){
                products[i].category = await Category.findBy({id: products[i].category_id, deleted: 0})
                products[i].user = await User.findBy({id: products[i].user_id, deleted: 0})
            }
            return response.json({ status: 201, data: products })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async store({ request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const { title, category_id, description, is_used, price, duration, gallery } = request.all()
            const product = new Product();
            product.title = title;
            product.user_id = auth_user.id;
            product.category_id = category_id;
            product.description = description;
            product.is_used = is_used;
            product.price = price;
            product.duration = duration;
            product.deleted = 0;
            product.uuid = uuidv4();
            let files = [];
            for(let i = 0; i < 11; i++){
                let url = './public/files/products/';
                let number = i+1;
                let input = 'gallery-'+number;
                
                let file = request.file(input, {
                    types: ['image'],
                    size: '20mb',
                    extname: ['png', 'jpg', 'jpeg']
                })
                console.log(file)
                if ( file ){
                    let filename = uuidv4() + '.'+request.file(input).subtype;
                    await file.move(url, {
                        name: filename,
                        overwrite: true
                    });
                    if (!file.moved())
                    {
                            return response.status(422).send({
                                status: 422,
                                message: file.error(),
                                errors: file.error()
                            })
                    }
                    files.push(filename);
                }
            }
            product.gallery = JSON.stringify(files);
            product.thumbnail = files[0];
            if( !auth_user ) return response.json({ status: 401, message: 'Not authorized'})
            if ( auth_user && await product.save()) return response.json({ status: 201, data: product })
            return response.json({ status: 400, message: 'Bad request' })
        }catch(e){
            console.log( e.message)
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async show({ request, response, params }){
        try{
            const product = await Product.findBy({uuid: params.id, deleted: 0})
            product.category = await Category.findBy({id: product.category_id, deleted: 0})
            product.user = await User.findBy({id: product.user_id, deleted: 0})
            product.user.profile = await Profile.findBy({ user_id: product.user.id, deleted: 0})
            const comments = await Database.from('comments').where('product_id', product.id).where('deleted', 0);
            for ( let i = 0; i < comments.length ; i++){
                comments[i].user = await User.findBy({id: comments[i].user_id, deleted: 0})
                comments[i].user.profile = await Profile.findBy({user_id: comments[i].user_id, deleted: 0})
            }
            product.comments = comments;
            return response.json({ status: 201, data: product })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async allByUser({ request, response, params }){
        try{
            const products = await Database.from('products').where('user_id', params.id ).where('deleted', 0);
            for( let i = 0; i < products.length; i++){
                products[i].category = await Category.findBy({id: products[i].category_id, deleted: 0})
                products[i].user = await User.findBy({id: products[i].user_id, deleted: 0})
                products[i].user.profile = await Profile.findBy({ user_id: products[i].user_id, deleted: 0})
                let comments = await Database.from('comments').where('product_id', products[i].id).where('deleted', 0);
                for ( let y = 0; y < comments.length ; y++){
                    comments[y].user = await User.findBy({id: comments[y].user_id, deleted: 0})
                    comments[y].user.profile = await Profile.findBy({user_id: comments[y].user_id, deleted: 0})
                }
                products[i].comments = comments;
            }
            return response.json({ status: 201, data: products })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async update({ request, response }){
        try{
            const auth_user = await auth.getUser();
            const product = await Product.findBy({id: params.id, deleted: 0})
            const { title, category_id, description, is_used, price, duration } = request.all()
            product.title = title;
            product.category_id = category_id;
            product.description = description;
            product.is_used = is_used;
            product.price = price;
            product.duration = duration;
            if ( product.user_id != auth_user.id || auth_user.role > 2 ) return response.json({ status: 401, message: 'Not authorized'})
            if ( await product.save() ) return response.json({ status: 201, message:'Product updated successfully'})
            return response.json({ status: 400, message: 'Bad request' })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async destroy({ request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const product = await Product.findBy({id: params.id, deleted: 0})
            product.deleted = 1;
            if ( product.user_id != auth_user.id || auth_user.role > 2 ) return response.json({ status: 401, message: 'Not authorized'})
            if ( await product.save() ) return response.json({ status: 201, message:'Product deleted successfully'})
            return response.json({ status: 400, message: 'Bad request' })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async allFavoritesByUser({ request, auth, response }){
        try{
            const auth_user = await auth.getUser();
            const favorites = await Database.from('favorites').where('user_id', auth_user.id)
            for( let i = 0; i < favorites.length; i++ ){
                let product = await Product.findBy({
                    id: favorites[i].product_id,
                    deleted: 0 
                })
                product.category = await Category.findBy({id: product.category_id, deleted: 0})
                product.user = await User.findBy({id: product.user_id, deleted: 0})
                product.user.profile = await Profile.findBy({ user_id: product.user_id, deleted: 0})
                let comments = await Database.from('comments').where('product_id', product.id).where('deleted', 0);
                for ( let y = 0; y < comments.length ; y++){
                    comments[y].user = await User.findBy({id: comments[y].user_id, deleted: 0})
                    comments[y].user.profile = await Profile.findBy({user_id: comments[y].user_id, deleted: 0})
                }
                product.comments = comments;
            }
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = ProductController

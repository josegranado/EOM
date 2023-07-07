'use strict'
const Database = use('Database');
const Category = use('App/Models/Category');
const Product = use('App/Models/Product');
const User = use('App/Models/User');
const  {  v4 : uuidv4  }  =  require('uuid');
const Comment = use('App/Models/Comment');
const Profile = use('App/Models/Profile');
const Favorite = use('App/Models/Favorite');
const Interaction = use('App/Models/Interaction')
class ProductController {
    async index({ request, response }){
        try{
            const products = await Database.from('products').where('deleted', 0);
            for( let i = 0; i < products.length; i++){
                products[i].category = await Category.findBy({id: products[i].category_id, deleted: 0})
                products[i].interactions = await Interaction.findBy({
                    product_id: products[i].id,
                    deleted: 0
                })
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
            const { type, title, category_id, description, is_used, price, duration, gallery, ubication_id, ubication } = request.all()
            const product = new Product();
            if ( title ){
                product.title = title;
            }
            if (category_id ){
                product.category_id = category_id;
            }
            if ( description ){
                product.description = description;
            }
            if ( is_used ){
                product.is_used = is_used;
            }
            if ( duration ){
                product.duration = duration;
            }   
            if ( ubication_id ){
                product.ubication = parseInt(ubication_id);
            }
            if ( price ){
                product.price = price;
            }
            product.user_id = auth_user.id;
            product.deleted = 0;
            product.uuid = uuidv4();
            product.type = type;
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
            console.log( e)
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async show({ request, response, params }){
        try{
            const product = await Product.findBy({uuid: params.id, deleted: 0})
            product.category = await Category.findBy({id: product.category_id, deleted: 0})
            product.user = await User.findBy({id: product.user_id, deleted: 0})
            product.user.profile = await Profile.findBy({ user_id: product.user.id, deleted: 0})
            const interactions = await Database.from('interactions').where('product_id', product.id).where('deleted', 0);
            for ( let i = 0; i < interactions.length ; i++){
                interactions[i].user = await User.findBy({id: comments[i].user_id, deleted: 0})
                interactions[i].user.profile = await Profile.findBy({user_id: comments[i].user_id, deleted: 0})
            }
            product.interactions = interactions;
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
            const products = await Database.from('products').where('user_id', params.id ).where('deleted', 0).orderBy('id', 'DESC');
            let likers = [];
            for( let i = 0; i < products.length; i++){
                products[i].category = await Category.findBy({id: products[i].category_id, deleted: 0})
                products[i].user = await User.findBy({id: products[i].user_id, deleted: 0})
                products[i].user.profile = await Profile.findBy({ user_id: products[i].user_id, deleted: 0})
                let comments = await Database.from('comments').where('product_id', products[i].id).where('deleted', 0);
                
                for ( let y = 0; y < comments.length ; y++){
                    comments[y].user = await User.findBy({id: comments[y].user_id, deleted: 0})
                    comments[y].user.profile = await Profile.findBy({user_id: comments[y].user_id, deleted: 0})
                }
                let interactions = await Database.from('interactions').where('product_id', products[i].id).where('deleted', 0);
                for ( let z = 0; z < interactions.length ; z++){
                    
                    interactions[z].user = await User.findBy({id: interactions[z].user_id, deleted: 0})
                    interactions[z].user.profile = await Profile.findBy({user_id: interactions[z].user_id, deleted: 0})
                    likers.push(interactions[z].user.id)
                }
                products[i].interactions = interactions;
                products[i].comments = comments;
                products[i].likers = likers;
                likers = [];
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
    async store_favorite({ request, auth, response, params}){
        try{
            const auth_user = await auth.getUser();
            const exit_favorite = await Favorite.findBy({
                user_id: auth_user.id,
                product_id: params.id,
                deleted: 0
            })
            const favorite = new Favorite();
            favorite.user_id = auth_user.id;
            favorite.product_id = params.id;
            favorite.deleted = 0;
            favorite.save();
            return response.json({ status: 201, message: 'Favorite Saved Successfully'})
        }catch( e ){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async allFavoritesByUser({ request, auth, response }){
        try{
            const auth_user = await auth.getUser();
            const favorites = await Database.from('favorites').where('user_id', auth_user.id)
            const products = [];
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
                products.push(product);
            }
            return response.json({ status: 201, data: products })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = ProductController

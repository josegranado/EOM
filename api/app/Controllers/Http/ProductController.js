'use strict'

const auth = require("../../../config/auth");

const Database = use('Database');
const Category = use('App/Models/Category');
const Product = use('App/Models/Product');
const User = use('App/Models/User');
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
    async store({ request, response }){
        try{
            const auth_user = await auth.getUser();
            const { title, category_id, description, is_used, price, duration } = request.all()
            const product = new Product();
            product.title = title;
            product.user_id = auth_user.id;
            product.category_id = category_id;
            product.description = description;
            product.is_used = is_used;
            product.price = price;
            product.duration = duration;
            product.deleted = 0;
            if( !auth_user ) return response.json({ status: 401, message: 'Not authorized'})
            if ( auth_user && await product.save()) return response.json({ status: 201, data: product })
            return response.json({ status: 400, message: 'Bad request' })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async show({ request, response, params }){
        try{
            const product = await Product.findBy({id: params.id, deleted: 0})
            product.category = await Category.findBy({id: product.category_id, deleted: 0})
            product.user = await User.findBy({id: product.user_id, deleted: 0})
            return response.json({ status: 201, data: product })
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
    async destroy({ request, response }){
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
}

module.exports = ProductController

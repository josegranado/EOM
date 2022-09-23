'use strict'

const Database = use('Database')
const Category = use('App/Models/Category');
const Product = use('App/Models/Product');
class CategoryController {
    async index({ request, response }){
        try{
            const categories = await Database.from('categories').where('deleted', 0)
            for( let i = 0; i < categories.length; i++){
                categories[i].products = await Product({ category_id: categories[i].id, deleted: 0})
            }
            return response.json({ status: 201, data: categories })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async store({ request, response, auth }){
        try{
            const auth_user = await auth.getUser()
            const { name, slug } = request.all()
            if (auth_user.role > 2 ) return response.json({ status: 401, message: 'Not authorized'})
            const category = new Category()
            category.name = name;
            category.slug = slug;
            category.deleted = 0;
            if ( await category.save() ) return response.json({ status: 200, data: category, message: 'Category saved successfully'})
            return response.json({ status: 400, message: 'Bad request' })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async show({ request, response, params }){
        try{
            const category = await Category.findBy({ id: params.id, deleted: 0 })
            const products = await Product.findBy({ category_id: category.id, deleted: 0 })
            category.products = products
            return response({
                status: 201,
                data: category
            })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async update({ request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const category = await Category.findBy({ id: params.id, deleted: 0 })
            const { name, slug } = request.all()
            category.name = name
            category.slug = slug 
            if ( auth_user.role > 2 ) return response().json({ status: 401, message: 'Not authorized'})
            if ( await category.save() ) return response().json({ status: 201, message: 'Category updated successfully'}) 

            return response.json({ status: 400, data: 'Bad request' })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async destroy({ request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const category = await Category.findBy({ id: params.id, deleted: 0 })
            category.deleted= 1;
            if ( auth_user.role > 2 ) return response().json({ status: 401, message: 'Not authorized'})
            if ( await category.save() ) return response().json({ status: 201, message: 'Category deleted successfully'}) 

            return response.json({ status: 400, data: 'Bad request' })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = CategoryController

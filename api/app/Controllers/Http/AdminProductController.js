'use strict'
const Database = use('Database');
const Product = use('App/Models/Product');
class AdminProductController {
    async index({ request, response, auth}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const products = await Database.from('products').where('deleted', 0).paginate(params.page, 10);
            return response.json({ status: 201, data: products })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async show({ request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const product = await Product.findBy({ id: params.id, deleled: 0})
            return response.json({ status: 200, data: product })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async store({ request, response, auth, params}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
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
            return response.json({ status: 201, data: product, message: 'Product saved successfully' }) 
            
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async update({ request, response, auth}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const { title, category_id, description, is_used, price, duration, gallery } = request.all()
            const product = await Product.findBy({ id: params.id, deleted: 0})
            product.title = title;
            product.category_id = category_id;
            product.description = description;
            product.is_used = is_used;
            product.price = price;
            product.duration = duration;
            product.deleted = 0;
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
            return response.json({ status: 201, message: 'Product Updated Successfully' })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async destroy({ request, response, auth, params}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const product = await Product.findBy({ id: params.id, deleted: 0})
            product.deleted = 1;
            await product.save();
            return response.json({ status: 201, message: 'Product deleted successfully'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async undestroy({ request, response, auth, params}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const product = await Product.findBy({ id: params.id, deleted: 0})
            product.deleted = 0;
            await product.save();
            return response.json({ status: 201, message: 'Product deleted successfully'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = AdminProductController

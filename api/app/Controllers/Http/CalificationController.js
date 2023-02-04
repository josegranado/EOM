'use strict'
const Calification = use('App/Models/Calification');
const Database = use('Database');
const Product = use('App/Models/Product')
class CalificationController {
    async index({request, response, auth }){
        try{

        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async show({request, response, auth, params }){
        try{

        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async store({request, response, auth }){
        try{
            
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async update({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const id = params.id;
            const { saler_comment, buyer_comment, saler_points, buyer_points } = request.all();
            const product_id = params.product_id;
            const product = await Product.findBy({
                id: product_id
            })
            const calification = await Calification.findBy({
                id: product_id
            });
            if ( calification.saler_id == auth_user.id ){
                calification.saler_comment = saler_comment;
                calification.saler_points = saler_points;
            }
            if ( calification.buyer_id == auth_user.id ){
                calification.buyer_comment = buyer_comment;
                calification.buyer_points = buyer_points;
            }
            await calification.save();
            return response.json({ status: 201, message: 'Calification Saved Successfully'})
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async destroy({request, response, auth, params }){
        try{

        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
}

module.exports = CalificationController

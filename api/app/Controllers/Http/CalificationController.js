'use strict'
const Calification = use('App/Models/Calification');
const Database = use('Database');
const Product = use('App/Models/Product');
const Transaction = use('App/Models/Transaction');
const Account = use('App/Models/Account');
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
            const product_id = params.product_id;
            const product = await Product.findBy({
                id: product_id
            })
            const { saler_id, buyer_id, saler_comment, buyer_comment, saler_points, buyer_points } = request.all();
            const seller_account = await Account.findBy({
                user_id: saler_id,
                deleted:0
            })
           
            const calification = await Calification.findBy({
                product_id: product_id,
                saler_id: saler_id,
                buyer_id: buyer_id,
                deleted: 0
            });
            
            const transaction = await Transaction.findBy({
                product_id: product_id,
                saler_id: saler_id,
                buyer_id: buyer_id,
                deleted: 0
            })
            
            if ( calification.saler_id == auth_user.id ){
                calification.saler_comment = saler_comment;
                calification.saler_points = saler_points;
            }
            if ( calification.buyer_id == auth_user.id ){
                calification.buyer_comment = buyer_comment;
                calification.buyer_points = buyer_points;
            }
            await calification.save();
            if ( transaction.state == 1 && calification.saler_points != null && calification.buyer_points != null ){
                seller_account.balance = seller_account.balance + transaction.amount;
                await seller_account.save();
                transaction.state = 2;
                await transaction.save()
            }
            
            
                
            return response.json({ status: 201, message: 'Calification Updated Successfully'})
        }catch( e ){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error' })
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

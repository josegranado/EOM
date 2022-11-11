'use strict'

class TransactionController {
    async index({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const account = await Account.findBy({
                id: params.id,
                deleted: 0,
                user_id: auth_user.id
            })
            const sales = await Database.from('transactions').where('deleted', 0).where('saler_id', auth_user.id )
            const boughts = await Database.from('transactions').where('deleted', 0).where('buyer_id', auth_user.id )
            return response.json({
                status: 200,
                data: {
                    account: account,
                    sales: sales,
                    boughts: boughts
                }
            })
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async show({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const transaction = await Transaction.findBy({ id: params.account_id, deleted: 0})
            if ( transaction.buyer_id == auth_user.id || transaction.saler_id == auth.user.id ){
                return response.json({ status: 200, data: transaction })
            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async store({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const { saler_id, amount } = request.all();
            const transaction = new Transaction();
            transaction.buyer_id = auth_user.id;
            transaction.saler_id = saler_id;
            transaction.amount = amount;
            transaction.account_id = params.account_id;
            transaction.deleted = 0;
            await transaction.save();
            return response.json({ status: 200, message: 'Transaction Saved Successfully'})
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async update({request, response, auth, params }){
        try{
            
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async destroy({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const transaction = await Transaction.findBy({ id: params.id, deleted: 0})
            if ( auth_user.role > 2 ){
                transaction.deleted = 1;
                await transaction.save();
                return response.json({ status: 200, message: 'Transaction Deleted Successfully' })
            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
}

module.exports = TransactionController

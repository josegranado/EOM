'use strict'
 
const  {  v4 : uuidv4  }  =  require('uuid');
const Database = use('Database');
const Transaction = use('App/Models/Transaction')
const Account = use('App/Models/Account')
class AdminTransactionController {
    async index({ request, response, auth}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const transactions = await Database.from('transactions').where('deleted', 0 ).paginate(params.page, 10)
            return response.json({ status: 201, data: transactions })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async show({ request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const transaction = await Transaction.findBy({
                id: params.id,
                deleted: 0
            })
            return response.json({ status: 201, data: transaction })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async store({ request, response, auth, params}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const transaction = new Transaction();
            const { buyer_id, saler_id, amount, quanty, product_id, state } = request.all();
            const buyer_account = await Account.findBy({ user_id: buyer_id, deleted: 0 })
            const saler_account = await Account.findBy({ user_id: saler_id, deleted: 0 })
            transaction.saler_id = saler_id;
            transaction.buyer_id = buyer_id;
            transaction.amount = amount;
            transaction.quanty = quanty;
            transaction.product_id = product_id;
            transaction.uuid = uuidv4();
            transaction.state = state;
            buyer_account.balance -= amount;
            saler_account.balance += amount;
           
            await transaction.save();
            await buyer_account.save();
            await saler_account.save();
            return response.json({ status: 201, message: 'Transaction Saved Successfully'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async update({ request, response, auth}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async destroy({ request, response, auth, params}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const transaction = await Transaction.findBy({ id: params.id, deleted: 0 })
            transaction.deleted = 1;
            await transaction.save();
            return response.json({ status: 201, message: 'Transaction Deleted Successfully'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async undestroy({ request, response, auth, params}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const transaction = await Transaction.findBy({ id: params.id, deleted: 1 })
            transaction.deleted = 0;
            await transaction.save();
            return response.json({ status: 201, message: 'Transaction Deleted Successfully'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = AdminTransactionController

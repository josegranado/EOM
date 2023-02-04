'use strict'
const Database = use('Database')
const Account = use('App/Models/Account')
const Transaction = use('App/Models/Transaction');
const Product = use('App/Models/Product');
const Calification = use('App/Models/Calification');
const User = use('App/Models/User');
class TransactionController {
    async index({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const sales = await Database.from('transactions').where('deleted', 0).where('saler_id', auth_user.id )
            for ( let i = 0; i < sales.length; i++){
                const product = await Product.findBy({ id: sales[i].product_id, deleted: 0});
                const buyer = await User.findBy({
                    id: sales[i].buyer_id,
                    deleted: 0
                })
                const seller = await User.findBy({
                    id: sales[i].saler_id,
                    deleted: 0
                })
                product.buyer = buyer;
                product.seller = seller;
                sales[i].product = product;
            }
            const boughts = await Database.from('transactions').where('deleted', 0).where('buyer_id', auth_user.id )
            for ( let x = 0; x < boughts.length; x++){
                const product = await Product.findBy({ id: boughts[x].product_id, deleted: 0});
                const buyer = await User.findBy({
                    id: boughts[x].buyer_id,
                    deleted: 0
                })
                const seller = await User.findBy({
                    id: boughts[x].saler_id,
                    deleted: 0
                })
                product.buyer = buyer;
                product.seller = seller;
                boughts[x].product = product;
            }
            return response.json({
                status: 201,
                data: {
                    sales: sales,
                    boughts: boughts
                }
            })
        }catch( e ){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error' })
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
            const account = await Account.findBy({
                user_id: auth_user.id,
                deleted: 0
            })
            const { saler_id, amount, quanty, product_id } = request.all();
            const seller_account = await Account.findBy({
                user_id: saler_id,
                deleted: 0
            })
            const product = await Product.findBy({
                id: product_id,
                deleted: 0
            });
            if ( account.balance > amount ){
                const transaction = new Transaction();
                transaction.buyer_id = auth_user.id;
                transaction.saler_id = saler_id;
                transaction.amount = amount;
                transaction.quanty = quanty;
                transaction.deleted = 0;
                transaction.product_id = product_id;
                await transaction.save();
                account.balance = account.balance - transaction.amount;
                seller_account.balance = seller_account.balance + transaction.amount;
                await account.save();
                const calification = new Calification();
                calification.product_id = product_id;
                calification.buyer_id = auth_user.id;
                calification.saler_id = product.user_id;
                await calification.save();
                return response.json({ status: 201, message: 'Transaction Saved Successfully', data: account})
            }
            else{
                return response.json({ status: 201, message: 'Insufficient Funds'})
            }
        }catch( e ){
            console.log(e)
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

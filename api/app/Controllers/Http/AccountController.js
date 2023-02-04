'use strict'
const Database = use('Database');
const User = use('App/Models/User');
const Account = use('App/Models/Account')
class AccountController {
    async index({request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const account = await Account.findBy({
                user_id: auth_user.id,
                deleted: 0
            })
            return response.json({ status: 201, data: account })
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async show({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const account = await Account.findBy({id: params.id, deleted: 0, user_id: auth_user.id });
            return response.json({
                status: 200,
                data: account
            })
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
            const { amount, type } = request.all();
            const auth_user = await auth.getUser();
            const account = await Account.findBy({id: params.id, deleted: 0, user_id: auth_user.id });
            if (type == 1 && account.balance > amount ){
                //COMPRA
                account.balance = account.balance - amount;
            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
            if ( type == 2) {
                account.balance = account.balance + amount;
            }
            return response.json({
                status: 200,
                message: 'Account updated successfully'
            })
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async destroy({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const account = await Account.findBy({id: params.id, deleted: 0, user_id: auth_user.id });
            account.deleted = 1;
            await account.save();
            return response.json({
                status: 200,
                message: 'Account deleted successfully'
            })
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
}

module.exports = AccountController

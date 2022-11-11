'use strict'

class TwinController {
    async index({request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const twins = await Database.from('twins').where('deleted', 0).where('from', auth_user.id).orWhere('to', auth_user.id )
            return response.json({ status: 200, data: twins })

        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async show({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const twin = await Twin.findBy({ id: params.id, deleted: 0});
            if ( twin.from == auth_user.id || twin.to == auth_user.id ){
                return response.json({ status: 200, data: twin })
            }else{
                return response.json({status: 401, message: 'Not authorized'})
            }
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async store({request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const { to } = request.all();
            const twin = new Twin();
            twin.from = auth_user.id;
            twin.to = to;
            twin.deleted = 0;
            await twin.save();
            return response.json({ status: 200, message: 'Twin Saved Successfully', data: twin })
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

        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
}

module.exports = TwinController

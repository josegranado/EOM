'use strict'

class MessageController {
    async index({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const messages = await Database.from('messages').where('twin_id', params.id).where('deleted', 0)
            const no_views = await Database.from('messages').where('twin_id', params.id).where('to', auth_user.id).where('state', 0).where('deleted', 0);

            return response.json({ status: 200, data: messages, count: no_views.length })
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async show({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const twin = await Twin.findBy({id: params.id, deleted: 0})
            const message = await Message.findBy({ id: params.message_id, deleted: 0})
            if ( twin.to == auth_user.id || twin.from == auth_user.id ){
                return response.json({ status: 200, data: message })
            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async store({request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const { content } = request.all();
            const message = new Message();
            message.content = content;
            message.twin_id = params.id;
            message.deleted = 0;
            message.from = auth_user.id;
            await message.save();
            return response.json({ status: 200, message: 'Message saved successfully'})
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
            const twin = await Twin.findBy({id: params.id, deleted: 0})
            const message = await Message.findBy({ id: params.message_id, deleted: 0})
            if ( twin.to == auth_user.id || twin.from == auth_user.id ){
                message.deleted = 1
                await message.save();
                return response.json({ status: 200, data: message })
            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
}

module.exports = MessageController

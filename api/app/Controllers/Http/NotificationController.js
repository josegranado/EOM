'use strict'

class NotificationController {
    async index({ request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const notifications = await Database.from('notifications').where('deleted', 0).where('user_id', auth_user.id);
            return response.json({ status: 200, data: notifications });
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async store({ request, response }){
        try{

        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async show({ request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const notification = await Notification.findBy({ id: params.id, user_id: auth_user.id, deleted:0})
            return response.json({ status: 200, data: notification })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    
    async destroy({ request, response }){
        try{
            const auth_user = await auth.getUser();
            const notification = await Notification.findBy({ id: params.id, user_id: auth_user.id, deleted:0})
            notification.deleted = 1;
            await notification.save();
            return response.json({ status: 200, data: notification })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = NotificationController

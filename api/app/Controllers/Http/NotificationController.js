'use strict'
const Database = use('Database');
const Notification = use('App/Models/Notification');
const User = use('App/Models/User');
const Profile = use('App/Models/Profile')
class NotificationController {
    async index({ request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const notifications = await Database.from('notifications').where('deleted', 0).where('to', auth_user.id);
            for (let i = 0; i < notifications.length; i++){
                notifications[i].from_user = await User.findBy({ id: notifications[i].from, deleted: 0})
                notifications[i].to_user = await User.findBy({ id: notifications[i].to, deleted: 0})
                notifications[i].to_user.profile = await Profile.findBy({ user_id: notifications[i].to, deleted: 0})
                notifications[i].from_user.profile = await Profile.findBy({ user_id: notifications[i].from, deleted: 0})
            }
            const count = await Database.from('notifications').where('to', auth_user.id).where('state', 0).where('deleted', 0);
            return response.json({ status: 201, data: notifications, count: count.length  });
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async store({ request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const { to, type } = request.all();
            const notification = new notification();
            notification.type = type;
            notification.to = to;
            notification.state = state;
            notification.deleted = 0;
            notification.from = auth_user.id;
            await notification.save();
            return response.json({ status: 201, messasge: 'Notification created successfully'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async show({ request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const notification = await Notification.findBy({ id: params.id, user_id: auth_user.id, deleted:0})
            return response.json({ status: 201, data: notification })
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
            return response.json({ status: 201, data: notification })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = NotificationController

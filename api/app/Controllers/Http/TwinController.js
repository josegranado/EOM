'use strict'
const Database = use('Database')
const Twin = use('App/Models/Twin');
const User = use('App/Models/User');
const Profile = use('App/Models/Profile');
const Message = use('App/Models/Message');
class TwinController {
    async index({request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const twins = await Database.from('twins').where('deleted', 0).where('from', auth_user.id).orWhere('to', auth_user.id )
            for(let i = 0; i < twins.length; i++){
                let to = await User.findBy({
                    id: twins[i].to
                });
                to.profile = await Profile.findBy({
                    user_id: to.id
                })
                let from = await User.findBy({
                    id: twins[i].from
                })
                from.profile = await Profile.findBy({
                    user_id: from.id
                });
                twins[i].to = to;
                twins[i].from = from;
            }
            
            return response.json({ status: 201, data: twins })

        }catch( e ){
            console.log(e )
            return response.json({ status: 500, message: 'Internal Server Error' })
        }
    }
    async show({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const twin = await Twin.findBy({ id: params.id, deleted: 0});
            twin.to = await User.findBy({
                id: twin.to
            });
            twin.to.profile = await Profile.findBy({
                user_id: twin.to.id
            })
            twin.from = await User.findBy({
                id: twin.from
            })
            twin.from.profile = await Profile.findBy({
                user_id: twin.from.id
            });
            
            const messages = await Database.from('messages').where('twin_id', twin.id);
            for(let i = 0; i < messages.length; i++){
                messages[i].from = await User.findBy({
                    id: messages[i].from,
                    deleted: 0
                })
                messages[i].from.profile = await Profile.findBy({
                    user_id: messages[i].from.id,
                    deleted: 0
                })
                messages[i].to = await User.findBy({
                    id: messages[i].to,
                    deleted: 0
                })
                messages[i].to.profile = await Profile.findBy({
                    user_id: messages[i].to.id,
                    deleted: 0
                })
            }
            twin.messages = messages;
            if ( twin.from.id == auth_user.id || twin.to.id == auth_user.id ){
                
                return response.json({ status: 201, data: twin })
            }else{
                return response.json({status: 401, message: 'Not authorized'})
            }
        }catch( e ){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error' })
        }
    }
    async store({request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const { to } = request.all();
            const twin = new Twin();
            const twinx = await Database.from('twins').where('to', to).where('from', auth_user.id).orWhere('to', auth_user.id).where('from', to)
            if ( twinx[0] ){
                return response.json({ status: 201, message: 'Twin Saved Successfully', data: twinx })
            }else{
                twin.from = auth_user.id;
                twin.to = to;
                twin.deleted = 0;
                await twin.save();
                return response.json({ status: 201, message: 'Twin Saved Successfully', data: twin })
            }
            
            
        }catch( e ){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error' })
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

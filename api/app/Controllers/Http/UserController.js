'use strict'
const Database = use('Database')
const User = use('App/Models/User');
const Profile = use('App/Models/Profile');
const Enterprise = use('App/Models/Enterprise')
const Survey = use('App/Models/Survey')
class UserController {
    async index({ request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const users = await Database.from('users').where('deleted', 0);
            for( let i = 0; i < users.length; i++){
                users[i].profile = await Profile.findBy({
                    user_id: users[i].id,
                    deleted: 0
                });
                users[i].enterprise= await Enterprise.findBy({
                    user_id: users[i].id,
                    deleted: 0
                });
                users[i].survey = await Survey.findBy({
                    user_id: users[i].id,
                    deleted: 0
                });
            }
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Not authorized'})
            return response.json({ status: 201, data: users })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async store({ request, response, auth, params  }){
        try{
             
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async show({ request, response }){
        try{
            const auth_user = await auth.getUser();
            const user = await User.findBy({ id: params.id, deleted: 0});
            user.profile = await Profile.findBy({user_id: params.id, deleted: 0})
            user.enterprise = await Enterprise.findBy({user_id: params.id, deleted: 0})
            user.survey = await Survey.findBy({user_id: params.id, deleted: 0})
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Not authorized'})
            return response.json({ status: 201, data: user })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async update({ request, response }){
        try{

        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async destroy({ request, response }){
        try{

        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = UserController

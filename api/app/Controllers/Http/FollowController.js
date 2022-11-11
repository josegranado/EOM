'use strict'
const Database = use('Database');
const User = use('App/Models/User');
const Follow = use('App/Models/Follow');
class FollowController {
    async index({request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const followers = await Database.from('follows').where('deleted', 0).where('followed_id', auth_user.id);
            const followeds = await Database.from('follows').where('deleted', 0).where('follower_id', auth_user.id);
            for ( let i = 0; i < followers.length; i++ ){
                followers[i].follower = await User.findBy({ id: followers[i].follower_id, deleted: 0 });
                followers[i].followed = await User.findBy({ id: followers[i].followed_id, deleted: 0 });
            }
            for ( let i = 0; i < followeds.length; i++ ){
                followeds[i].follower = await User.findBy({ id: followeds[i].follower_id, deleted: 0 });
                followeds[i].followed = await User.findBy({ id: followeds[i].followed_id, deleted: 0 });
            }
            return response.json({ status: 200, data: {
                auth_user,
                followers: followers.length,
                followed: followeds.length,
                followers: followers,
                followeds: followeds
            }});
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async show({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const follow = await Follow.findBy({id: params.id, deleted: 0});
            follow.follower = await User.findBy({id: follow.follower_id, deleted: 0})
            follow.followed = await User.findBy({id: follow.followed_id, deleted: 0})

            return response.json({ status: 200, data: follow })
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async store({request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const { follower_id } = request.all();
            const follow = new Follow();
            follow.followed_id = auth_user.id;
            follow.follower_id = follower_id;
            follow.deleted = 0;
            await follow.save();
            return response.jso({ status: 200, dta: follow, message: 'You follow created successfully'})
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
            const follow = await Follow.findBy({id: params.id, deleted: 0});
            follow.deleted = 1;
            if ( auth_user.id == follow.follower_id && follow){
                await follow.save();
                return response.json({ status: 200, message: 'Followed Deleted Successfully'})
            }
            return response.json({ status: 401, message: 'Not authorized'})
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
}

module.exports = FollowController

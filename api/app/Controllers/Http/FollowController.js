'use strict'
const Database = use('Database');
const User = use('App/Models/User');
const Follow = use('App/Models/Follow');
class FollowController {
    async index({request, response }){
        try{
            const { user_id } = request.all();
            const followers = await Database.from('follows').where('deleted', 0).where('followed_id', user_id);
            const followeds = await Database.from('follows').where('deleted', 0).where('follower_id', user_id);
            const _followers = [];
            const _followeds = [];
            for ( let i = 0; i < followers.length; i++ ){
                followers[i].follower = await User.findBy({ id: followers[i].follower_id, deleted: 0 });
                followers[i].followed = await User.findBy({ id: followers[i].followed_id, deleted: 0 });
                _followers.push(followers[i].follower.id )
            }
            for ( let i = 0; i < followeds.length; i++ ){
                followeds[i].follower = await User.findBy({ id: followeds[i].follower_id, deleted: 0 });
                followeds[i].followed = await User.findBy({ id: followeds[i].followed_id, deleted: 0 });
                _followeds.push(followeds[i].followed.id )
            }
            return response.json({ status: 201, data: {
                followers: {
                    count: followers.length,
                    data: followers,
                    _followers: _followers 
                },
                followeds: {
                    count: followeds.length,
                    data: followeds,
                    _followeds: _followeds
                }
            }});
        }catch( e ){
            console.log(e )
            return response.json({ status: 500, message: 'Internal Server Error' })
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
            console.log(e )
            return response.json({ status: 500, message: 'Internal Server Error' })
        }
    }
    async store({request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const { followed_id } = request.all();
            const follow = new Follow();
            follow.followed_id = followed_id;
            follow.follower_id = auth_user.id;
            follow.deleted = 0;
            await follow.save();
            return response.json({ status: 201, data: follow, message: 'You follow created successfully'})
        }catch( e ){
            console.log(e )
            return response.json({ status: 500, message: 'Internal Server Error' })
        }
    }
    async update({request, response, auth, params }){
        try{
           
        }catch( e ){
            console.log(e )
            return response.json({ status: 500, message: 'Internal Server Error' })
        }
    }
    async destroy({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const follow = await Follow.findBy({followed_id: params.id, follower_id: auth_user.id, deleted: 0});
            
            if ( follow){
                follow.deleted = 1;
                await follow.save();
                return response.json({ status: 201, message: 'Followed Deleted Successfully'})
            }
            return response.json({ status: 401, message: 'Not authorized'})
        }catch( e ){
            console.log(e )
            return response.json({ status: 500, message: 'Internal Server Error' })
        }
    }
}

module.exports = FollowController

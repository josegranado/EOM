'use strict'
const Database = use('Database');
const User = use('App/Models/User');
const Profile = use('App/Models/Profile');
const Product = use('App/Models/Product');
const Service = use('App/Models/Service');
class SearchController {
    async index({ request, response, auth }){
        try{
            const { search } = request.all();
            console.log(search)
            let users = [];
            const profiles = await Database.from('profiles')
            .whereRaw('first_name @@ :term OR last_name @@ :term', {term: '%'+search+'%'})
            .where('deleted', 0)
            
            console.log(profiles)
            for( let i = 0; i < profiles.length; i++){
                let user = await User.findBy({
                    id: profiles[i].user_id,
                    deleted: 0
                })
                user.profile = profiles[i];
                users.push(user)
            }
            let services = [];
            let products = [];
            const ctx = await Database.from('products')
                .whereRaw('title @@ :term OR description @@ :term', { term: '%'+search+'%'})
                
            for ( let i = 0; i < ctx.length; i++){
                ctx[i].user = await User.findBy({
                    id: ctx[i].user_id,
                    deleted: 0
                })
                ctx[i].user.profile = await Profile.findBy({
                    user_id: ctx[i].user_id,
                    deleted: 0
                })
                if ( ctx[i].type === 1){
                    products.push(ctx[i])
                }
                if ( ctx[i].type === 2){
                    services.push(ctx[i])
                }
            }
            
            return response.json({ status: 201, data:{
                products: products,
                services: services,
                users: users
            }})
        }catch( e ){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'});
        }
    }
}

module.exports = SearchController

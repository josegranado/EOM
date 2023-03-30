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
            .where('deleted', 0)
            .where(
                'first_name',
                'LIKE',
                '%'+search+'%'
            ).orWhere(
                'last_name',
                'LIKE',
                '%'+search+'%'
            )
            
            console.log(profiles)
            for( let i = 0; i < profiles.length; i++){
                let user = await User.findBy({
                    id: profiles[i].user_id,
                    deleted: 0
                })
                user.profile = profiles[i];
                users.push(user)
            }
            const services = await Database.from('services')
                .where(
                    'title',
                    'LIKE',
                    '%'+search+'%'
                ).where('deleted', 0)
            for ( let i = 0; i < services.length; i++){
                services[i].user = await User.findBy({
                    id: services[i].user_id,
                    deleted: 0
                })
                services[i].user.profile = await Profile.findBy({
                    user_id: services[i].user_id,
                    deleted: 0
                })
            }
            const products = await Database.from('products')
                .where(
                    'title',
                    'LIKE',
                    '%'+search+'%'
                ).where(
                    'description',
                    'LIKE',
                    '%'+search+'%'
                ).where('deleted', 0)
            for ( let i = 0; i < products.length; i++){
                products[i].user = await User.findBy({
                    id: products[i].user_id,
                    deleted: 0
                })
                products[i].user.profile = await Profile.findBy({
                    user_id: products[i].user_id,
                    deleted: 0
                })
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

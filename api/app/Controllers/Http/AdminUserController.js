'use strict'
const User = use('App/Models/User');
const Profile = use('App/Models/Profile')
const Account = use('App/Models/Account')
const Survey =  use('App/Models/Survey');
const Enterprise = use('App/Models/Enterprise')
const Database = use('Database');
class AdminUserController {
    async index({ request, response, auth, params}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            let users = await Database.from('users').where('deleted', 0).paginate(params.page, 10);
            for ( let i = 0; i < users.length; i++ ){
                users[i].profile = await Profile.findBy({ user_id: users[i].id, deleted: 0}) 
                users[i].survey = await survey.findBy({ user_id: users[i].id, deleted: 0})
                users[i].enterprise = await Enterprise.findBy({ user_id: users[i].id, deleted: 0})
            }
            return response.json({ status: 201, data: users });
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async show({ request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const user = await User.findBy({ id: params.id, deleted: 0 })
            user.profile = await Profile.findBy({ user_id: user.id, deleted: 0})
            user.account = await Account.findBy({ user_id: user.id, deleted: 0})
            user.enterprise = await Enterprise.findBy({ user_id: user.id, deleted: 0})
            user.survey = await Survey.findBy({ user_id: user.id, deleted: 0})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async store({ request, response, auth, params}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const { username, email, password, terms, notifications, terms_and_privacity, offers } = request.all();
            const user = new User();
            user.username = username;
            user.email = email
            user.role = 3
            user.is_approved = 0;
            user.type = 2;
            user.deleted = 0;
            user.password = password;
            user.terms = terms;
            user.notifications = notifications;
            user.terms_and_privacity = terms_and_privacity;
            user.offers = offers;
            await user.save();
            
            const { first_name, last_name, ocupation, phone_number, phone_local_number, birthday, gender } = request.all();
            const profile = new Profile();
            profile.first_name = first_name;
            profile.last_name = last_name;
            profile.ocupation = ocupation;
            profile.phone_number = phone_number;
            profile.phone_local_number = phone_local_number;
            profile.deleted = 0;
            profile.user_id = user.id;
            profile.state = state;
            profile.birthday = birthday;
            profile.gender = gender;
            await profile.save();
            const { balance } = request.all();
            const account = new Account();
            account.user_id = user.id;
            account.deleted = 0;
            account.balance = balance;
            await account.save();
            return response.json({ status: 201, message: 'User saved successfully'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async update({ request, response, auth}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const user = await User.findBy({ id: params.id, deleted: 0 })
            user.profile = await Profile.findBy({ user_id: user.id, deleted: 0})
            user.account = await Account.findBy({ user_id: user.id, deleted: 0})
            user.enterprise = await Enterprise.findBy({ user_id: user.id, deleted: 0})
            user.survey = await Survey.findBy({ user_id: user.id, deleted: 0})
            const { username, email, password, terms, notifications, terms_and_privacity, offers, role, is_approved } = request.all();
            const { first_name, last_name, ocupation, phone_number, phone_local_number, birthday, gender } = request.all();
            const { balance } = request.all();
            user.username = email.split('@')[0];
            user.email = email
            user.role = role
            user.is_approved = is_approved;
            user.type = 2;
            user.password = password;
            user.terms = terms;
            user.notifications = notifications;
            user.terms_and_privacity = terms_and_privacity;
            user.offers = offers;
            await user.save();
            profile.first_name = first_name;
            profile.last_name = last_name;
            profile.ocupation = ocupation;
            profile.phone_number = phone_number;
            profile.phone_local_number = phone_local_number;
            profile.state = state;
            profile.birthday = birthday;
            profile.gender = gender;
            await profile.save();
            account.user_id = user.id;
            account.balance = balance;
            await account.save();
            return response.json({ status: 201, message: 'User updated successfully.'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async destroy({ request, response, auth, params}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const user = await User.findBy({ id: params.id, deleted: 0})
            const profile = await Profile.findBy({ user_id: user.id, deleted: 0})
            const account = await Account.findBy({ user_id: user.id, deleted: 0})
            const enterprise = await Enterprise.findBy({ user_id: user.id, deleted: 0})
            const survey = await Survey.findBy({ user_id: user.id, deleted: 0})
            profile.deleted = 1;
            account.deleted = 1,
            enterprise.deleted = 1;
            survey.deleted = 1;
            return response.json({ status: 201, message: 'User deleted Successfully'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async undestroy({ request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const user = await User.findBy({ id: params.id, deleted: 1})
            const profile = await Profile.findBy({ user_id: user.id, deleted: 1})
            const account = await Account.findBy({ user_id: user.id, deleted: 1})
            const enterprise = await Enterprise.findBy({ user_id: user.id, deleted: 1})
            const survey = await Survey.findBy({ user_id: user.id, deleted: 1})
            profile.deleted = 0;
            account.deleted = 0,
            enterprise.deleted = 0;
            survey.deleted = 0;
            return response.json({ status: 201, message: 'User restored Successfully'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = AdminUserController

'use strict'
const Database = use('Database')
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const Enterprise = use('App/Models/Enterprise')
const Survey = use('App/Models/Survey')
const nodemailer = require('nodemailer');

class AuthController {
    async login({ request, response, auth  }){
        try{
            const { email, password } = request.all()
            const user = await User.findBy({
                email: email
            })
            const logged = await auth.attempt(email, password, true )
            if ( logged && user ) return response.json({ status: 201, message: 'Logged Successfully', token: logged, data: user })
            if ( !logged ) return response.json({ status: 401, message: 'Not authorized'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async register({ request, response }){
        try{
            let transporter = nodemailer.createTransport({
                host: 'smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: 'efd3ca9a4295fa',
                    pass: '55f437ee136d46'
                }
            })
            const { username, email, password, terms, notifications, terms_and_privacity, offers } = request.all();
            const user = new User();
            user.username = email.split('@')[0];
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

            const { name, rfc, state, n_employees, sector } = request.all();
            const enterprise = new Enterprise();
            enterprise.name = name;
            enterprise.rfc = rfc;
            enterprise.state = state.value;
            enterprise.n_employees = n_employees;
            enterprise.sector = sector.value;
            enterprise.deleted = 0;
            enterprise.user_id = user.id;
            await enterprise.save();
            const { broker_name, question_2, question_1 } = request.all();
            const survey = new Survey();
            survey.broker_name = broker_name;
            survey.question_1 = question_1;
            survey.question_2 = question_2;
            survey.user_id = user.id;
            survey.deleted = 0;
            await survey.save();
            return response.json({ status: 201, message: 'Pre-register saved successfully'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async approve({ request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1) return response.json({ status: 401, message: 'Not authorized'})
            const user = await User.findBy({ id: params.id, deleted: 0});
            user.is_approved = 1;
            
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = AuthController

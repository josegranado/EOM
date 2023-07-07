'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const Account = use('App/Models/Account')
class UserSeeder {
  async run () {
    let user = new User()
    user.username = 'josegranado';
    user.email = 'aboutkanes@gmail.com'
    user.role = 0
    user.is_approved = 1
    user.type = 0
    user.deleted = 0;
    user.password = 'alfonzo97';
    
    await user.save()
    let profile = new Profile()
    profile.first_name = 'Jose'
    profile.last_name = 'Granado'
    profile.ocupation = 'Developer'
    profile.departament = 0
    profile.phone_number = '584242032761'
    profile.phone_local_number = '582124511691'
    profile.user_id = user.id
    profile.deleted = 0
    await profile.save()
    let account = new Account()
    account.balance = 50000;
    account.user_id = user.id;
    account.deleted = 0;
    await account.save();
    user = new User()
    user.username = 'robertocardiel';
    user.email = 'vicvalsoftware@gmail.com'
    user.role = 0
    user.is_approved = 1
    user.type = 0
    user.deleted = 0;
    user.password = 'alfonzo97'
    await user.save()
    profile = new Profile()
    profile.first_name = 'Roberto '
    profile.last_name = 'Cardiel'
    profile.ocupation = 'Project Manager'
    profile.departament = 0
    profile.phone_number = '584242032761'
    profile.phone_local_number = '582124511691'
    profile.user_id = user.id
    profile.deleted = 0
    await profile.save()
    account = new Account()
    account.balance = 50000;
    account.user_id = user.id;
    account.deleted = 0;
    await account.save();
    user = new User()
    user.username = 'elotromercado';
    user.email = 'somoselotromercado@gmail.com'
    user.role = 0
    user.is_approved = 1
    user.type = 0
    user.deleted = 0;
    user.password = 'alfonzo97'
    await user.save()
    profile = new Profile()
    profile.first_name = 'El OTRO MERCADO'
    profile.last_name = 'LLC'
    profile.ocupation = 'Administrator'
    profile.departament = 0
    profile.phone_number = '584242032761'
    profile.phone_local_number = '582124511691'
    profile.user_id = user.id
    profile.deleted = 0
    await profile.save()
    account = new Account()
    account.balance = 50000;
    account.user_id = user.id;
    account.deleted = 0;
    await account.save();
    user = new User()
    user.username = 'jose.granado2014';
    user.email = 'jose.granado2014@gmail.com'
    user.role = 2;
    user.is_approved = 1
    user.type = 0
    user.deleted = 0;
    user.password = 'alfonzo97'
    await user.save()
    profile = new Profile()
    profile.first_name = 'Jose Alfonso';
    profile.last_name = 'Granado Luis'
    profile.ocupation = 'Broker';
    profile.departament = 0;
    profile.phone_number = '584242032761'
    profile.phone_local_number = '582124511691'
    profile.user_id = user.id
    profile.deleted = 0
    await profile.save()
    account = new Account()
    account.balance = 50000;
    account.user_id = user.id;
    account.deleted = 0;
    await account.save();
  }
}

module.exports = UserSeeder

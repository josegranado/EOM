'use strict'
const Database = use('Database')
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const Enterprise = use('App/Models/Enterprise')
const Survey = use('App/Models/Survey');
const Account = use('App/Models/Account');
const nodemailer = require('nodemailer');

class AuthController {
    async login({ request, response, auth  }){
        try{
            const { email, password } = request.all()
            const user = await User.findBy({
                email: email
            })
            const profile = await Profile.findBy({
                user_id: user.id
            })
            const account = await Account.findBy({
                user_id: user.id
            })
            console.log( account )
            user.account = account;
            user.profile = profile;
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
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "151cca1bc7da63",
                  pass: "920de5c7c733dc"
                }
              });
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
            profile.birthday = birthday;
            profile.gender = gender;
            await profile.save();

            const { name, rfc, state, n_employees, sector } = request.all();
            const enterprise = new Enterprise();
            enterprise.name = name;
            enterprise.rfc = rfc;
            enterprise.state = state?.value;
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
            const account = new Account();
            account.user_id = user.id;
            account.deleted = 0;
            account.balance = 0;
            account.save();
            let html = `\${<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <table style="font-family:sans-serif">
                        <tr>
                            <td bgcolor="00a8ec" align="center" colspan="2">
                                <img src="https://i.postimg.cc/6p15mmZ0/logo-blancoo-EOM-1.png" alt="" style="width:40%">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" align="center">
                                <h1>Comienza tu proceso de alta confirmando tu cuenta:</h1>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <hr style="border-color:#c3c3c3">
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">
                                <p>Tu número de contrato es: <b>M132</b></p>
                                <P>Tu Bróker asignado es: <b>Juan de las piyatas</b></P>
                                <table>
                                    <tr>
                                        <td><img src="https://i.postimg.cc/ZKDDCGyp/step-1.png" alt="" style="width:100%"></td>
                                        <td><h2>Pre-registro</h1>
                                            <h6>Exítoso</h6>
                                            <h2>Procesando tu contrato</h1>
                                            <h6>En proceso</h6>
                                            <h2>Alta confirmada</h1>
                                            <h6>Pendiente</h6></td>
                                    </tr>
                                </table>
                            </td>
                            <td width="50%">
                                <p>
                                Da clic para confirmar tu cuenta y comenzar a hacer uso de ella.
                                </p>
                                <p>Recuerda que por seguridad este botón estará activo únicamente por 24 horas. Si no abre ningún link, copia y pega esta dirección en tu navegador:</p>
                                <a href="#" style="padding:10px; width:100%; background-color:#00a8ec; color:#FFF">CONFIRMAR CUENTA</a>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>}`
            var mailOptions = {
                from: '"APPGPM TEAM" <no-reply@appgpm.com>',
                to: email,
                subject: 'You password has been changed',
                html: html
            }
            await transport.sendMail(mailOptions, (err, info) =>{
                if (err){
                    return console.log(error);
                }
                
            })
            return response.json({ status: 201, message: 'Pre-register saved successfully'})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error', e: e})
        }
    }
    async approve({ request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1) return response.json({ status: 401, message: 'Not authorized'})
            const user = await User.findBy({ id: params.id, deleted: 0});
            user.is_approved = 1;
            await user.save();
            const account = await Account.findBy({
                user_id: user.id,
                deleted: 0
            })
            if ( account ){
                account.balance = account.balance - parseFloat(100);
                await account.save();
            }
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "151cca1bc7da63",
                  pass: "920de5c7c733dc"
                }
              });
            let html = `\${<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <table style="font-family:sans-serif">
                        <tr>
                            <td bgcolor="00a8ec" align="center" colspan="2">
                                <img src="https://i.postimg.cc/6p15mmZ0/logo-blancoo-EOM-1.png" alt="" style="width:40%">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" align="center">
                                <h1>REGISTRO APROBADO</h1>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <hr style="border-color:#c3c3c3">
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">
                                 <p>Tu registro ha sido completado, te obsequiamos 100 ACTIVOS en tu cuenta.</p>
                                </table>
                            </td>
                            <td width="50%">
                                <p>
                                Da clic para confirmar tu cuenta y comenzar a hacer uso de ella.
                                </p>
                                <p>Recuerda que por seguridad este botón estará activo únicamente por 24 horas. Si no abre ningún link, copia y pega esta dirección en tu navegador:</p>
                                <a href="#" style="padding:10px; width:100%; background-color:#00a8ec; color:#FFF">CONFIRMAR CUENTA</a>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>}`
            var mailOptions = {
                from: '"EL OTRO MERCADO" <no-reply@elotromercado.com>',
                to: user.email,
                subject: 'Usted ha sido aprobado en EOM',
                html: html
            }
            await transport.sendMail(mailOptions, (err, info) =>{
                if (err){
                    return console.log(error);
                }
                
            })
            return response.json({ status: 201, message: 'The user was approved'});

        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = AuthController

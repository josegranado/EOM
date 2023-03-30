'use strict'
const Database = use('Database')
const Account = use('App/Models/Account')
const Transaction = use('App/Models/Transaction');
const Product = use('App/Models/Product');
const Calification = use('App/Models/Calification');
const  {  v4 : uuidv4  }  =  require('uuid');
const User = use('App/Models/User');
const nodemailer = require('nodemailer');
const Profile = use('App/Models/Profile');
class TransactionController {
    async index({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const sales = await Database.from('transactions').where('deleted', 0).where('saler_id', auth_user.id )
            let sales_balance = 0;
            const account = await Account.findBy({
                user_id: auth_user.id,
                deleted: 0
            })
            for ( let i = 0; i < sales.length; i++){
                const product = await Product.findBy({ id: sales[i].product_id, deleted: 0});
                const buyer = await User.findBy({
                    id: sales[i].buyer_id,
                    deleted: 0
                })
                const seller = await User.findBy({
                    id: sales[i].saler_id,
                    deleted: 0
                })
                product.buyer = buyer;
                product.seller = seller;
                product.calification = await Calification.findBy({product_id: product.id, saler_id: seller.id, buyer_id: buyer.id, deleted: 0})
                product.display = false;
                product.seller.profile = await Profile.findBy({ user_id: product.seller.id, deleted: 0})
                product.buyer.profile = await Profile.findBy({ user_id: product.buyer.id, deleted: 0})
                sales[i].product = product;
                sales_balance += sales[i].amount;
            }

            let boughts_balance = 0;
            const boughts = await Database.from('transactions').where('deleted', 0).where('buyer_id', auth_user.id )
            for ( let x = 0; x < boughts.length; x++){
                const product = await Product.findBy({ id: boughts[x].product_id, deleted: 0});
                const buyer = await User.findBy({
                    id: boughts[x].buyer_id,
                    deleted: 0
                })
                const seller = await User.findBy({
                    id: boughts[x].saler_id,
                    deleted: 0
                })
                product.buyer = buyer;
                product.seller = seller;
                product.calification = await Calification.findBy({product_id: product.id, saler_id: seller.id, buyer_id: buyer.id, deleted: 0})
                product.display = false;
                product.seller.profile = await Profile.findBy({ user_id: product.seller.id, deleted: 0})
                product.buyer.profile = await Profile.findBy({ user_id: product.buyer.id, deleted: 0})
                boughts[x].product = product;
                boughts_balance += boughts[x].amount;
            }
            return response.json({
                status: 201,
                data: {
                    account: account,
                    sales: {
                        data: sales,
                        balance: sales_balance
                    },
                    boughts: {
                        data: boughts,
                        balance: boughts_balance
                    }
                }
            })
        }catch( e ){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error' })
        }
    }
    async show({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const transaction = await Transaction.findBy({ id: params.account_id, deleted: 0})
            if ( transaction.buyer_id == auth_user.id || transaction.saler_id == auth.user.id ){
                return response.json({ status: 200, data: transaction })
            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async store({request, response, auth, params }){
        try{
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "151cca1bc7da63",
                  pass: "920de5c7c733dc"
                }
              });
            const auth_user = await auth.getUser();
            const buyer_account = await Account.findBy({
                user_id: auth_user.id,
                deleted: 0
            })
            const { saler_id, amount, quanty, product_id } = request.all();
            const seller = await User.findBy({
                id: saler_id,
                deleted: 0
            })
            const product = await Product.findBy({
                id: product_id,
                deleted: 0
            });
            if ( buyer_account.balance > amount ){
                const transaction = new Transaction();
                transaction.buyer_id = auth_user.id;
                transaction.saler_id = saler_id;
                transaction.amount = amount;
                transaction.quanty = quanty;
                transaction.deleted = 0;
                transaction.product_id = product_id;
                transaction.state = 1;
                transaction.uuid = uuidv4();
                await transaction.save();
                const calification = new Calification();
                calification.product_id = product_id;
                calification.buyer_id = auth_user.id;
                calification.saler_id = product.user_id;
                calification.deleted = 0;
                await calification.save();
                buyer_account.balance = buyer_account.balance - transaction.amount;
                await buyer_account.save();
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
                                    <h1>Te han comprado un producto...</h1>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <hr style="border-color:#c3c3c3">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <p>Ingresa cuánto ántes a nuestra plataforma te han comprobado el siguiente producto: 
                                    <b>
                                        ${ product.title } <br>
                                        ${ product.price } ACTIVOS
                                    </b>
                                    </p>                                  
                                </td>
                                
                            </tr>
                        </table>
                    </body>
                    </html>}`
                var mailOptions = {
                    from: '"EL OTRO MERCADO" <no-reply@elotromercado.com>',
                    to: seller.email,
                    subject: '¡Te hicieron una compra en nuestra plataforma!',
                    html: html
                }
                await transport.sendMail(mailOptions, (err, info) =>{
                    if (err){
                        return console.log(error);
                    }
                    
                })
                return response.json({ status: 201, message: 'Transaction Saved Successfully', data: buyer_account})
            }
            else{
                return response.json({ status: 201, message: 'Insufficient Funds'})
            }
        }catch( e ){
            console.log(e)
            return response.json({ status: 500, message: 'Internal Server Error' })
        }
    }
    async update({request, response, auth, params }){
        try{
            
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error' })
        }
    }
    async destroy({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const transaction = await Transaction.findBy({ id: params.id, deleted: 0})
            if ( auth_user.role > 2 ){
                transaction.deleted = 1;
                await transaction.save();
                return response.json({ status: 200, message: 'Transaction Deleted Successfully' })
            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error' })
        }
    }
}

module.exports = TransactionController

'use strict'
const Database = use('Database');
const pdf = require('html-pdf');
const Profile = use('App/Models/Profile')
class DashboardController {
    async index({ request, response, auth }){
        try{
            const users = await Database.from('users');
            const products = await Database.from('products').where('deleted', 0);
            const transactions = await Database.from('transactions').where('deleted', 0);
            const accounts = await Database.from('accounts').where('deleted', 0);
            let total = 0;
            for ( let i = 0; i < accounts.length; i++){
                total += accounts[i].balance
            }
            let rHtml = '';
            let dHtml = '';
            let aHtml= '';
            for( let i=0; i < users.length; i++){
                users[i].profile = await Profile.findBy({
                    user_id: users[i].id
                })
                users[i].html = '';
                users[i].html = `<tr>
                <td>${ users[i].id } </td>
                <td> ${ users[i].profile.first_name } </td>
                <td>${ users[i].profile.last_name}</td>
                <td>${ users[i].username }</td>
                <td> ${ users[i].email }</td>
                </tr>`;
                if ( users[i].deleted == 0 && users[i] != undefined ){
                    rHtml += users[i].html;
                }
                if ( users[i].deleted  == 1){
                    dHtml += users[i].html;
                }
                if ( users[i].is_approved == 1){
                    aHtml += users[i].html;
                }
            } 
            console.log(rHtml);
            let rPdf = `
                <html>
                    <head>
                    <meta charset="utf-8">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                    </head>
                    <style>
                    body{
                        padding:10px !important;
                        font-family: arial, sans-serif !important;
                    }
                    </style>
                    <body>
                    <div class="w-100 p-5 text-center mt-3 mb-3" style="background:#2f8dbc !important;">
                        <img class="w-50" src="https://app.elotromercado.com/assets/images/logo-black.png">
                    </div>

                    <h2 class="text-center mt-3 mb-5"><strong>Reporte de usuarios registrados</strong></div>
                    <br>
                    <table class="table table-stripped mt-3">
                        <thead>
                            <th scope="col">ID</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                        </thead>
                        <tbody>
                        ${ rHtml }
                        </tbody>
                    </table>
                    </body>
                </html>
            `;
            let dPdf = `
                <html>
                    <head>
                    <meta charset="utf-8">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                    </head>
                    <style>
                    body{
                        padding:10px !important;
                        font-family: arial, sans-serif !important;
                    }
                    </style>
                    <body>
                    <div class="w-100 p-5 text-center mt-3 mb-3" style="background:#2f8dbc !important;">
                        <img class="w-50" src="https://app.elotromercado.com/assets/images/logo-black.png">
                    </div>

                    <h2 class="text-center mt-3 mb-5"><strong>Reporte de usuarios aprobados</strong></div>
                    <br>
                    <table class="table table-stripped mt-3">
                        <thead>
                            <th scope="col">ID</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                        </thead>
                        <tbody>
                        ${ dHtml }
                        </tbody>
                    </table>
                    </body>
                </html>
            `;
            let aPdf = `
                <html>
                    <head>
                    <meta charset="utf-8">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                    </head>
                    <style>
                    body{
                        padding:10px !important;
                        font-family: arial, sans-serif !important;
                    }
                    </style>
                    <body>
                    <div class="w-100 p-5 text-center mt-3 mb-3" style="background:#2f8dbc !important;">
                        <img class="w-50" src="https://app.elotromercado.com/assets/images/logo-black.png">
                    </div>

                    <h2 class="text-center mt-3 mb-5"><strong>Reporte de usuarios eliminados</strong></div>
                    <br>
                    <table class="table table-stripped mt-3">
                        <thead>
                            <th scope="col">ID</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                        </thead>
                        <tbody>
                        ${ aHtml }
                        </tbody>
                    </table>
                    </body>
                </html>
            `;
            pdf.create(rPdf).toFile('../../../github/eom/api/public/files/pdfs/registrados.pdf', function (err, res){
                if ( err ){
                    console.log( err )
                }else{
                    console.log(res)
                }
            })
            pdf.create(dPdf).toFile('../../../github/eom/api/public/files/pdfs/eliminados.pdf', function (err, res){
                if ( err ){
                    console.log( err )
                }else{
                    console.log(res)
                }
            })
            pdf.create(aPdf).toFile('../../../github/eom/api/public/files/pdfs/aprobados.pdf', function (err, res){
                if ( err ){
                    console.log( err )
                }else{
                    console.log(res)
                }
            })
            return response.json({ status: 201, data: {
                products: products,
                users: users,
                transactions: transactions,
                total_credits: total
            }});
        }catch( e ){
            console.log(e)
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = DashboardController

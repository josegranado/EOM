'use strict'
const Database = use('Database');
const Report = use('App/Models/Report');
const Product = use('App/Models/Product');
class AdminReportController {
    async index({ request, response, auth}){
        try{
            const auth_user = await auth.getUser();
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Unathourize Access'})
            const reports = await Database.from('reports')
            for (let i = 0; i < reports.length; i++){
                reports[i].product = await Product.findBy({id: reports[i].id, deleted: 0})
            }
            return response.json({ status: 201, data: reports})
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = AdminReportController

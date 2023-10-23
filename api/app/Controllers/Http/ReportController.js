'use strict'
const Database = use('Database');
const Report = use('App/Models/Report');

class ReportController {

    async store({ request, response, params }){
        try{
            const product_id = params.id;
            const { type, message } = request.all();
            const report = new Report();
            report.type = type;
            report.message = message;
            report.product_id = product_id;
            await report.save();
            return response.json({ status: 201, data: report})
        }catch(e){
            console.log(e)
            return response.json({ status: 500, message: 'Internal Server ERror'})
        }
    }
}

module.exports = ReportController

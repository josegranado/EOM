'use strict'
const Database = use('Database');
const Service = use('App/Models/Service')
const  {  v4 : uuidv4  }  =  require('uuid');
class ServiceController {
    async index({request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const services = await Database.from('services').where('deleted', 0).where('user_id', auth_user.id)
            for ( let i = 0; i < services.length; i++){
                services[i].user = await User.findBy({
                    id: services[i].user_id,
                    deleted: 0
                })
                services[i].user.profile = await Profile.findBy({
                    user_id: services[i].user_id,
                    deleted: 0
                });
            }
            return response.json({ status: 201, data: services })
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async show({request, response, auth, params }){
        try{
            const service = await Service.findBy({
                id: params.id,
                deleted: 0
            });
            service.user = await User.findBy({
                id: service.user_id,
                deleted: 0
            });
            service.user.profile = await Profile.findBy({
                id: user.id,
                deleted: 0
            });
            return response.json({ status: 201, data: service })
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async store({request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const { title, duration, ubication } = request.all();
            const service = new Service();
            service.title = title;
            service.duration = duration;
            service.ubication = ubication;
            service.uuid = uuidv4();
            let files = [];
            for(let i = 0; i < 11; i++){
                let url = './public/files/services/';
                let number = i+1;
                let input = 'gallery-'+number;
                
                let file = request.file(input, {
                    types: ['image'],
                    size: '20mb',
                    extname: ['png', 'jpg', 'jpeg']
                })
                console.log(file)
                if ( file ){
                    let filename = uuidv4() + '.'+request.file(input).subtype;
                    await file.move(url, {
                        name: filename,
                        overwrite: true
                    });
                    if (!file.moved())
                    {
                            return response.status(422).send({
                                status: 422,
                                message: file.error(),
                                errors: file.error()
                            })
                    }
                    files.push(filename);
                }
            }
            service.gallery = JSON.stringify(files);
            service.thumbnail = files[0];
            service.deleted = 0;
            if( !auth_user ) return response.json({ status: 401, message: 'Not authorized'})
            if ( auth_user && await product.save()) return response.json({ status: 201, data: service })
            return response.json({ status: 400, message: 'Bad request' })
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async update({request, response, auth, params }){
        try{

        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async destroy({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const service = await Service.findBy({
                id: params.id,
                deleted: 0,
                user_id: auth_user.id
            });
            if ( service ){
                service.deleted = 1;
                await service.save();
                return response.json({ status: 201, message: 'Service deleted sucessfully'})
            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
}

module.exports = ServiceController

'use strict'
const Database = use('Database')
const User = use('App/Models/User');
const Profile = use('App/Models/Profile');
const Enterprise = use('App/Models/Enterprise')
const Survey = use('App/Models/Survey')
const  {  v4 : uuidv4  }  =  require('uuid');
class UserController {
    async index({ request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const users = await Database.from('users').where('deleted', 0);
            for( let i = 0; i < users.length; i++){
                users[i].profile = await Profile.findBy({
                    user_id: users[i].id,
                    deleted: 0
                });
                users[i].enterprise= await Enterprise.findBy({
                    user_id: users[i].id,
                    deleted: 0
                });
                users[i].survey = await Survey.findBy({
                    user_id: users[i].id,
                    deleted: 0
                });
            }
            if ( auth_user.role > 1 ) return response.json({ status: 401, message: 'Not authorized'})
            return response.json({ status: 201, data: users })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    
    async show({ request, response, params, auth }){
        try{
            const auth_user = await auth.getUser();
            const user = await User.findBy({ id: params.id, deleted: 0});
            user.profile = await Profile.findBy({user_id: params.id, deleted: 0})
            user.enterprise = await Enterprise.findBy({user_id: params.id, deleted: 0})
            user.survey = await Survey.findBy({user_id: params.id, deleted: 0})
            return response.json({ status: 201, data: user })
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async uploadCover({ request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            const user = await User.findBy({ id: auth_user.id , deleted: 0});
            const profile  = await Profile.findBy({user_id: auth_user.id, deleted: 0})
            let url_cover =  './public/files/covers/';            
            let cover = request.file('cover', {
                types: ['image'],
                size: '20mb',
                extname: ['png', 'jpg', 'jpeg']
            })
            let filename = uuidv4() + '.'+request.file('cover').subtype;
            if ( cover ){
                
                await cover.move(url_cover, {
                    name: filename,
                    overwrite: true
                });
                if (!cover.moved())
                {
                        return response.status(422).send({
                            status: 422,
                            message: cover.error(),
                            errors: cover.error()
                        })
                }
            }
            if ( auth_user.id == user.id || auth_user.role < 2 ){
                profile.cover = filename;
                await profile.save();
                user.profile = profile;
                const logged = await auth.generate(user);
                return response.json({
                    status: 201,
                    message: 'User updated successfully',
                    data: user,
                    token: logged
                })
            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
            
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async uploadAvatar({ request, response, auth }){
        try{
            const auth_user = await auth.getUser();
            console.log(auth_user);
            const user = await User.findBy({ id: auth_user.id , deleted: 0});
            const profile  = await Profile.findBy({user_id: auth_user.id, deleted: 0})
            console.log(profile);
            let url = './public/files/avatars/'; 
            
            let file = request.file('avatar', {
                types: ['image'],
                size: '20mb',
                extname: ['png', 'jpg', 'jpeg']
            })
            let filename = uuidv4() + '.'+request.file('avatar').subtype;
            if ( file ){
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
            }
            profile.avatar = filename;
            await profile.save();
            user.profile = profile;
            const logged = await auth.generate(user);
            return response.json({
                    status: 201,
                    message: 'User updated successfully',
                    data: user, 
                    token: logged
                })
            
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async update({ request, response, auth, params  }){
        try{
            const auth_user = await auth.getUser();
            const user = await User.findBy({ id: auth_user.id , deleted: 0});
            const profile  = await Profile.findBy({user_id: auth_user.id, deleted: 0})
            let {  gallery, city, state, first_name, last_name, ocupation, phone_number, phone_local_number, birthday, gender, description } = request.all();
            let url = './public/files/avatars/'; 
            let url_cover =  './public/files/covers/';          
            if ( first_name ){
                profile.first_name = first_name;
            }
            if ( last_name ){
                profile.last_name = last_name;
            }
            if ( ocupation ){
                profile.ocupation = ocupation;
            }
            if ( phone_number ){
                profile.phone_number = phone_number;
            }
            if ( phone_local_number ){
                profile.phone_local_number = phone_local_number;
            }
            if ( birthday ){
                profile.birthday = birthday;
            }
            if ( gender ){
                profile.gender = gender;
            }
            if ( description ){
                profile.description = description;
            }
            if ( state ){
                profile.state = state;
            }
            if ( city ){
                profile.city = city;
            }
            let file = request.file('avatar', {
                types: ['image'],
                size: '20mb',
                extname: ['png', 'jpg', 'jpeg']
            })
            let cover = request.file('cover', {
                types: ['image'],
                size: '20mb',
                extname: ['png', 'jpg', 'jpeg']
            })
            if ( cover ){
                let filename_cover = uuidv4() + '.'+request.file('cover')?.subtype;
                await cover.move(url_cover, {
                    name: filename_cover,
                    overwrite: true
                });
                profile.cover = filename_cover;
                if (!file.moved())
                {
                        return response.status(422).send({
                            status: 422,
                            message: file.error(),
                            errors: file.error()
                        })
                }
            }
            if ( file ){
        
                let filename = uuidv4() + '.'+request.file('avatar')?.subtype;
                
                await file.move(url, {
                    name: filename,
                    overwrite: true
                });
                
                profile.avatar = filename;
                if (!file.moved())
                {
                        return response.status(422).send({
                            status: 422,
                            message: file.error(),
                            errors: file.error()
                        })
                }
            }
            let files = [];
            if ( profile?.gallery ){
                files = JSON.parse(profile.gallery)
            }else{
                files = [];
            }
            if ( gallery ){
                if ( files.length > 0 ){
                    
                    for(let i = 0; i < 10; i++){
                        let url = './public/files/papers/';
                        let number = i+1;
                        let input = 'gallery-'+number;
                        
                        let file = request.file(input, {
                            types: ['image'],
                            size: '20mb',
                            extname: ['png', 'jpg', 'jpeg']
                        })
        
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
                            files[i] = filename;
                        }
                    }
                }else{
                    for(let i = 0; i < 11; i++){
                        let url = './public/files/papers/';
                        let number = i+1;
                        let input = 'gallery-'+number;
                        
                        let file = request.file(input, {
                            types: ['image'],
                            size: '20mb',
                            extname: ['png', 'jpg', 'jpeg']
                        })
        
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
                }
                profile.gallery = JSON.stringify(files);
            }
            
            if ( auth_user.id == user.id || auth_user.role < 2 ){
                await profile.save();
                user.profile = profile;
                const logged = await auth.generate(user);
                return response.json({
                    status: 201,
                    message: 'User updated successfully',
                    data: user,
                    token: logged
                })
            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
            
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async destroy({ request, response, params, auth  }){
        try{
            const auth_user = await auth.getUser();
            const user = await User.findBy({ id: params.id, deleted: 0});
            const profile  = await Profile.findBy({user_id: params.id, deleted: 0})
            user.deleted = 1;
            profile.deleted = 1;
            if ( auth_user.id == user.id || auth_user.role < 2 ){
                await user.save();
                await profile.save();
                return response.json({
                    status: 200,
                    message: 'User and profile deleted successfully'
                });

            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
        }catch(e){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
}

module.exports = UserController

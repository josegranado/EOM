'use strict'
const Database = use('Database')
const Comment = use('App/Models/Comment')
class CommentController {
    async store({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser()
            const { content } = request.all();
            const comment = new Comment()
            comment.content = content;
            comment.product_id = params.product_id;
            comment.user_id = auth_user.id;
            comment.deleted = 0;
            if ( await comment.save()){
                return response.json( {status: 201, message: 'Comment Saved Successfully'})
            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
        }catch( e ){
            console.log( e )
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async update({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const comment = await Comment.findBy({
                id: params.id,
                deleted: 0
            })
            const { content } = request.all()
            comment.content = content;
            if ( auth_user.id  === comment.user_id){
                await comment.save()
                return response.json( {status: 201, message: 'Comment Updated Successfully'})
            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error' })
        }
    }
    async destroy({request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const comment = await Comment.findBy({
                id: params.id,
                deleted: 0
            })
            comment.deleted = 1;
            if ( auth_user.id  === comment.user_id){
                await comment.save()
                return response.json( {status: 201, message: 'Comment Updated Successfully'})
            }else{
                return response.json({ status: 401, message: 'Not authorized'})
            }
        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error' })
        }
    }
}

module.exports = CommentController

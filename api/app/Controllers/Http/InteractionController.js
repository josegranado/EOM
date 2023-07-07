'use strict'
const Database = use('Database');
const Product = use('App/Models/Product')
const Interaction = use('App/Models/Interaction')
class InteractionController {
    async store({ request, response, auth, params }){
        try{
            const auth_user = await auth.getUser();
            const product_id = params.productId;
            const interaction = new Interaction();
            interaction.type = 1;
            interaction.product_id = product_id;
            interaction.user_id = auth_user.id;
            interaction.deleted = 0;
            await interaction.save();
            return response.json({ status: 201, data: interaction })
        }catch(e){
            console.log(e)
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async destroy({ request, response, auth, params }){
         try{   
            const auth_user = await auth.getUser()
            const interaction = await Interaction.findBy({
                user_id: auth_user.id,
                product_id: params.productId,
                deleted: 0,
            })
            interaction.deleted = 1;
            if ( interaction.user_id  == auth_user.id ){
                await interaction.save();
                return response.json({ status: 201, message: 'Interaction deleted successfully'})
            }else{
                return response.json({ status: 401, message: 'Not found'})
            }
            
        }catch(e){
            console.log(e)
            return response.json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async undestroy({ request, response, auth, params  }){
        try{
            const auth_user = await auth.getUser();
            const id = params.id;
            const interaction = await Interaction.findBy({
                id: id,
                deleted: 0,
                
            })
            interaction.deleted = 0;
            if ( interaction.user_id  == auth_user.id ){
                await interaction.save();
                return response.json({ status: 201, message: 'Interaction undeleted successfully'})
            }else{
                return response.json({ status: 401, message: 'Not found'})
            }
            
        }catch(e){
            console.log(e)
            return response.json({ status: 500, message: 'Internal Server Error'})
        }    
    }
}

module.exports = InteractionController

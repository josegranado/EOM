'use strict'

class ServiceController {
    async index({request, response, auth }){
        try{

        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async show({request, response, auth, params }){
        try{

        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
    async store({request, response, auth }){
        try{

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

        }catch( e ){
            return response.json({ status: 500, message: 'Internal Server Error', error: e.message() })
        }
    }
}

module.exports = ServiceController

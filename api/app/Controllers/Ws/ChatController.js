'use strict'
/*
socket.on('view-notification', async (data) => {
        try{
            const id = data.id;
            await Notification.update({ state: 1 }, {
                where: {
                  to: id,
                  deleted: 0
                }
              });
            socket.emit('notification-event', [] );
            socket.broadcast.emit('notification-event', []);
        }catch(e){
            console.log(e)
        }
    });
    socket.on('view-message', async (data) => {
        try{
            const id = data.twin_id;
            const user_id = data.identity.id;
            await Message.update({ state: 1 }, {
                where: {
                  to: user_id,
                  deleted: 0
                }
              });
            socket.emit('message-event', [] );
            socket.broadcast.emit('message-event', []);
        }catch(e ){
            console.log( e )
        }

    });
    socket.on('send-notification', async (data) => {
        try{
           const notification = await Notification.create({
                from: data.from,
                to: data.to,
                state: 0,
                deleted: 0,
                type: data.type 
           })
            socket.emit('notification-event', []);
            socket.broadcast.emit('notification-event', []);
        }catch( e ){
            console.log( e )
        }
    });
    socket.on('send-message', async (data) => {
        try{
            
                const message = new Message();
            message.from = data.from;
            message.twin_id = data.twin_id
            message.content = data.content;
            message.deleted = 0;
            message.to = data.to;
            message.state = 0;
            
            const message = await Message.create({
              from: data.from,
              twin_id: data.twin_id,
              content: data.content,
              deleted: 0,
              to: data.to,
              state: 0
          })
          socket.emit('message-event', []);
          socket.broadcast.emit('message-event', [] );
      }catch(e){
          console.log( e )
      }
  });
  */
const Message = use('App/Models/Message');
const Notification = use('App/Models/Notification');
const Database = use('Database');
class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  async onMessage(data){
    try{
      const message = new Message();
      message.from = data.from;
      message.twin_id = data.twin_id
      message.content = data.content;
      message.deleted = 0;
      message.to = data.to;
      message.state = 0;
      await message.save()
      this.socket.emit('message', []);
      this.socket.broadcast('message', [] );
    }catch(e){
      console.log(e)
    } 
  }
  async onView(data){
    try{
      const id = data.twin_id;
      const user_id = data.identity.id;
      const messages = await Database.from('messages').where('twin_id', id);
      for ( let i = 0; i < messages.length; i++){
        let message = await Message.findBy({id: messages[i].id, deleted: 0})
        message.state = 1;
        await message.save();
      }
      this.socket.emit('message', []);
      this.socket.broadcast('message', [] );
    }catch(e){
      console.log(e)
    } 
  }
}

module.exports = ChatController

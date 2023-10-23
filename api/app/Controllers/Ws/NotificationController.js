'use strict'
const Database = use('Database')
const Notification = use('App/Models/Notification')
class NotificationController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  async onNotification(data){
    try{
      const notification = new Notification();
      notification.from = data.from;
      notification.to = data.to;
      notification.state = 0;
      notification.deleted = 0;
      notification.type = data.type;
      await notification.save();
      this.socket.emit('notification', []);
      this.socket.broadcast('notification', [] );
    }catch(e){
      console.log(e)
    } 
  }
  async onView(data){
    try{
      const id = data.id;
      const notifications = await Database.from('notifications').where('to', id).where('deleted', 0)
      for ( let i = 0; i < notifications.length; i++){
        let notification = await Notification.findBy({
          id: notifications[i].id,
          deleted: 0
        });
        notification.state = 1;
        await notification.save();
      }
      this.socket.emit('notification', []);
      this.socket.broadcast('notification', [] );
    }catch(e){
      console.log(e)
    } 
  }
}

module.exports = NotificationController

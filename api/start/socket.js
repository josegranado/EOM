const Server = use('Server');
const io = require('socket.io')(Server.getInstance(), {
    cors: {
        origin: '*'
    }
});
const Notification = use('App/Models/Notification');
const Message = use('App/Models/Message');
const Database = use('Database');
io.listen('3000');

io.on('connection', async (socket) => {
    socket.on('view-notification', async (data) => {
        try{
            const id = data.user_id;
            const notifications = await Database.from('notifications').where('to', id).where('deleted', 0);
            for (let i = 0; i < notifications.length; i++){
                let notification = await Notification.findBy({
                    id: notifications[i].id
                })
                notification.state = 1
                await notification.save();

            }
            socket.emit('notification-event', notifications );
            socket.broadcast.emit('notification-event', notifications);
        }catch(e){
            console.log(e)
        }
    });
    socket.on('view-message', async (data) => {
        try{
            const id = data.twin_id;
            const user_id = data.identity.id;
            const messages = await Database.from('messages').where('to', user_id).where('deleted', 0);
            for (let i = 0; i < messages.length; i++){
                let message = await Message.findBy({
                    id: messages[i].id
                })
                message.state = 1
                await message.save();

            }
            socket.emit('notification-event', notifications );
            socket.broadcast.emit('notification-event', notifications);
        }catch(e ){
            console.log( e )
        }

    });
    socket.on('send-notification', async (data) => {
        try{
            const notification = new Notification();
            notification.from = data.identity.id;
            notification.to = data.user.id;
            notification.state = 0;
            notification.deleted = 1;
            notification.type = data.type;
            await notification.save();
            const notifications = await Database.from('notifications').where('to', data.user.id).where('from', data.identity.id).where('deleted', 0);
            socket.emit('notification-event', notifications);
            socket.broadcast.emit('notification-event', notifications);
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
            message.state = 0;
            await message.save();
            const messages = await Database.from('messages').where('to', data.user.id).where('from', data.identity.id).where('deleted', 0);
            socket.emit('message-event', messages);
            socket.broadcast.emit('message-event', messages );
        }catch(e){
            console.log( e )
        }
    });
})
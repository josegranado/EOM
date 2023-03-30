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
            const id = data.id;
            const notifications = await Database.from('notifications').where('to', id).where('deleted', 0);
            for (let i = 0; i < notifications.length; i++){
                let notification = await Notification.findBy({
                    id: notifications[i].id
                })
                notification.state = 1
                await notification.save();

            }
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
            const messages = await Database.from('messages').where('to', user_id).where('deleted', 0);
            for (let i = 0; i < messages.length; i++){
                let message = await Message.findBy({
                    id: messages[i].id
                })
                message.state = 1
                await message.save();

            }
            socket.emit('message-event', [] );
            socket.broadcast.emit('message-event', []);
        }catch(e ){
            console.log( e )
        }

    });
    socket.on('send-notification', async (data) => {
        try{
            const notification = new Notification();
            notification.from = data.from;
            notification.to = data.to;
            notification.state = 0;
            notification.deleted = 0;
            notification.type = data.type;
            await notification.save();
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
            await message.save();
            socket.emit('message-event', []);
            socket.broadcast.emit('message-event', [] );
        }catch(e){
            console.log( e )
        }
    });
    socket.on('end', function (){
        socket.disconnect(0);
    })
})
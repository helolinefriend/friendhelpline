// pages/api/livechat.js
// import { Server } from 'socket.io';
// import connectToDatabase from '../../../../lib/mongodb';
// import Message from '../../../../models/Message';


// const ioHandler = (req, res) => {
//   if (!res.socket.server.io) {
//     console.log('Starting Socket.io server...');
//     const io = new Server(res.socket.server);
//     res.socket.server.io = io;

//     io.on('connection', (socket) => {
//       console.log('New client connected');

//       socket.on('message', async (msg) => {
//         const newMessage = new Message({ sender: 'user', text: msg });
//         await connectToDatabase();
//         await newMessage.save();
//         io.emit('message', newMessage);
//       });

//       socket.on('disconnect', () => {
//         console.log('Client disconnected');
//       });
//     });
//   }
//   res.end();
// };

// export default ioHandler;



import { Server } from 'socket.io';
import connectToDatabase from '../../../../lib/mongodb';
import Message from '../../../../models/Message';

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('Starting Socket.io server...');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('message', async (msg) => {
        await connectToDatabase();
        const newMessage = new Message({ sender: 'user', text: msg });
        await newMessage.save();
        io.emit('message', newMessage);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
  res.end();
}

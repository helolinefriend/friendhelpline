
"use client"

import { useState } from 'react';
import styles from '../../../styles/pages/Support.module.css';
 
export default function Support() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setChatLog([...chatLog, { sender: 'user', text: message }]);
      setMessage('');
      // Here you would send the message to the server/admin
    }
  };

  const handleChatStart = () => {
    setIsChatActive(true);
  };

  return (
    <div className={styles.supportContainer}>
      <h1>Support</h1>
      <div className={styles.contactOptions}>
        <div className={styles.option}>
          <h2>Email</h2>
          <p>support@yourwebsite.com</p>
        </div>
        <div className={styles.option}>
          <h2>Address</h2>
          <p>123 Support St, Help City, HC 12345</p>
        </div>
      </div>
      <div className={styles.chatSection}>
        {!isChatActive ? (
          <button onClick={handleChatStart} className={styles.button}>Start Live Chat</button>
        ) : (
          <div className={styles.chatBox}>
            <div className={styles.chatLog}>
              {chatLog.map((log, index) => (
                <div key={index} className={log.sender === 'user' ? styles.userMessage : styles.adminMessage}>
                  {log.text}
                </div>
              ))}
            </div>
            <div className={styles.inputSection}>
              <input
                type="text"
                value={message}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className={styles.chatInput}
              />
              <button onClick={handleSendMessage} className={styles.button}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




// live chat test 


// pages/support.js
// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import styles from '../../../styles/pages/Support.module.css';


// let socket;

// export default function Support() {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket = io();

//     socket.on('connect', () => {
//       console.log('Connected to server');
//     });

//     socket.on('message', (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     socket.on('disconnect', () => {
//       console.log('Disconnected from server');
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       socket.emit('message', message);
//       setMessage('');
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Support</h1>
//       <div className={styles.chatBox}>
//         {messages.map((msg, index) => (
//           <div key={index} className={styles.message}>
//             <strong>{msg.sender}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={sendMessage} className={styles.form}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className={styles.input}
//           placeholder="Type your message here..."
//         />
//         <button type="submit" className={styles.button}>Send</button>
//       </form>
//       <div className={styles.contactInfo}>
//         <p>Email: support@example.com</p>
//         <p>Address: 123 Support St, Help City, CA</p>
//       </div>
//     </div>
//   );
// }


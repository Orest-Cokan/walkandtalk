import SocketIOClient from 'socket.io-client';
import getIP from './Ip';

const ip = getIP();
const Socket = SocketIOClient.connect(ip, {
  transport: ['polling']
  }
);

export default Socket;
   
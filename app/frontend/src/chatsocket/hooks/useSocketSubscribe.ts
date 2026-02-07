import { useEffect } from 'react';
import { socket } from '../socket/SocketClient';
import { useAppSelector } from '../../store/hooks';
import { GetChatListParams } from '../../types/interfaces';
import API from '../../api/API';

export const useSocketSubscribe = () => {
  const isConnected = useAppSelector(state => state.socketIO.isConnected);
  const isAuth = useAppSelector(state => state.user.isAuth);
  const user = useAppSelector(state => state.user);
  const { supportchatAPI } = API();

  useEffect(() => {
    if (isConnected && isAuth) {
    const query: GetChatListParams = {
      userId: user.id,
      isActive: true,
    }
    if (user.role === 'manager' || user.role === 'admin') {
      query.userId = null;
    }
    supportchatAPI.findRequests(query)
      .then(result => {  
        const { data } = result;
        data && data.forEach((el: any) => { socket.emit('subscribeToChat', { chatId: el._id }) });
      })
      .catch(err => {
        console.error(err);
      });

  }}, [ isConnected, isAuth]);
};
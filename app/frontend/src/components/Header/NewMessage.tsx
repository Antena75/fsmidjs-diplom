// Сокет, подписки, слушатель + новое сообщение в чате
import iziToast from "izitoast";
import { useSocket } from "../../chatsocket/hooks/useSocket";
import { useSocketEvent } from "../../chatsocket/hooks/useSocketEvent";
import { useSocketSubscribe } from "../../chatsocket/hooks/useSocketSubscribe";
import { SocketDto } from "../../types/interfaces";
import { useAppSelector } from "../../store/hooks";

function NewMessage() {
  const user = useAppSelector(state => state.user);
  const listener = (socketDto: SocketDto) => {
    if (user.id !== socketDto.author.id) {
      iziToast.info({ message: `Новое сообщение от ${socketDto.author.name}`, position: 'bottomCenter' });
    }
  };
  useSocket();
  useSocketSubscribe();
  useSocketEvent('subscribeToChat', listener);

  return (<></>)
}

export default NewMessage;

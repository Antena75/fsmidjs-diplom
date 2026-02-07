import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";
import { useSocketEvent } from "../../chatsocket/hooks/useSocketEvent";
import { useAppSelector } from "../../store/hooks";
import { SocketDto } from "../../types/interfaces";
import Spin from "../Spinner/Spinner";
import ChatForm from "./ChatForm";
import Messages from "./Messages";

function ChatMain() {
  const [error, setError] = useState<boolean>(false);
  const [spin, setSpin] = useState<boolean>(true);
  const [messages, setMessages] = useState<any>([]);
  const user = useAppSelector(state => state.user);
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const { supportchatAPI } = API();

  const listener = (socketDto: SocketDto) => {
    if (user.id !== socketDto.author.id) {
      setMessages([...messages, {
        _id: socketDto._id,
        authorId: socketDto.author.id,
        text: socketDto.text,
        sentAt: socketDto.sentAt,
      }])
    }
  };
  useSocketEvent('subscribeToChat', listener);

  const handleSendMessage = (text: string) => {
    try {
      if (text.length === 0) {
        iziToast.warning({ message: 'Вы должны текст сообщения для отправки!', position: 'bottomCenter' });
      }

      const chatId: any = queryParams.get('id');
      const sendMessageDto: any = { authorId: user.id, chatId, text }

      supportchatAPI.sendMessage(sendMessageDto)
        .then(result => {
          setMessages([...messages, result.data]);
        })
        .catch(err => {
          iziToast.error({ message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0], position: 'bottomCenter', });
        });
    } catch (error) {
      console.error(error);
    }
  }

  const handleCloseRequest = () => {
    try {
      const chatId: any = queryParams.get('id');

      supportchatAPI.closeRequest(chatId)
        .then(() => {          
          iziToast.success({ message: 'Вы успешно закрыли обращение', position: 'bottomCenter' });
          navigate(-1);
        })
        .catch(err => {
          iziToast.error({ message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0], position: 'bottomCenter' });
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!queryParams.get('id') || !queryParams.get('email')) {
      navigate('/error');
      return;
    }

    const chatId: any = queryParams.get('id');
    const requestUserId: any = user.id;

    supportchatAPI.getMessages(chatId, requestUserId)
      .then(result => {
        setMessages(result.data);
        setSpin(false);
        supportchatAPI.readMessages({ userId: requestUserId, chatId, createdBefore: new Date() });
      })
      .catch(err => {
        setError(true);
        iziToast.error({ message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0], position: 'bottomCenter' });
      });
  }, []);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-2 mb-3">
        <Container>
          <p className="fs-2 fw-semibold">Чат с пользователем</p>
          <p className="text-muted">Пользователь: {queryParams.get('email')}</p>
          {user.role === 'manager' &&
            <Button variant="danger" onClick={handleCloseRequest}>Закрыть</Button>
          }
        </Container>
      </Container>
      {spin ? (
        <Spin />
      ) : (
        error ? (
          <p className="text-center">Произошла ошибка при загрузке сообщений!</p>
        ) : (
          <>
            <Messages messages={messages} />
            <ChatForm handleSendMessage={handleSendMessage}/>
          </>
        )
      )}
    </>
  )
}

export default ChatMain;

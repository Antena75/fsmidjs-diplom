import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import API from "../../api/API";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

function SupportForm() {
  const [text, setText] = useState<string>('');
  const userId = useAppSelector(state => state.user.id);
  const email = useAppSelector(state => state.user.email);
  const { supportchatAPI } = API();
  const navigate = useNavigate();

  const formHandler = async (e: any) => {
    try {
      e.preventDefault();

      if (text.length > 200) {
        iziToast.warning({ message: 'Обращение должно вмещать до 200 символов!', position: 'bottomCenter' });
        return;
      }

      supportchatAPI.createRequest({ userId, text })
        .then((result) => {        
          iziToast.success({ message: 'Вы успешно создали обращение', position: 'bottomCenter' });
          navigate(`/chat?id=${result.data.id}&email=${email}`);
        })
        .catch(err => {
          iziToast.error({ message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0], position: 'bottomCenter' });
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form className="mb-3" onSubmit={formHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Введите текст обращения</Form.Label>
        <Form.Control as="textarea" rows={3} className="mb-3" maxLength={200} placeholder="Введите текст обращения" onChange={(e) => setText(e.target.value)} required />
      </Form.Group>
      
      <Button variant="success" type="submit">
        Создать обращение
      </Button>
      <Button variant="secondary" type="reset">
        Очистить
      </Button>
    </Form>
  )
}

export default SupportForm;

import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import API from "../../api/API";
import { RegData } from "../../types/interfaces";

function FormRegister() {
  const [regData, setRegData] = useState<RegData>({   // с использованием ОБЪЕКТА
    email: '',
    name: '',
    contactPhone: '',
    password: '',
  });
  const { usersAPI } = API();

  const regHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (regData.password.length < 6) {
        iziToast.warning({
          message: 'Пароль - не менее 6 символов!',
          position: 'bottomCenter',
        });
        return;
      }

      usersAPI.register(regData)
        .then(() => {
          iziToast.success({ message: 'Вы успешно зарегистрировались', position: 'bottomCenter' });
        })
        .catch(err => {    
          iziToast.error({ message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0], position: 'bottomCenter' });
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form className="mb-3" onSubmit={regHandler}>
      <Form.Group className="mb-3" >
        <Form.Label>Почта</Form.Label>
        <Form.Control type="email" placeholder="Введите почту" onChange={(e) => setRegData({ ...regData, email: e.target.value })} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Имя</Form.Label>
        <Form.Control type="text" placeholder="Введите имя" onChange={(e) => setRegData({ ...regData, name: e.target.value })} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Телефон</Form.Label>
        <Form.Control type="tel" placeholder="Введите телефон" onChange={(e) => setRegData({ ...regData, contactPhone: e.target.value })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль" onChange={(e) => setRegData({ ...regData, password: e.target.value })} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Зарегистрироваться
      </Button>
    </Form>
  )
}

export default FormRegister
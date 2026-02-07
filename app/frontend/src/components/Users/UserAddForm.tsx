import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";
import { RegData } from "../../types/interfaces";


function UserAddForm() {
  const [regData, setRegData] = useState<RegData>({
    email: '',
    name: '',
    contactPhone: '',
    password: '',
    role:''
  });
  const { usersAPI } = API();
  const navigate = useNavigate();

  const regHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (regData.password.length < 6) {
        iziToast.warning({ message: 'Пароль должен содержать 6 и более символов!', position: 'bottomCenter' });
        return;
      }
      if (regData.role !== 'admin' && regData.role !== 'client' && regData.role !== 'manager' && regData.role !== '') {
        iziToast.warning({ message: 'Роль одна из: admin manager client', position: 'bottomCenter' });
        return;
      }

      usersAPI.register(regData)
        .then(() => {
          iziToast.success({ message: 'Вы успешно зарегистрировали пользователя', position: 'bottomCenter' });     
          navigate('/users');

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
        <Form.Control type="email" className="mb-3" placeholder="Введите почту пользователя" onChange={(e) => setRegData(reg => ({ ...reg, email: e.target.value }))} required />
        <Form.Control type="text" className="mb-3" placeholder="Введите имя пользователя" onChange={(e) => setRegData({ ...regData, name: e.target.value })} required />
        <Form.Control type="tel" className="mb-3" placeholder="Введите телефон пользователя (необязательно)" onChange={(e) => setRegData({ ...regData, contactPhone: e.target.value })} />
        <Form.Control type="password" className="mb-3" placeholder="Введите пароль пользователя (не менне 6 символов)" onChange={(e) => setRegData({ ...regData, password: e.target.value })} required />
        <Form.Control type="text" className="mb-3" placeholder="Введите роль пользователя (admin, manager, client)" onChange={(e) => setRegData({ ...regData, role: e.target.value })} />
      <Button variant="primary" type="submit">
        Создать
      </Button>
    </Form>
  )
}

export default UserAddForm
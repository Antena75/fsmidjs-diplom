import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../../api/API";
import { useAppSelector } from "../../../store/hooks";

function LibrariesUpdateForm() {
  const currentLibrary = useAppSelector(state => state.libraries.currentLibrary);
  const [name, setName] = useState<string>(currentLibrary.name);
  const [address, setAddress] = useState<string>(currentLibrary.address);
  const [description, setDescription] = useState<string>(currentLibrary.description);
  const [images, setImages] = useState<any>();
  const { librariesAPI } = API();
  const navigate = useNavigate();
  

  const formHandler = async (e: any) => {
    try {
      e.preventDefault();

      if (name.length < 5 && name.length > 50) {
        iziToast.warning({ message: 'Вне диапозона 5 - 50 символов!', position: 'bottomCenter' });
        return;
      }
      if (address.length < 5 && address.length > 100) {
        iziToast.warning({ message: 'Вне диапозона 5 - 100 символов!', position: 'bottomCenter' });
        return;
      }
      if (description.length > 0 && description.length > 200) {
        iziToast.warning({ message: 'Превышает 200 символов!', position: 'bottomCenter' });
        return;
      }
      if (Object.keys(images).length > 5) {
        iziToast.warning({ message: 'Больше 5 картинок!', position: 'bottomCenter' });
        return;
      }

      let isExtValid = true;
      if (Object.keys(images).length > 0) {
        for (const key in images) {
          if (Object.prototype.hasOwnProperty.call(images, key)) {
            const image = images[key];
            if (!image.type.includes('image')) {
              isExtValid = false;
              break;
            }
          }
        }
      }
      
      if (!isExtValid) {
        iziToast.warning({ message: 'Формат не соответствует jpg, jpeg, png, webp!', position: 'bottomCenter' });
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('description', description);
      for (const key in images) {
        if (Object.prototype.hasOwnProperty.call(images, key)) {
          const image = images[key];
          formData.append('images', image);
        }
      }

      librariesAPI.updateLibrary(formData, currentLibrary._id)
        .then(result => {
          iziToast.success({ message: `Библиотека ${result.data.title} успешно обновлена`, position: 'bottomCenter', });
          navigate('/all-libraries');
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
        <Form.Label>Название библиотеки (5 - 50 символов)</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите название библиотеки" value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Адрес библиотеки (5 - 100 символов)</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите адрес библиотеки" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Описание (необязательно, не более 200 символов)</Form.Label>
        <Form.Control as="textarea" rows={3} className="mb-3" maxLength={200} placeholder="Введите описание библиотеки" value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Выберите фото библиотеки (не более 5)</Form.Label>
        <Form.Control type="file" multiple accept="image/*" onChange={(e: any) => setImages(e.target.files)}/>
      </Form.Group>
      
      <Button variant="success" type="submit">
        Изменить
      </Button>{' '}
      <Button variant="secondary" type="reset">
        Очистить
      </Button>
    </Form>
  )
}

export default LibrariesUpdateForm

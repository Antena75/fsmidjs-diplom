import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../../api/API";
import { useAppSelector } from "../../../store/hooks";

function BooksAddForm() {
  const [bookData, setBookData] = useState<any>({
    title: '',
    author: '',
    year: '',
    description: '',
    images: [],
    totalCopies: '',
    availableCopies: '',
  });

  const { booksAPI } = API();
  const navigate = useNavigate();
  const currentLibrary = useAppSelector(state => state.libraries.currentLibrary);

  const formHandler = async (e: any) => {
    try {
      e.preventDefault();

      if (bookData.title.length < 5 && bookData.title.length > 50) {
        iziToast.warning({ message: 'Вне диапозона 5 - 50 символов!', position: 'bottomCenter' });
        return;
      }
      if (bookData.author.length < 5 && bookData.author.length > 50) {
        iziToast.warning({ message: 'Вне диапозона 5 - 50 символов!', position: 'bottomCenter' });
        return;
      }
      if (bookData.description.length > 0 && bookData.description.length > 200) {
        iziToast.warning({ message: 'Превышает 200 символов!', position: 'bottomCenter' });
        return;
      }
      if (Object.keys(bookData.images).length > 5) {
        iziToast.warning({ message: 'Больше 5 картинок!', position: 'bottomCenter' });
        return;
      }

      let isExtValid = true;
      if (bookData.images && Object.keys(bookData.images).length > 0) {
        for (const key in bookData.images) {
          if (Object.prototype.hasOwnProperty.call(bookData.images, key)) {
            const image = bookData.images[key];
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
      formData.append('library', currentLibrary._id);
      formData.append('title', bookData.title);
      formData.append('author', bookData.author);
      formData.append('year', bookData.year);
      formData.append('description', bookData.description);
      for (const key in bookData.images) {
        if (Object.prototype.hasOwnProperty.call(bookData.images, key)) {
          const image = bookData.images[key];
          formData.append('images', image);
        }
      }
      formData.append('totalCopies', bookData.totalCopies);
      formData.append('availableCopies', bookData.availableCopies);
      
      booksAPI.addBook(formData)
        .then(result => {
          iziToast.success({ message: `Книга ${result.data.title} успешно добавлена`, position: 'bottomCenter' });

          navigate(-1);
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
        <Form.Label>Название книги (5 - 50 символов)</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите название книги" value={bookData.title} onChange={e => setBookData({...bookData, title: e.target.value})} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Автор книги (5 - 50 символов)</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите автора книги" value={bookData.author} onChange={e => setBookData({...bookData, author: e.target.value})}  required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Год издания</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите год издания" value={bookData.year} onChange={e => setBookData({...bookData, year: e.target.value})}  required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Описание (необязательно, не более 200 символов)</Form.Label>
        <Form.Control as="textarea" rows={3} className="mb-3" maxLength={200} placeholder="Введите описание книги" value={bookData.description} onChange={e => setBookData({...bookData, description: e.target.value})} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Выберите фото книги (не более 5)</Form.Label>
        <Form.Control type="file" multiple accept="image/*" onChange={(e: any) => setBookData({...bookData, images: e.target.files})}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Общее количество экземпляров</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите количество" value={bookData.totalCopies} onChange={e => setBookData({...bookData, totalCopies: e.target.value})}  />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Доступное количество экземпляров</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите количество" value={bookData.availableCopies} onChange={e => setBookData({...bookData, availableCopies: e.target.value})}  />
      </Form.Group>
      
      <Button variant="success" type="submit">
        Создать
      </Button>{' '}
      <Button variant="secondary" type="reset">
        Очистить
      </Button>
    </Form>
  )
}

export default BooksAddForm

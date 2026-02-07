import iziToast from "izitoast";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";
import { useAppSelector } from "../../store/hooks";

function RentalsForm() {
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const currentLibrary = useAppSelector(state => state.libraries.currentLibrary);
  const currentBook = useAppSelector(state => state.books.currentBook);
  const userId = useAppSelector(state => state.user.id);
  const { rentalsAPI } = API();
  const navigate = useNavigate()

  const formHandler = async (e: any) => {
    try {
      e.preventDefault();

      const start = new Date(dateStart);
      const end = new Date(dateEnd);
      if (start >= end || start < new Date(Date.now())) {
        iziToast.error({ message: 'Не корректные даты!', position: 'bottomCenter' });
        return;
      }

      const data = {
        userId,
        libraryId: currentLibrary._id,
        bookId: currentBook._id,
        dateStart,
        dateEnd,
      };

      rentalsAPI.addRental(data)
        .then(() => {          
          iziToast.success({ message: `Вы успешно арендовали книгу "${currentBook.title}" в библиотеке "${currentLibrary.name}"`, position: 'bottomCenter' });
          navigate(`/rentals?id=${userId}`)
        })
        .catch(err => {
          iziToast.error({ message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0], position: 'bottomCenter' });
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Арендовать книгу</p>
        <p className="text-muted">Библиотека: {currentLibrary.name}</p>
        <p className="text-muted">Книга: {currentBook.title}</p>
        <Form className="mb-3" onSubmit={formHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Дата начала</Form.Label>
            <Form.Control type="date" className="mb-3" placeholder="Выберите дату" onChange={(e) => setDateStart(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Дата окончания</Form.Label>
            <Form.Control type="date" className="mb-3" placeholder="Выберите дату" onChange={(e) => setDateEnd(e.target.value)} required />
          </Form.Group>
          
          <Button variant="success" type="submit">
            Арендовать
          </Button>{' '}
          <Button variant="secondary" type="reset">
            Очистить
          </Button>
        </Form>
      </Container>
    </Container>
  )
}

export default RentalsForm

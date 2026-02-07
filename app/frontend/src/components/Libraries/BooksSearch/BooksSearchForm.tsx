import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../store/hooks";
import { setBooksState } from "../../../store/slices/booksSlice";

function BooksSearchForm() {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const dispatch = useAppDispatch();

  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      dispatch(setBooksState({ offset: 0, titleSearch: title, authorSearch: author }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form className="mb-3" onSubmit={searchHandler}>
      <Form.Control type="text" className="mb-3" placeholder="Название книги" onChange={(e) => setTitle(e.target.value)} />
      <Form.Control type="text" className="mb-3" placeholder="Автор книги" onChange={(e) => setAuthor(e.target.value)} />
      <Button variant="primary" type="submit">
        Найти
      </Button>
    </Form>
  )
}

export default BooksSearchForm

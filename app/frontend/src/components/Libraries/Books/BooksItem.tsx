import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { setBooksState } from "../../../store/slices/booksSlice";
import { BookData } from "../../../types/interfaces";
import BooksItemImgs from "./BooksItemImgs";

function BooksItem({ book }: { book: BookData }) {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const role = useAppSelector(state => state.user.role);
  const dispatch = useDispatch();

  return (
    <Container className="bg-white rounded shadow-sm p-2 mb-3">
      <Container>
        <Row className="mt-2">
          <Col>
            <BooksItemImgs images={book.images} />
          </Col>
          <Col>
            <p className="fs-3 text-uppercase">{book.title}</p>
            <p className="text-muted">АВТОР: {book.author}</p>
            <p className="text-mutede">Год выпуска: {book.year}</p>
            <p className="text-muted">{book.description}</p>
            {isAuth === true && (role === 'client') &&
              <Link to={'/rental-book'} className="text-decoration-none m-1">
                <Button onClick={() => dispatch(setBooksState({ currentBook: book }))}>Арендовать</Button>
              </Link>
            }
            {role === 'admin' && 
              <Link to={'/update-book'} className="text-decoration-none m-1">
                <Button variant="warning" onClick={() => dispatch(setBooksState({ currentBook: book }))}>Редактировать книгу</Button>
              </Link>
            }
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default BooksItem 
import { Container } from "react-bootstrap";
import { useAppSelector } from "../../../store/hooks";
import BooksAddForm from "./BooksAddForm";

function BooksAddMain() {
  const currentLibrary = useAppSelector(state => state.libraries.currentLibrary);

  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Добавить книгу</p>
        <p className="text-muted">Библиотека: {currentLibrary.name}</p>
        <BooksAddForm />
      </Container>
    </Container>
  )
}

export default BooksAddMain
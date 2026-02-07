import { Container } from "react-bootstrap";
import BooksSearchForm from "./BooksSearchForm";

function BooksSearch() {
  return (
    <>
      <Container className="bg-white rounded shadow-sm p-2 mb-3">
        <Container>
          <p className="fs-4 fw-semibold">Поиск книги</p>
          <BooksSearchForm />
        </Container>
      </Container>
    </>
  )
}

export default BooksSearch
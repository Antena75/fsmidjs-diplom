import { Container } from "react-bootstrap"
import BookUpdateForm from "./BookUpdateForm"

function BookUpdateMain() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Редактировать книгу</p>
        <BookUpdateForm />
      </Container>
    </Container>
  )
}

export default BookUpdateMain
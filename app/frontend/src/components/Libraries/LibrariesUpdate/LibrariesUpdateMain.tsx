import { Container } from "react-bootstrap"
import LibrariesUpdateForm from "./LibrariesUpdateForm"

function LibrariesUpdateMain() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Отредактировать отель</p>
        <LibrariesUpdateForm />
      </Container>
    </Container>
  )
}

export default LibrariesUpdateMain
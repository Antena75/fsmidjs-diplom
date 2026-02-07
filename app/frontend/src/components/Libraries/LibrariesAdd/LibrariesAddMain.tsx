import { Container } from "react-bootstrap"
import LibrariesAddForm from "./LibrariesAddForm"

function LibrariesAdd() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Добавить библиотеку</p>
        <LibrariesAddForm />
      </Container>
    </Container>
  )
}

export default LibrariesAdd
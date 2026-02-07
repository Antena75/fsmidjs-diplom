import { Container } from "react-bootstrap";
import SupportAddForm from "./SupportAddForm";

function SupportAdd() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Добавить обращение</p>
        <SupportAddForm />
      </Container>
    </Container>
  )
}

export default SupportAdd
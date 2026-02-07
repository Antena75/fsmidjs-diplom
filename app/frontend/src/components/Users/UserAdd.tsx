import { Container } from "react-bootstrap";
import UserAddForm from "./UserAddForm";

function UserAdd() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Добавить пользователя</p>
        <UserAddForm />
      </Container>
    </Container>
  )
}

export default UserAdd
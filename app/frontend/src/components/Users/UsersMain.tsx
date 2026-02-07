import { Container, Button, Stack } from "react-bootstrap";
import UsersList from "./UsersList";
import { Link } from "react-router-dom";


function Users() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <Stack direction="horizontal" gap={2}>
        <p className="fs-2 fw-semibold">Все пользователи</p>
            <Link to={'/user/add'} className="ms-auto">
                <Button variant="success">Добавить Пользователя</Button>
            </Link>
        </Stack>
      </Container>
      <UsersList />
    </Container>
  )
}

export default Users
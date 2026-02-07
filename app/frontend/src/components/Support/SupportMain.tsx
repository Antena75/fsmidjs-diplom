import { Container, Button } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import SupportList from "./SupportList";
import { Link } from "react-router-dom";

function SupportMain() {
  const user = useAppSelector(state => state.user);

  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Список обращений</p>
        {user.role === 'client' &&
        <Link to={'/request/add'} className="ms-auto">
            <Button variant="success">Добавить обращение</Button>
        </Link> 
        }       
      </Container>
      <SupportList />
    </Container>
  )
}

export default SupportMain
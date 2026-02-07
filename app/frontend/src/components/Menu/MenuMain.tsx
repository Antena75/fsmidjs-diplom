import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

function MenuMain() {
  const role = useAppSelector(state => state.user.role);
  const userId = useAppSelector(state => state.user.id);
  const isAuth = useAppSelector(state => state.user.isAuth);

  return (
    <ListGroup variant="flush" className="rounded text-center" >
      <ListGroup.Item action className="rounded marbot" variant="success">
        <NavLink className="text-decoration-none text-black fw-semibold marbot" to="/">
          Поиск библиотеки (книги)
        </NavLink>
      </ListGroup.Item>
      {isAuth === true && role === 'admin' &&
        <ListGroup.Item action className="rounded marbot" variant="success">
          <NavLink className="text-decoration-none text-black fw-semibold" to="/all-libraries">
            Добавить библиотеку (книгу)
          </NavLink>
        </ListGroup.Item>
      }
      {isAuth === true && (role === 'admin' || role === 'manager') &&
        <ListGroup.Item action className="rounded marbot" variant="success">
          <NavLink className="text-decoration-none text-black fw-semibold" to="/users/search">
            Поиск пользователя
          </NavLink>
        </ListGroup.Item>
      }
      {isAuth === true && role === 'admin' &&
        <ListGroup.Item action className="rounded marbot" variant="success">
          <NavLink className="text-decoration-none text-black fw-semibold" to="/users">
            Добавить пользователя
          </NavLink>
        </ListGroup.Item>
      }
      {isAuth === true && role === 'client' &&
        <ListGroup.Item action className="rounded marbot" variant="success">
          <NavLink className="text-decoration-none text-black fw-semibold" to={`/rentals?id=${userId}`}>
            Мои книги
          </NavLink>
        </ListGroup.Item>
      }
      {isAuth === true && (role === 'client' || role === 'manager') &&
        <ListGroup.Item action className="rounded marbot" variant="success">
          <NavLink className="text-decoration-none text-black fw-semibold" to="/requests">
            Обращения в поддержку
          </NavLink>
        </ListGroup.Item>
      }
    </ListGroup>
  )
}

export default MenuMain

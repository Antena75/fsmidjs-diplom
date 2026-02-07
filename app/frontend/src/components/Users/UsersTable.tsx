import { Button, Container, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUsersState } from "../../store/slices/usersSlice";
import { UserData } from "../../types/interfaces";

interface data {
  list: UserData[],
}

function UsersTable(data: data) {
  const usersState = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();
  const { list } = data;

  const handleNextPage = (data: string) => {
    try {
      if (data === 'next') {
        dispatch(setUsersState({ offset: usersState.offset + usersState.limit }));
      } else if (data === 'back') {
        dispatch(setUsersState({ offset: usersState.offset - usersState.limit }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <Table striped hover className="p-2 rounded text-center">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Почта</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {list.map(elem =>
            <tr key={elem._id}>
              <td>{elem.name}</td>
              <td>{elem.contactPhone}</td>
              <td>{elem.email}</td>
              <td>{elem.role}</td>
              <td>
                {elem.role === 'client' &&
                  <Link to={`/rentals?id=${elem._id}`} className="text-decoration-none">
                    <Button variant="warning" className="mb-1">Книги в аренде</Button>
                  </Link>
                }
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination className="mt-3">
        {usersState.offset > 0 && 
          <Pagination.Item onClick={() => handleNextPage('back')}>
            Назад
          </Pagination.Item>
        }
        {usersState.list.length >= usersState.limit && 
          <Pagination.Item onClick={() => handleNextPage('next')}>
            Дальше
          </Pagination.Item>
        }
      </Pagination>
      
    </Container>
  )
}

export default UsersTable;

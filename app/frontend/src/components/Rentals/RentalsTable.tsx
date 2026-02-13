import { Button, Container, Table } from "react-bootstrap";
import { RentalData } from "../../types/interfaces";
import { useAppSelector } from "../../store/hooks";

interface RentalsList {
  list: RentalData[];
  handleDelete: Function;
}

function RentalsTable(data: RentalsList) {
  const userMail = useAppSelector(state => state.user.email);
  const { list, handleDelete } = data;
  const role = useAppSelector(state => state.user.role);
  return (
    <Container>
      {list.length > 0 ? (
        <>
          <p className="text-muted">Пользователь: {userMail}</p>
          <Table striped hover className="p-2 rounded text-center">
            <thead>
              <tr>
                <th>Библиотека</th>
                <th>Книга</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {list.map(elem =>
                <tr key={elem.id}>
                  <td>{elem.libraryName}</td>
                  <td>{elem.bookName}</td>
                  <td>{new Date(elem.dateStart).toLocaleDateString()}</td>
                  <td>{new Date(elem.dateEnd).toLocaleDateString()}</td>
                  <td>
                    {role === 'manager' &&
                    <Button variant="danger" className="mb-1" onClick={() => handleDelete(elem.id)}>Отменить</Button>
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      ) : (
        <p className="text-muted">Книги не арендованны!</p>
      )}
      
    </Container>
  )
}

export default RentalsTable;

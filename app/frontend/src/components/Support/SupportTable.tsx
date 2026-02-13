import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SupportChatDto } from "../../types/interfaces";
// import { useAppSelector } from "../../store/hooks";

function SupportTable(data: SupportChatDto) {   //если не использовать any
// const userState = useAppSelector(state => state.user);
  return (
    <Container>
      {data.list && data.list.length > 0 ? (
        <>
          <Table striped hover className="p-2 rounded text-center">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Почта</th>
                <th>Телефон</th>
                <th>Дата отправки</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {data.list.map(elem =>

                <tr key={elem.id}>
                  <td>{elem.user.name}</td>
                  <td>{elem.user.email}</td>
                  <td>{elem.user.contactPhone}</td>
                  <td>{new Date(elem.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/chat?id=${elem.id}&email=${elem.user.email}`} className="text-decoration-none">
                      <Button variant="warning" className="mb-1">Перейти</Button>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      ) : (
        <p className="text-muted text-center">Обращения отсутствуют!</p>
      )}
      
    </Container>
  )
}

export default SupportTable;

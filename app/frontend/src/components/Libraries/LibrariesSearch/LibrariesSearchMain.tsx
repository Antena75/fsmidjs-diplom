import { Container } from "react-bootstrap";
import LibrariesList from "../LibrariesList/LibrariesList";
import LibrariesSearchForm from "./LibrariesSearchForm";

function LibrariesSearch() {
  return (
    <>
      <Container className="bg-white rounded shadow-sm p-2 mb-3">
        <Container>
          <p className="fs-2 fw-semibold">Поиск библитеки</p>
          <LibrariesSearchForm />
        </Container>
      </Container>
      <LibrariesList />
    </>
  )
}

export default LibrariesSearch
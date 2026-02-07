import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LibraryData } from "../../../types/interfaces";
import LibrariesListItemImgs from "./LibrariesListItemImgs";

function LibrariesListItem({ library, showBtn }: { library: LibraryData, showBtn: boolean }) {  
  return (
    <Container className="bg-white rounded shadow-sm p-2 mb-3">
      <Container>
        <Row className="mt-2">
          <Col>
            <LibrariesListItemImgs images={library.images} />
          </Col>
          <Col>
            <p className="fs-3 text-uppercase">{library.name}</p>
            <p className="text-muted">АДРЕС: {library.address}</p>
            <p className="text-muted">{library.description}</p>
            
            {showBtn === true &&
              <Link to={`/library?id=${library._id}`} className="text-decoration-none">
                <Button className="mb-2">Подробрее...</Button>
              </Link>
            }
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default LibrariesListItem
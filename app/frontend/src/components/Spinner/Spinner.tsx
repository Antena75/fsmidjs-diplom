import { Container, Spinner } from "react-bootstrap"

function Spin() {
  return (
    <Container className="p-2 d-flex justify-content-center mt-2">
      <Spinner animation="border" variant="primary"/>
    </Container>
  )
}

export default Spin

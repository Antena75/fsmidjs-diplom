import { Container } from "react-bootstrap"
import RentalsList from "./RentalsList"

function RentalsMain() {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Список арендованных книг</p>
      </Container>
      <RentalsList />
    </Container>
  )
}

export default RentalsMain
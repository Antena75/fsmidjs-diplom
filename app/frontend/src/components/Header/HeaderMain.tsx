import { Button, Container, Navbar, OverlayTrigger, Popover } from "react-bootstrap"
import { Link } from "react-router-dom"
import HeaderAuth from "./HeaderAuth"
import HeaderReg from "./HeaderReg"
import NewMessage from "./NewMessage"
import { useAppSelector } from "../../store/hooks";
import ButtonLogout from "./ButtonLogout";

function HeaderMain() {
  const isAuth = useAppSelector(state => state.user.isAuth);
  return (
    <Container>
      <Navbar bg="white" expand="lg" className="mt-3 mb-4 shadow-sm rounded">
        <Container>
          <Link className="navbar-brand fw-bold text-uppercase" to="/">
            <img srcSet="../src/assets/img/home.jpg" alt="The Best Hotels" />
            The Great Library
          </Link>
          <div style={{display: "flex"}}>
          <Navbar.Collapse className="justify-content-end" style={{marginRight: "20px"}}>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              rootClose={true}
              overlay={
                <Popover>
                  <Popover.Header as="h3">Регистрация</Popover.Header>
                  <Popover.Body>
                    <HeaderReg />
                  </Popover.Body>
                </Popover>
              }
            >
              <Button>Регистрация</Button>
            </OverlayTrigger>
          </Navbar.Collapse>
          {isAuth === true ? (
            <ButtonLogout />
            ) : (
              <>
          <Navbar.Collapse className="justify-content-end">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              rootClose={true}
              overlay={
                <Popover>
                  <Popover.Header as="h3">Войти</Popover.Header>
                  <Popover.Body>
                    <HeaderAuth />
                  </Popover.Body>
                </Popover>
              }
            >
              <Button>Войти</Button>
            </OverlayTrigger>
          </Navbar.Collapse></>)}
          </div>
        </Container>
      </Navbar>
      <NewMessage />
    </Container>
  )
}

export default HeaderMain
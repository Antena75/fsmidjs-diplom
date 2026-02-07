import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useFetchData from "./api/API";
import ChatMain from "./components/Support/ChatMain";
import ErrorMain from "./components/Error/ErrorMain";
import HeaderMain from "./components/Header/HeaderMain";
import LibraryPageMain from "./components/Libraries/LibraryPage/LibraryPageMain";
import BookUpdateMain from "./components/Libraries/BookUpdate/BookUpdateMain";
import LibrariesAdd from "./components/Libraries/LibrariesAdd/LibrariesAddMain";
import LibrariesListMain from "./components/Libraries/LibrariesList/LibrariesListMain";
import BooksAddMain from "./components/Libraries/BooksAdd/BooksAddMain";
import LibrariesSearch from "./components/Libraries/LibrariesSearch/LibrariesSearchMain";
import LibrariesUpdateMain from "./components/Libraries/LibrariesUpdate/LibrariesUpdateMain";
import MenuMain from "./components/Menu/MenuMain";
import RentalsForm from "./components/Rentals/RentalsForm";
import RentalsMain from "./components/Rentals/RentalsMain";
import SupportMain from "./components/Support/SupportMain";
import SupportAdd from "./components/Support/SupportAdd";
import UsersSearch from "./components/Users/UsersSearch";
import UserAdd from "./components/Users/UserAdd";
import Users from "./components/Users/UsersMain";
import { getToken } from "./tokens/token";
import { SocketClient } from "./chatsocket/socket/SocketClient";
import { useAppDispatch } from "./store/hooks";
import { login, logout } from "./store/slices/userSlice";

function App() {
  SocketClient();
  const dispatch = useAppDispatch();
  const { authUserAPI } = useFetchData();

  const checkAuth = async () => {
    const token = getToken();

    try {  // Проверка аутентификации (закончилось время жизни token или нет?)
      if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const { email } = JSON.parse(jsonPayload);
        authUserAPI.getInfo(email)
          .then(result => {
            dispatch(login({ token, role: result.data.role, id: result.data.id, email }));
          })
          .catch(() => {
            dispatch(logout());
          })
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <BrowserRouter>
      <HeaderMain />
      <Container>
        <Row>
          <Col sm={3}>
            <MenuMain />
          </Col>
          <Col sm={9}>
            <Routes>
              <Route path="/" element={<LibrariesSearch />} />
              <Route path="/all-libraries" element={<LibrariesListMain />} />
              <Route path="/add-library" element={<LibrariesAdd />} />
              <Route path="/update-library" element={<LibrariesUpdateMain />} />
              <Route path="/add-book" element={<BooksAddMain />} />
              <Route path="/update-book" element={<BookUpdateMain />} />
              <Route path="/users/search" element={<UsersSearch />} />
              <Route path="/user/add" element={<UserAdd />} />
              <Route path="/users" element={<Users />} />
              <Route path="/library" element={<LibraryPageMain />} />
              <Route path="/rentals" element={<RentalsMain />} />
              <Route path="/rental-book" element={<RentalsForm />} />
              <Route path="/requests" element={<SupportMain />} />
              <Route path="/request/add" element={<SupportAdd />} />
              <Route path="/chat" element={<ChatMain />} />
              <Route path="*" element={<ErrorMain />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  )
}

export default App

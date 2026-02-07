import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../../../api/API";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setLibrariesState } from "../../../store/slices/librariesSlice";
import Spin from "../../Spinner/Spinner";
import BooksList from "../Books/BooksList";
import LibrariesListItem from "../LibrariesList/LibrariesListItem";

function LibraryPageMain() {
  const [error, setError] = useState<boolean>(false);
  const [spin, setSpin] = useState<boolean>(true);
  const role = useAppSelector(state => state.user.role);
  const librariesState = useAppSelector(state => state.libraries);
  const { librariesAPI } = API();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    setError(false);
    setSpin(true);

    if (!queryParams.get('id')) {
      navigate('/error');
      return;
    }

    const id: any = queryParams.get('id');

    librariesAPI.findById(id)
      .then(result => {  
        dispatch(setLibrariesState({ currentLibrary: result.data }));
        setSpin(false);
      })
      .catch(err => {
        setError(true);
        iziToast.error({ message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0], position: 'bottomCenter' });
      });
  }, []);
  
  return (
    <>
      <Container className="bg-white rounded shadow-sm p-2 mb-3">
        <Container>
          <p className="fs-2 fw-semibold">Информация о библиотеке</p>
          {role === 'admin' &&
            <Link to={`/update-library`}>
              <Button variant="warning" className="me-1 mb-2">Редактировать библиотеку</Button>
            </Link>
          }
          {role === 'admin' &&
            <Link to={`/add-book?${librariesState.currentLibrary._id}`}>
              <Button variant="success" className="me-1 mb-2">Добавить книгу</Button>
            </Link>
          }
        </Container>
      </Container>
      {spin ? (
        <Spin />
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке библиотеки!</p>
        ) : (
          <>
            <LibrariesListItem library={librariesState.currentLibrary} showBtn={false} />
            <BooksList />
          </>
        )
      )}
    </>
  )
}

export default LibraryPageMain;

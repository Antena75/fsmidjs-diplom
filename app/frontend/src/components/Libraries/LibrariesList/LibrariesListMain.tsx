import { useEffect } from "react"
import { Button, Container, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { setLibrariesState } from "../../../store/slices/librariesSlice"
import LibrariesList from "./LibrariesList"

function LibrariesListMain() {
  const dispatch = useAppDispatch();
  const role = useAppSelector(state => state.user.role)
  
  useEffect(() => {
    dispatch(setLibrariesState({ offset: 0, nameSearch: '' }));
  }, []);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-2 mb-3">
        <Container>
          <Stack direction="horizontal" gap={2}>
            <p className="fs-2 fw-semibold">Все библиотеки</p>
            {role === 'admin' &&
              <Link to={'/add-library'} className="ms-auto">
                <Button variant="success">Добавить библиотеку</Button>
              </Link>
            }
          </Stack>
        </Container>
      </Container>
      <LibrariesList />
    </>
    
  )
}

export default LibrariesListMain
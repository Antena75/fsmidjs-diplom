import { Container, Pagination } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setLibrariesState } from "../../../store/slices/librariesSlice";
import { LibraryData } from "../../../types/interfaces";
import LibrariesListItem from "./LibrariesListItem";

interface LibrariesList {
  list: LibraryData[],
}

function LibrariesListItems(data: LibrariesList) {
  const librariesState = useAppSelector(state => state.libraries);
  const dispatch = useAppDispatch();
  const { list } = data;

  const handleNextPage = async (data: string) => {
    try {
      if (data === 'next') {
        dispatch(setLibrariesState({ offset: librariesState.offset + librariesState.limit }));
      } else if (data === 'back') {
        dispatch(setLibrariesState({ offset: librariesState.offset - librariesState.limit }));
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      {list.length === 0 ? (
        <Container className="p-2 d-flex justify-content-center">
          <span>Данные для просмотра отсутствуют!</span>
        </Container>
      ) : (
        <>
          {list.map(elem =>
            <LibrariesListItem key={elem._id} library={elem} showBtn={true} />
          )}
          <Pagination className="mt-3">
            {librariesState.offset > 0 && 
              <Pagination.Item onClick={() => handleNextPage('back')}>
                Назад
              </Pagination.Item>
            }
            {librariesState.list.length >= librariesState.limit && 
              <Pagination.Item onClick={() => handleNextPage('next')}>
                Дальше
              </Pagination.Item>
            }
          </Pagination>
        </>
      )}
    </>
  )
}

export default LibrariesListItems
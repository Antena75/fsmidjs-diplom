import { Container, Pagination } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setBooksState } from "../../../store/slices/booksSlice";
import { BookData } from "../../../types/interfaces";
import BooksItem from "./BooksItem";

interface BooksList {
  list: BookData[],
}

function BooksItems(data: BooksList) {
  const booksState = useAppSelector(state => state.books);
  const dispatch = useAppDispatch();
  const { list } = data;

  const handleNextPage = async (data: string) => {
    try {
      if (data === 'next') {
        dispatch(setBooksState({ offset: booksState.offset + booksState.limit }));
      } else if (data === 'back') {
        dispatch(setBooksState({ offset: booksState.offset - booksState.limit }));
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      {list.length === 0 ? (
        <Container className="p-2 d-flex justify-content-center">
          <span>Книги отсутствуют в библиотеке!</span>
        </Container>
      ) : (
        <>
          {list.map(elem =>
            <BooksItem key={elem._id} book={elem} />
          )}
          <Pagination className="mt-3">
            {booksState.offset > 0 && 
              <Pagination.Item onClick={() => handleNextPage('back')}>
                Назад
              </Pagination.Item>
            }
            {booksState.list.length >= booksState.limit && 
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

export default BooksItems
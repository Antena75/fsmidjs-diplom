import iziToast from "izitoast";
import { useEffect, useState } from "react";
import API from "../../../api/API";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setBooksState } from "../../../store/slices/booksSlice";
import Spin from "../../Spinner/Spinner";
import BooksItems from "./BooksItems";
import BooksSearch from "../BooksSearch/BooksSearchMain";

function BooksList() {
  const [error, setError] = useState<boolean>(false);
  const { booksAPI } = API();
  const booksState = useAppSelector(state => state.books);
  const currentLibrary = useAppSelector(state => state.libraries.currentLibrary);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setError(false);

    dispatch(setBooksState({ spin: true }));
    booksAPI.search({
      limit: booksState.limit,
      offset: booksState.offset,
      title: booksState.titleSearch,
      author: booksState.authorSearch,
      library: currentLibrary._id,
      isAvailable: true
    })
      .then(result => { 
        if (result.data.length > 0) {
          dispatch(setBooksState({ list: result.data, spin: false }));
        } else {
          dispatch(setBooksState({ offset: 0, spin: false, list: [] }));
        }
      })
      .catch(err => {
        setError(true);
        iziToast.error({ message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0], position: 'bottomCenter' });
      });
  }, [booksState.offset, booksState.titleSearch, booksState.authorSearch]);

  return (
    <>
      <BooksSearch />
      {booksState.spin ? (
        <Spin />
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке списка!</p>
        ) : (
          <BooksItems list={booksState.list} />
        )
      )}
    </>
  )
}

export default BooksList;

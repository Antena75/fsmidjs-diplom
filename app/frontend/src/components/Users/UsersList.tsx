import iziToast from "izitoast";
import { useEffect, useState } from "react";
import API from "../../api/API";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUsersState } from "../../store/slices/usersSlice";
import Spin from "../Spinner/Spinner";
import UsersTable from "./UsersTable";

function UsersList() {
  const [error, setError] = useState<boolean>(false);
  const { usersAPI } = API();
  const usersState = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setError(false);

    dispatch(setUsersState({ spin: true }));

    usersAPI.search({
      limit: usersState.limit,
      offset: usersState.offset,
      email: usersState.email,
      name: usersState.name,
      contactPhone: usersState.contactPhone,
    })
      .then(result => {  
        if (result.data.length > 0) {
          dispatch(setUsersState({ list: result.data, spin: false }));
        } else {
          dispatch(setUsersState({ offset: 0, spin: false }));
        }
      })
      .catch(err => {
        setError(true);
        iziToast.error({ message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0], position: 'bottomCenter' });
      });
  }, [usersState.offset, usersState.email, usersState.name, usersState.contactPhone]);

  return (
    <>
      {usersState.spin ? (
        <Spin/>
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке списка пользователей!</p>
        ) : (
          <UsersTable list={usersState.list} />
        )
      )}
    </>
  )
}

export default UsersList
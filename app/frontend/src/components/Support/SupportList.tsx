import iziToast from "izitoast";
import { useEffect, useState } from "react";
import API from "../../api/API";
import { useAppSelector } from "../../store/hooks";
import { GetChatListParams } from "../../types/interfaces";
import Spin from "../Spinner/Spinner";
import SupportTable from "./SupportTable";
import { SupportChatData } from "../../types/interfaces";

function SupportList() {
  const [error, setError] = useState<boolean>(false);
  const [spin, setSpin] = useState<boolean>(true);
  const [list, setList] = useState<SupportChatData[]>(); //если не использовать any
  const user = useAppSelector(state => state.user);
  const { supportchatAPI } = API();

  useEffect(() => {
    setError(false);
    setSpin(true);

    const query: GetChatListParams = { userId: user.id, isActive: true };

    if (user.role === 'manager' || user.role === 'admin') {
      query.userId = null;
    }

    supportchatAPI.findRequests(query)
      .then(result => {  
        setList(result.data);
        setSpin(false);
      })
      .catch(err => {
        setError(true);
        iziToast.error({ message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0], position: 'bottomCenter' });
      });
  }, []);

  return (
    <>
      {spin ? (
        <Spin />
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке обращений!</p>
        ) : (
          <SupportTable list = { list } />
        )
      )}
    </>
  )
}

export default SupportList;

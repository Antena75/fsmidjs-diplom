import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../store/hooks";
import { setLibrariesState } from "../../../store/slices/librariesSlice";

function LibrariesSearchForm() {
  const [name, setName] = useState<string>('');
  const dispatch = useAppDispatch();

  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      dispatch(setLibrariesState({ offset: 0, nameSearch: name }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form className="mb-3" onSubmit={searchHandler}>
      <Form.Control type="text" className="mb-3" placeholder="Название библиотеки" onChange={(e) => setName(e.target.value)} />
      <Button variant="primary" type="submit">
        Найти
      </Button>
    </Form>
  )
}

export default LibrariesSearchForm

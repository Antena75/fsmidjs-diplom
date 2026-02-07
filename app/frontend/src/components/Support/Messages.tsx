import { Container } from "react-bootstrap";
import { MessageData } from "../../types/interfaces";
import Message from "./Message";
import { useRef } from "react";

interface data {
  messages: MessageData[],
}

function Messages(data: data) {
  const { messages } = data;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <Container className="bg-white rounded shadow-sm p-2 mb-3">
      <Container
        style={{ maxHeight: "30rem", overflowY: "scroll" }}
        className="d-flex flex-column"
        ref={messagesEndRef}
      >
        {messages.length > 0 ? (
          messages.map(elem =>
            <Message key={elem._id} message={elem} />
          )
        ) : (
          <p className="text-muted text-center">Сообщения в этом чате отсутствуют!</p>
        )}
      </Container>
    </Container>
  )
}

export default Messages;
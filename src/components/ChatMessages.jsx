import { useAutoScroll } from "../hooks/useAutoScroll";
import { ChatMessage } from "./ChatMessage";
import "../styles/ChatMessages.css";

export function ChatMessages(props) {
  const { chatMessages } = props;
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        const { id, message, sender, sendTime } = chatMessage;

        return (
          <ChatMessage
            key={id}
            message={message}
            sender={sender}
            sendTime={sendTime}
          />
        );
      })}
    </div>
  );
}

import { useEffect, useState } from "react";
import { ChatInput } from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";
import { useAutoScroll } from "./hooks/useAutoScroll";
import "./App.css";

const App = () => {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );
  const containerRef = useAutoScroll([chatMessages]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, chatMessages);

  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="intro-text">
          Welcome to the chatbot project! Send a message using the textbox
          below.
        </p>
      )}
      <ChatMessages ref={containerRef} chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};

export default App;

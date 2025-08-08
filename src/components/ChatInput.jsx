import { useState } from "react";
import dayjs from "dayjs";
import { Chatbot } from "supersimpledev";
import LoadingSpinner from "../assets/loading-spinner.gif";
import "../styles/ChatInput.css";

export function ChatInput(props) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { _, setChatMessages } = props;

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    const time = dayjs().valueOf();
    // Prevent sending another message if one is still loading, or if there is no inputText value
    if (inputText === "" || isLoading) {
      return;
    }

    setInputText("");
    setIsLoading(true);

    //   Send user message
    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      {
        id: crypto.randomUUID(),
        message: inputText,
        sender: "user",
        sendTime: dayjs(time).format("HH:mm"),
      },
      {
        // Use a fixed id for loading message so we can later identify it and replace it when the actual response arrives
        id: "loading",
        message: (
          <img className="spinner" src={LoadingSpinner} alt="loading-spinner" />
        ),
        sender: "bot",
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    //   send bot message
    setChatMessages((prevChatMessages) => [
      // return chatMessages but remove the loading... one
      ...prevChatMessages.filter((message) => message.id !== "loading"),
      {
        id: crypto.randomUUID(),
        message: response,
        sender: "bot",
        sendTime: dayjs(time).format("HH:mm"),
      },
    ]);

    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  function clearMessages() {
    setChatMessages([]);
    localStorage.clear();
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Send a message to Chatbot"
        size="30"
        value={inputText}
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <button onClick={clearMessages} className="clear-button">
        Clear
      </button>
    </div>
  );
}

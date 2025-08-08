import RobotProfileImg from "../assets/robot.png";
import UserAvatar from "../assets/user.png";
import "../styles/ChatMessage.css";

export function ChatMessage(props) {
  const { message, sender, sendTime } = props;

  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "bot" && (
        <img
          className="chat-message-profile"
          src={RobotProfileImg}
          alt="robot-profile-avatar"
        />
      )}
      <div className="chat-message-text">
        <span>{message}</span>
        <span className="send-time">{sendTime}</span>
      </div>
      {sender === "user" && (
        <img
          className="chat-message-profile"
          src={UserAvatar}
          alt="user-avatar"
        />
      )}
    </div>
  );
}

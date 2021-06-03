import "./ChatMessage.css";

const ChatMessage = (props) => {
    return (
        <div className="chat-msg">{props.text}</div>
    )
}

export default ChatMessage
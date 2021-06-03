import "./ChatBody.css";
import {useEffect, useState} from "react";
import ChatMessage from "../ChatMessage/ChatMessage";

const ws = new WebSocket("ws://localhost:8080/ws");

const ChatBody = () => {
    const [message, setMessage] = useState("");

    const [messages, updateMessage] = useState([]);

    useEffect(() => {
        ws.onopen = () => {
            console.log('connected');
        }

        ws.onmessage = (e) => {
            const message = e.data;
            updateMessage(state => [...state, message]);
        }

        ws.onclose = () => {
            console.log('disconnected');
        }

    }, [])

    const handleSend = (e) => {
        if (!ws) {
            return;
        }
        e.preventDefault();


        ws.send(message);
        setMessage("");
    }

    return (
        <div className="chat-body">
            <div className="content">
                { messages.map((m, i) => <ChatMessage key={i} text={m} />) }
            </div>

            <form>
                <input type="text"
                       className="input"
                       value={message}
                       onChange={(e) => setMessage(e.target.value)}
                       autoFocus
                       autoComplete="off"/>
                <input onClick={handleSend}
                       className="send-btn"
                       value="Send"
                       type="submit"/>
            </form>
        </div>
    )
}

export default ChatBody
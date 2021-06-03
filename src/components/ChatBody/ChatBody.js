import "./ChatBody.css";
import {useEffect, useState} from "react";

const ws = new WebSocket("ws://localhost:8080/ws");

const ChatBody = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        ws.onopen = () => {
            console.log('connected');
        }

        ws.onmessage = (e) => {
            const message = e.data;
            console.log(message);
        }

        ws.onclose = () => {
            console.log('disconnected');
        }

    }, [])

    const handleSend = () => {
        if (!ws) {
            return;
        }

        ws.send(message);
        setMessage("");
    }

    return (
        <div className="chat-body">
            <div id="log" />

            <button onClick={handleSend}>Send</button>
            <input type="text"
                   value={message}
                   onChange={(e) => setMessage(e.target.value)}
                   autoFocus
                   autoComplete="off"/>
        </div>
    )
}

export default ChatBody
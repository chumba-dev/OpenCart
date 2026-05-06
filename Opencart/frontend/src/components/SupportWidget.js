import React, { useState } from "react";
import { FaComments, FaPaperPlane, FaTimes } from "react-icons/fa";
import { useStore } from "../context/StoreContext";
import "./SupportWidget.css";

export default function SupportWidget() {
  const { messages, sendSupportMessage } = useStore();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendSupportMessage(text);
    setText("");
  };

  return (
    <div className="support-widget">
      {open && (
        <div className="support-panel">
          <div className="support-header">
            <div>
              <strong>Chat with us</strong>
              <span>Order help and product questions</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <FaTimes />
            </button>
          </div>

          <div className="support-messages">
            {messages.map((message) => (
              <div key={message.id} className={`support-message ${message.from}`}>
                <p>{message.text}</p>
                <small>{message.time}</small>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="support-form">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your message" />
            <button type="submit" aria-label="Send message">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      <button className="support-toggle" onClick={() => setOpen(!open)} aria-label="Open chat">
        <FaComments />
      </button>
    </div>
  );
}

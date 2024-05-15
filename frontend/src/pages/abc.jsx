import React, { useState, useEffect } from 'react'

function ChatApp() {
  const [messages, setMessages] = useState([])
  //   const [userInput, setUserInput] = useState('')
  const [formData, setFormData] = useState({ key: '' })
  const [receivedMessage, setReceivedMessage] = useState('')

  useEffect(() => {
    // Fetch previous messages from the Flask server when the component mounts
    fetch('http://localhost:5000/getjuri')
      .then((response) => response.json())
      .then((data) => setMessages(data.messages))
      .catch((error) => console.error('Error fetching messages:', error))

    // Connect to a WebSocket for real-time communication (you can implement this separately)
    // For simplicity, we'll simulate received messages from the WebSocket
    // Replace this with actual WebSocket integration
    const simulateWebSocket = setInterval(() => {
      setReceivedMessage('Simulated message from server')
    }, 5000)

    return () => {
      clearInterval(simulateWebSocket)
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (formData.key.trim() === '') return

    // Update the UI with the new message

    // Send the message to the Flask server

    //   body: JSON.stringify({ key: userInput }),

    try {
      const formDataObject = new FormData()
      console.log(formData)
      formDataObject.append('key', formData.key)

      const response = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formDataObject,
      })

      if (response.ok) {
        // Parse the JSON response to extract the message
        const responseData = await response.json()
        console.log(responseData)
        const newMessage = {
          user: formData.key,
          AI: responseData, // You can replace 'You' with the user's name
        }
        setMessages([...messages, newMessage])
        setUserInput('')
      } else {
        // Handle errors here
        console.error('Failed to send data')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.user === 'You' ? 'user' : 'other'
            }`}
          >
            <p>{message.text}</p>
            <span>{message.user}</span>
          </div>
        ))}
        {receivedMessage && (
          <div className="chat-message other">
            <p>{receivedMessage}</p>
            <span>Server</span>
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          name="key"
          placeholder="Type your message..."
          value={formData.key}
          onChange={handleChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default ChatApp

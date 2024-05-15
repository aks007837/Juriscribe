import React, { useEffect, useState } from 'react'

function MyForm() {
  const [formData, setFormData] = useState({ key: '' })
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formDataObject = new FormData()
      console.log(formData)
      formDataObject.append('key', formData.key)
      setFormData({ key: '' })

      const response = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        body: formDataObject,
      })

      if (response.ok) {
        // Parse the JSON response to extract the message
        const responseData = await response.json()
        console.log(responseData)
        setMessage(responseData)
        const newMessage = {
          user: formData.key,
          AI: responseData,
        }
        console.log(newMessage)
        setHistory([...history, newMessage])
        console.log(history)
      } else {
        // Handle errors here
        console.error('Failed to send data')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <div>
      <div>
        <div>
          {history.map((message, index) => (
            <div>
              <p>
                <span>USER: </span>
                {message.user}
              </p>
              <span>
                <span>AI: </span>
                {message.AI}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Data:
          <input
            type="text"
            name="key"
            value={formData.key}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {/* {message && <p>{message}</p>} */}
    </div>
  )
}

export default MyForm

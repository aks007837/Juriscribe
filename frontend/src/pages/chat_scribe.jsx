import React, { useEffect, useState } from 'react'
const pqr = () => {
  const [formData, setFormData] = useState({ key: '' })
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])
  const [name, setName] = useState('')

  // getting user data
  useEffect(() => {
    const data = localStorage.getItem('auth')
    const parseData = JSON.parse(data)
    console.log(parseData.user)
    setName(parseData.user.fname)
  })

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

      const response = await fetch('http://localhost:8001/chatbot', {
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
    <div className="relative min-h-full min-w-full bg-[#1A232E]">
      <div className="sticky top-0 mb-3 bg-slate-800 py-4 text-center text-2xl font-bold uppercase text-white">
        SCRIBE - YOUR AI LEGAL DOCUMENT GENERATOR
      </div>
      <div className="bg-[#1A232E]e container m-auto min-h-[80vh] max-w-[70vw] overflow-y-auto text-white">
        <div className="bg-cyan base:clear-none float-left clear-both mx-5 my-4 w-2/6 cursor-pointer break-words rounded-lg border bg-[#1A232E] px-3 py-3 align-middle shadow-inner ">
          <span className='text-slate uppercase" text-xl font-bold'>
            SCRIBE:{' '}
          </span>
          Hello I'm Scribe, What kind of document do you want to create?
        </div>
        {history.map((message, index) => (
          <>
            <div className="bg-cyan base:clear-none float-right clear-both mx-5 my-4 w-2/6 cursor-pointer break-words rounded-lg border bg-[#1A232E] px-3 py-3 align-middle shadow-inner ">
              <span className="text-slate text-xl font-bold uppercase">
                {name}:{' '}
              </span>
              {message.user}
            </div>
            <div className="bg-cyan base:clear-none float-left clear-both mx-5 my-4 w-2/6 cursor-pointer break-words rounded-lg border bg-[#1A232E] px-3 py-3 align-middle shadow-inner ">
              <span className='text-slate uppercase" text-xl font-bold'>
                SCRIBE:{' '}
              </span>
              {message.AI}
            </div>
          </>
        ))}
      </div>
      <div className="sticky bottom-0 bg-[#1A232E]  pb-5">
        <div className="px=3 m-auto w-5/6 rounded-xl bg-slate-800 py-4">
          <form onSubmit={handleSubmit} className="margin-auto text-center">
            <input
              className="mx-4 w-5/6 rounded border-none bg-inherit px-3 py-2 text-cyan-200"
              type="text"
              name="key"
              placeholder="Type Here..."
              value={formData.key}
              onChange={handleChange}
            />
            <button type="submit" className="rounded-xl bg-white py-2 px-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default pqr

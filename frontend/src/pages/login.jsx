import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { logo } from '@/images'
import { React, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Register from './register'
import Home from '.'
import { useAuth } from '@/context/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  // calling global auth
  // const [{ auth }, setAuth] = useAuth()
  // const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password)
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', {
        email,
        password,
      })
      console.log(res)
      if (res.data.success) {
        toast.success(res.data.message, {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })

        // setting context api data
        // setAuth({
        //   ...auth,
        //   user: res.data.user,
        //   token: res.data.token,
        // })
        localStorage.setItem('auth', JSON.stringify(res.data))
        setEmail('')
        setPassword('')
        // navigate(location.state || '/')
        setTimeout(() => {
          router.push('http://localhost:3000/#secondary-features')
        }, 2000)
      } else {
        toast.error(res.data.message, {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }
  return (
    <>
      <Head>
        <title>Sign In - Juriscribe.ai</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <ToastContainer />
          <Link href="/" aria-label="Home">
            <Image src={logo} alt="Juriscribe.ai" width="240px" height="50px" />
          </Link>
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Don’t have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>{' '}
              for a free trial.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-10 grid grid-cols-1 gap-y-8"
        >
          <TextField
            label="Email address"
            id="email"
            name="email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="user@user.com"
            required
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            autoComplete="current-password"
            required
          />
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}

export default Login

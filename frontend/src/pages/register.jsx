import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { logo } from '@/images'
import { React, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useRouter } from 'next/router'

export default function Register() {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const router = useRouter()
  // const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(fname, lname, email, password)
    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/auth/register',
        {
          fname,
          lname,
          email,
          password,
          phone,
        }
      )
      console.log(res)
      if (res.data.success) {
        toast.success(res.data && res.data.message, {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setFname('')
        setLname('')
        setEmail('')
        setPassword('')
        setPhone('')
        // navigate('/login')
        setTimeout(() => {
          router.push('/login')
        }, 2500)
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
        <title>Sign Up - Juriscribe.ai</title>
      </Head>
      <AuthLayout>
        <ToastContainer />
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Image src={logo} alt="Juriscribe.ai" width="240px" height="50px" />
          </Link>
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Get started for free
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Already registered?{' '}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign in
              </Link>{' '}
              to your account.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2"
        >
          <TextField
            label="First name"
            id="first_name"
            name="first_name"
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            autoComplete="given-name"
            required
          />
          <TextField
            label="Last name"
            id="last_name"
            name="last_name"
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            autoComplete="family-name"
            required
          />
          <TextField
            className="col-span-full"
            label="Email address"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <TextField
            className="col-span-full"
            label="Password"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <TextField
            className="col-span-full"
            label="Contact Number"
            id="contact"
            name="contact"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="contact"
            required
          />
          {/* <SelectField
            className="col-span-full"
            label="How did you hear about us?"
            id="referral_source"
            name="referral_source"
          >
            <option>AltaVista search</option>
            <option>Super Bowl commercial</option>
            <option>Our route 34 city bus ad</option>
            <option>The “Never Use This” podcast</option>
          </SelectField> */}
          <div className="col-span-full">
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign up <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}

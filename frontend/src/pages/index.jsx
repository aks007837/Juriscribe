import Head from 'next/head'
import { useState, useEffect } from 'react'
import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { useRouter } from 'next/router'

function Home() {
  const router = useRouter()
  const [user, setUser] = useState({
    value: null,
    token: '',
  })
  const [key, setKey] = useState(0)
  useEffect(() => {
    const token = localStorage.getItem('auth')
    if (token) {
      const parseData = JSON.parse(token)
      console.log(parseData.user)
      setUser({
        ...user,
        value: parseData.user,
        token: parseData.token,
      })
      setKey(Math.random())
      console.log(user)
    }
  }, [router.query])
  return (
    <>
      <Head>
        <title>
          Juriscribe.ai - AI-powered Legal Support at your fingertips
        </title>
        <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        />
      </Head>
      <Header user={user} key={key} />
      <main>
        <Hero user={user} />
        <PrimaryFeatures />
        <SecondaryFeatures user={user} />
        <CallToAction />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}

export default Home

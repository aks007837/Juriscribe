import 'focus-visible'
import '@/styles/tailwind.css'
// import ReactDOM from 'react-dom/client'
import { QueryClientProvider, QueryClient } from 'react-query'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const queryClient = new QueryClient()
export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Hydrate state={pageProps.dehydratedState}> */}
      <Component {...pageProps} />
      {/* </Hydrate> */}
    </QueryClientProvider>
  )
}

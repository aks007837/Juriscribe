import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import BirthCertificate from '@/components/forms/BirthCertificate'
import EmployeeAgreement from '@/components/forms/EmployeeAgreement'

const Form = () => {
  const router = useRouter()
  const { file } = router.query
  const [data, setData] = React.useState({})

  useEffect(() => {
    // If the 'file' query parameter is present
    if (file) {
      // Assuming 'file' contains the name of the component to render
      // You might need to adjust this based on your specific implementation
      setData({ component: file })
    }
  }, [file])

  // Render the component based on the 'file' query parameter
  return (
    <>
      {data.component === 'BirthCertificate' && <BirthCertificate />}
      {data.component === 'EmployeeAgreement' && <EmployeeAgreement />}
    </>
  )
}

export default Form

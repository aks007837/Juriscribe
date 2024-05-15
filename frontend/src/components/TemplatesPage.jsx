import React from 'react'
import { useRouter } from 'next/router'
import { Button } from './Button'

const templateData = [
  {
    title: 'Birth Certificate',
    image: '/thumbnails/birth_cert.png',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    file: 'BirthCertificate',
  },
  {
    title: 'Employment Agreement',
    image: '/thumbnails/emp_Agreement.png',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    file: 'EmployeeAgreement',
  },
  {
    title: 'End-user license agreement',
    image:
      'https://signaturely.com/wp-content/uploads/2022/08/non-disclosure-agreement-uplead.jpg',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    file: 'BirthCertificate',
  },
  {
    title: 'Privacy policy',
    image:
      'https://signaturely.com/wp-content/uploads/2022/08/non-disclosure-agreement-uplead.jpg',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    file: 'BirthCertificate',
  },
  {
    title: 'End-user license agreement',
    image:
      'https://signaturely.com/wp-content/uploads/2022/08/non-disclosure-agreement-uplead.jpg',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    file: 'BirthCertificate',
  },
  {
    title: 'Contingent contract',
    image:
      'https://signaturely.com/wp-content/uploads/2022/08/non-disclosure-agreement-uplead.jpg',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    file: 'BirthCertificate',
  },
  {
    title: 'Partnership agreements',
    image:
      'https://signaturely.com/wp-content/uploads/2022/08/non-disclosure-agreement-uplead.jpg',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    file: 'BirthCertificate',
  },
  {
    title: 'Memorandum of understanding',
    image:
      'https://signaturely.com/wp-content/uploads/2022/08/non-disclosure-agreement-uplead.jpg',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    file: 'BirthCertificate',
  },
]

const templateCard = ({ image, title, content, file }) => {
  const router = useRouter()
  const handleSubmit = () => {
    router.push({
      pathname: '/form',
      query: {
        val: JSON.stringify('Hi'),
        file: file,
      },
    })
  }
  return (
    <div className="w-full cursor-pointer p-4 md:w-1/2 lg:w-1/4">
      <a className="relative block h-48 overflow-hidden rounded">
        <img
          alt="ecommerce"
          className="block h-full w-full object-cover object-center"
          src={image}
        />
      </a>
      <div className="mt-4">
        {/* <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">
          {title}
        </h3> */}
        <h2 className="title-font text-lg font-medium text-white">{title}</h2>
        <Button onClick={handleSubmit}>Generate</Button>
      </div>
    </div>
  )
}

const TemplatesPages = () => {
  return (
    <div>
      <section className="body-font bg-gray-900 text-gray-400">
        <div className="container mx-auto px-5 py-24">
          <div className="-m-4 flex flex-wrap">
            {templateData.map((template) => {
              return templateCard(template)
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TemplatesPages

import Image from 'next/future/image'
import backgroundImage from '@/images/background-faqs.jpg'
import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: 'Is Juriscribe suitable for all types of legal documents?',
      answer:
        'Yes, Juriscribe is versatile and can assist in creating a wide range of legal documents, including contracts, agreements, letters, and more.',
    },
    {
      question: 'Is my data safe with Juriscribe?',
      answer:
        'Yes, Juriscribe prioritizes data security and adheres to the highest standards of encryption and privacy protection to ensure your sensitive legal information remains confidential.',
    },
  ],
  [
    {
      question: 'Do I need legal expertise to use Juriscribe?',
      answer:
        'No, Juriscribe is designed to be user-friendly and does not require legal expertise. It uses plain language and guides you through the document creation process step by step.',
    },
    {
      question: 'Can I edit documents created by Juriscribe?',
      answer:
        'Absolutely! Juriscribe provides flexibility, allowing you to review and edit the generated documents to ensure they meet your specific needs and preferences.',
    },
  ],
  [
    {
      question:
        'Why should I consider using a Juriscribe for my legal document needs?',
      answer:
        'Using an Juriscribe can save you time and money compared to hiring an attorney for routine document preparation. Juriscribe helps you understand documents in simplest terms as well.',
    },
    {
      question: 'Is Juriscribe available 24/7?',
      answer:
        "Yes, Juriscribe is accessible round the clock, enabling you to create or edit legal documents whenever it's convenient for you, day or night.",
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 bg-gradient-to-b from-stone-50 to-cyan-100 py-20 sm:py-32"
      data-aos="fade-up"
      data-aos-duration="1300"
    >
      {/* <Image
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        src={backgroundImage}
        alt=""
        opacity="60%"
        width={1558}
        height={946}
        unoptimized
      /> */}
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions (FAQ's)
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can't locate what you need, please reach out to our support
            team via email, and we'll do our best to assist you promptly.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li
                    key={faqIndex}
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    // data-aos-delay={`${faqIndex + 1000}`}
                  >
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

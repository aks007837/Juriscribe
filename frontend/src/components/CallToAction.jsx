import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-gradient-to-t from-stone-50 to-cyan-200 pt-44 pb-24"
      data-aos="zoom-in"
      data-aos-duration="1500"
    >
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="tracking-tightsm:text-4xl font-display text-5xl">
            Get started today
          </h2>
          <p className="mt-8 text-lg tracking-tight ">
            Transform your legal journey with Scribe's AI-driven document
            creation, ensuring security and simplicity. Find your perfect
            document and embark on a worry-free legal path today.
          </p>
          <Button href="/register" className="mt-10">
            Try Juriscribe now
          </Button>
        </div>
      </Container>
    </section>
  )
}

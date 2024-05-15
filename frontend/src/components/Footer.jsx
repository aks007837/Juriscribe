import Image from 'next/image'
import { logo } from '@/images'
import { Container } from '@/components/Container'
import { NavLink } from '@/components/NavLink'

export function Footer() {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16">
          <div className="relative mx-auto w-1/6">
            <Image
              src={logo}
              alt="Juriscribe.ai"
              width="190px"
              height="50px"
              fill={true}
              objectFit="contain"
            />
          </div>
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#secondary-features">Services</NavLink>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <p className="mt-6 text-sm text-slate-500 sm:mt-0">
            Copyright &copy; {new Date().getFullYear()} Juriscribe.ai
          </p>
        </div>
      </Container>
    </footer>
  )
}

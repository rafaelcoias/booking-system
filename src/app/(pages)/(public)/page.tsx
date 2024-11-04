import Link from 'next/link'
import "react-datepicker/dist/react-datepicker.css"
import BookingForm from '~/components/utils/BookingForm'

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Sorria com Confiança</h1>
          <p className="text-xl mb-8">Cuidados dentários de excelência no coração de Lisboa</p>
          <Link href="#booking" className="bg-white text-primary font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300">
            Marque uma Consulta
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Sobre Nós</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src="/placeholder.svg?height=400&width=600" alt="Equipa da Clínica Dentária" className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <p className="text-lg mb-4">
                A Clínica Dentária Lisboa é líder em cuidados dentários de alta qualidade há mais de 20 anos. Nossa equipe de profissionais altamente qualificados está comprometida em fornecer o melhor atendimento possível a cada paciente.
              </p>
              <p className="text-lg mb-4">
                Utilizamos as mais recentes tecnologias e técnicas para garantir que você receba o tratamento mais eficaz e confortável possível. Nosso objetivo é ajudá-lo a alcançar e manter um sorriso saudável e radiante.
              </p>
              <Link href="#booking" className="inline-block bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-primary-dark transition duration-300">
                Conheça Nossa Equipe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="h-screen flex items-center justify-center bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Marque sua Consulta</h2>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
              <BookingForm/>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="h-screen flex items-center justify-center bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Nossos Números</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">10,000+</p>
              <p className="text-xl">Pacientes Atendidos</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">20+</p>
              <p className="text-xl">Anos de Experiência</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">15</p>
              <p className="text-xl">Dentistas Especializados</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">98%</p>
              <p className="text-xl">Taxa de Satisfação</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Clínica Dentária Lisboa</h3>
              <p className="mb-2">Rua da Saúde Oral, 123</p>
              <p className="mb-2">1000-000 Lisboa</p>
              <p className="mb-2">Tel: +351 210 123 456</p>
              <p>Email: info@clinicadentarialisboa.pt</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><Link href="#about" className="hover:text-primary">Sobre Nós</Link></li>
                <li><Link href="#booking" className="hover:text-primary">Marcar Consulta</Link></li>
                <li><Link href="#" className="hover:text-primary">Serviços</Link></li>
                <li><Link href="#" className="hover:text-primary">Equipe</Link></li>
                <li><Link href="#" className="hover:text-primary">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horário de Funcionamento</h3>
              <p className="mb-2">Segunda a Sexta: 9h - 19h</p>
              <p className="mb-2">Sábado: 9h - 13h</p>
              <p>Domingo: Fechado</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-white hover:text-primary">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-primary">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-primary">
                  
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 Clínica Dentária Lisboa. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
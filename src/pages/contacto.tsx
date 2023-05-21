import Layout from '../components/Frontend/layout'
import ContactForm from '@/components/Frontend/contactForm'

const Contacto: React.FC = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl">
        <ContactForm /> 
      </div>
    </Layout>
  )
}

export default Contacto
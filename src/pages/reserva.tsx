import Layout from "@/components/Frontend/layout"
import ReservationForm from "@/components/Frontend/reservationForm"

const Reserva: React.FC = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl">
        <ReservationForm />
      </div>
    </Layout>

  )
}

export default Reserva
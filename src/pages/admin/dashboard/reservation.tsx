import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Toaster, toast } from 'sonner'
import { format } from "date-fns";
import axios from 'axios';
import Link from 'next/link';
interface Reservation {
  id: string;
  date: string;
  time: string;
  numPersons: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

function ReservationPage() {

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      const dateParam = selectedDate ? `?date=${format(selectedDate, 'yyyy-MM-dd')}` : '';
      const response = await axios.get(`/api/reservation/get${dateParam}`);
      const data = await response.data;
      setReservations(data);
    };

    fetchReservations();
  }, [selectedDate]);

  const deleteReservation = async (id: string) => {
    try {
      const response = await fetch(`/api/reservation/delete?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReservations(reservations.filter((reservation) => reservation.id !== id));
        toast.success('Reserva eliminada correctamente');
      } else {
        const errorData = await response.json();
        toast.error(`Error al eliminar la reserva: ${errorData.error}`);
      }
    } catch (error) {
      toast.error(`Error al eliminar la reserva}`);
    }
  };

  return (
    <Layout>
      <div className='p-4'>
        <Toaster richColors closeButton position="top-right" />
        <div className='flex'>
          <div className='mr-3'>
            <button className='rounded-md bg-green-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
              <Link href='/reserva' target='_blank'>
                Crear reserva
              </Link>
            </button>
          </div>
          <div className='w-1/2 md:w-1/4'>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              isClearable
              placeholderText="Selecciona una fecha"
              className='w-full text-gray-500 shadow-md sm:rounded-lg px-6 py-2 mb-4 bg-gray-50 outline-none transition-all placeholder:text-gray-500 focus:border-green-300 focus:ring-1 focus:ring-green-300'
            />
          </div>
        </div>

        <div className="w-full relative lg:h-[77vh] overflow-y-scroll rounded-lg shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className='text-xs text-gray-700 uppercase bg-green-100'>
              <tr>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Hora</th>
                <th className="px-6 py-3">Personas</th>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Apellido</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Teléfono</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className='hover:bg-gray-50 hover:shadow-md  even:bg-green-100 odd:bg-white'>
                  <td className="px-6 py-4">{new Date(reservation.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{reservation.time}</td>
                  <td className="px-6 py-4">{reservation.numPersons}</td>
                  <td className="px-6 py-4">{reservation.name}</td>
                  <td className="px-6 py-4">{reservation.lastName}</td>
                  <td className="px-6 py-4">{reservation.email}</td>
                  <td className="px-6 py-4">{reservation.phone}</td>
                  <td className="px-6 py-4 text-red-500 text-right">
                    <button onClick={() => deleteReservation(reservation.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {/* {reservations.slice(0, 9).map((reservation) => (
                <tr key={reservation.id} className='hover:bg-gray-50 hover:shadow-md  even:bg-green-100 odd:bg-white'>
                  <td className="px-6 py-4">{new Date(reservation.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{reservation.time}</td>
                  <td className="px-6 py-4">{reservation.numPersons}</td>
                  <td className="px-6 py-4">{reservation.name}</td>
                  <td className="px-6 py-4">{reservation.lastName}</td>
                  <td className="px-6 py-4">{reservation.email}</td>
                  <td className="px-6 py-4">{reservation.phone}</td>
                  <td className="px-6 py-4 text-red-500">
                    <button onClick={() => deleteReservation(reservation.id)}>Eliminar</button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default withAdminAuth(ReservationPage);
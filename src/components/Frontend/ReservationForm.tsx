// import { SetStateAction, useState } from 'react';
// import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css';
// import { useForm } from 'react-hook-form';
// import { Reservation } from '../../types/types';
// import { createReservation } from '../../pages/api/reservations';

// type ReservationFormProps = {
//     onSubmit: (reservation: Reservation) => void;
// };

// const ReservationForm = ({ onSubmit }: ReservationFormProps) => {
//     const [dateTime, setDateTime] = useState(new Date());
//     const [numPersons, setNumPersons] = useState(1);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<Reservation>();

//     const onSubmitForm = async (data: Reservation) => {
//         const reservation = {
//             ...data,
//             dateTime,
//             numPersons,
//         };

//         const createdReservation = await createReservation(reservation);

//         onSubmit(createdReservation);
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmitForm)}>
//             <div>
//                 <label htmlFor="dateTime">Date and Time:</label>
//                 <br />
//                 <DatePicker
//                     selected={dateTime}
//                     onChange={(date: SetStateAction<Date>) => setDateTime(date)}
//                     showTimeSelect
//                     timeFormat="HH:mm"
//                     timeIntervals={15}
//                     dateFormat="MMMM d, yyyy h:mm aa"
//                 />
//             </div>
//             <div>
//                 <label htmlFor="numPersons">Number of Persons:</label>
//                 <br />
//                 <input
//                     type="number"
//                     id="numPersons"
//                     {...register('numPersons', { required: true, min: 1, max: 10 })}
//                     value={numPersons}
//                     onChange={(e) => setNumPersons(parseInt(e.target.value))}
//                 />
//                 {errors.numPersons?.type === 'required' && (
//                     <span>This field is required</span>
//                 )}
//                 {errors.numPersons?.type === 'min' && (
//                     <span>Minimum value is 1</span>
//                 )}
//                 {errors.numPersons?.type === 'max' && (
//                     <span>Maximum value is 10</span>
//                 )}
//             </div>
//             <div>
//                 <label htmlFor="name">Name:</label>
//                 <br />
//                 <input
//                     type="text"
//                     id="name"
//                     {...register('name', { required: true })}
//                 />
//                 {errors.name?.type === 'required' && (
//                     <span>This field is required</span>
//                 )}
//             </div>
//             <div>
//                 <label htmlFor="phone">Phone:</label>
//                 <br />
//                 <input
//                     type="tel"
//                     id="phone"
//                     {...register('phone', { required: true })}
//                 />
//                 {errors.phone?.type === 'required' && (
//                     <span>This field is required</span>
//                 )}
//             </div>
//             <div>
//                 <label htmlFor="email">Email:</label>
//                 <br />
//                 <input
//                     type="email"
//                     id="email"
//                     {...register('email', { required: true })}
//                 />
//                 {errors.email?.type === 'required' && (
//                     <span>This field is required</span>
//                 )}
//             </div>
//             <div>
//                 <label htmlFor="address">Address:</label>
//                 <br />
//                 <input type="text" id="address" {...register('address')} />
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default ReservationForm;
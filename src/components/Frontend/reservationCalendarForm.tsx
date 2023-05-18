import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import Calendar from 'react-calendar';

type FormValues = {
	date: Date;
	time: string;
	numPersons: string;
	name: string;
	lastName: string;
	email: string;
	phone: string;
};

function ReservationForm() {
	const [date, setDate] = useState<Date | null>(null);
	const [showPersonalInfo, setShowPersonalInfo] = useState(false);
	const [showForm, setShowForm] = useState(true);
	const [selectedTime, setSelectedTime] = useState('');
	const [selectedNumPersonas, setSelectedNumPersonas] = useState('');
	const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = data => {
		console.log(data);
	};

	const handleDateChange = (value: Date | Date[]) => {
		if (value instanceof Date) {
			setDate(value);
			setValue('date', value.toLocaleDateString('en-CA', { timeZone: 'Europe/Madrid' }) as any);
		}
	};

	const handleContinue = () => {
		setShowPersonalInfo(true);
		setShowForm(false);
	};

	const handleBack = () => {
		setShowPersonalInfo(false);
		setShowForm(true);
	};

	return (
		<div className="mt-12 mb-14">
			{showForm && (
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row justify-center items-center transition">
					<div className="md:mr-10">
						<Calendar
							onChange={handleDateChange as any}
							value={date}
							locale="es-ES"
							minDate={new Date()}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="time" className="mb-1 text font-medium text-gray-500">Hora:</label>
						<select {...register('time')} id="time"
							className="mb-2 bg-gray-100 border border-gray-300 text-gray-500 text rounded-lg focus:ring-green-500 focus:border-green-500  w-64 p-2.5" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
							<option value="">Seleccione</option>
							{Array.from({ length: 12 }, (_, i) => i + 12).map(hour => (
								<option key={hour} value={`${hour}:00`}>
									{`${hour}:00`}
								</option>
							))}
						</select>

						<label htmlFor="numPersons" className="mb-1 text font-medium text-gray-500">Número de personas:</label>
						<select {...register('numPersons')} id="numPersons"
							className="mb-2 bg-gray-100 border border-gray-300 text-gray-500 text rounded-lg focus:ring-green-500 focus:border-green-500  w-64 p-2.5" value={selectedNumPersonas} onChange={(e) => setSelectedNumPersonas(e.target.value)}>
							<option value="">Seleccione</option>
							{Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
								<option key={num} value={num}>
									{num}
								</option>
							))}
						</select>

						{!showPersonalInfo && (
							<button
								type="button"
								onClick={handleContinue}
								className={`mt-2 py-3 rounded text-center transition font-medium ${!date || !selectedTime || !selectedNumPersonas
									? "bg-gray-500 text-white cursor-not-allowed"
									: "bg-green-500 text-white"
									}`}
								disabled={!date || !selectedTime || !selectedNumPersonas}>
								Continuar
							</button>
						)}
					</div>
				</form>
			)}

			{!showForm && (
				<form onSubmit={handleSubmit(onSubmit)} className='md:my-20 xl:mx-80 md:mx-36 sm:mx-20 mx-10'>
					<div className="grid gap-6 mb-6 md:grid-cols-2">
						<div>
							<label htmlFor="name" className='block mb-2 font-medium text-gray-500'>Nombre:</label>
							<input  {...register('name', { required: true })} id="name" className='bg-gray-100 border text-gray-500 text rounded-lg block w-full p-2.5 focus:ring-green-500 focus:border-green-500' />
							{errors.name && <p className='text-red-500 font-medium'>Este campo es obligatorio</p>}
						</div>

						<div>
							<label htmlFor="lastName" className='block mb-2 font-medium text-gray-500'>Apellido:</label>
							<input {...register('lastName', { required: true })} id="lastName" className='bg-gray-100 border text-gray-500 text rounded-lg block w-full p-2.5 focus:ring-green-500 focus:border-green-500' />
							{errors.lastName && <p className='text-red-500 font-medium'>Este campo es obligatorio</p>}
						</div>
					</div>

					<div className="mb-6">
						<label htmlFor="email" className='block mb-2 font-medium text-gray-500'>Email:</label>
						<input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className='bg-gray-100 border text-gray-500 text rounded-lg block w-full p-2.5 focus:ring-green-500 focus:border-green-500' id="email" type="email" />
						{errors.email && <p className='text-red-500 font-medium'>Por favor, introduce un email válido</p>}

					</div>

					<div className="mb-6">
						<label htmlFor="phone" className='block mb-2 font-medium text-gray-500'>Teléfono:</label>
						<input {...register('phone', { required: true, pattern: /^[0-9]{9}$/ })} className='bg-gray-100 border text-gray-500 text rounded-lg block w-full p-2.5 focus:ring-green-500 focus:border-green-500' id="phone" type="tel" />
						{errors.phone && <p className='text-red-500 font-medium'>Por favor, introduce número de teléfono válido (9 dígitos)</p>}
					</div>

					<button type="submit" className='rounded-lg bg-green-500 transition hover:bg-green-600 px-5 p-2.5 text font-medium text-white mr-2'>Reservar</button>

					<button type="button" className='rounded-lg bg-blue-500 transition hover:bg-blue-600 px-5 p-2.5 text font-medium text-white' onClick={handleBack}>Volver</button>
				</form>
			)}
		</div>
	);
}

export default ReservationForm;

//asdfsdfas

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import type { SubmitHandler } from 'react-hook-form';
// import Calendar from 'react-calendar';

// type FormValues = {
// 	date: Date;
// 	time: string;
// 	numPersons: string;
// 	name: string;
// 	lastName: string;
// 	email: string;
// 	phone: string;
// };

// function ReservationForm() {
// 	const [date, setDate] = useState(new Date());
// 	const [showPersonalInfo, setShowPersonalInfo] = useState(false);
// 	const [showForm, setShowForm] = useState(true);
// 	const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();

// 	const onSubmit: SubmitHandler<FormValues> = data => {
// 		// Aquí puedes enviar los datos a tu base de datos
// 		console.log(data);
// 	};

// 	const handleDateChange = (value: Date | Date[]) => {
// 		if (value instanceof Date) {
// 			setDate(value);
// 			setValue('date', value.toLocaleDateString('en-CA', { timeZone: 'Europe/Madrid' }) as any);
// 		}
// 	};

// 	const handleContinue = () => {
// 		setShowPersonalInfo(true);
// 		setShowForm(false);
// 	};

// 	return (
// 		<>
// 			{showForm && (
// 				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row justify-center items-center">
// 					<div className="md:mr-10">
// 						<Calendar
// 							onChange={handleDateChange as any}
// 							value={date}
// 							locale="es-ES"
// 							minDate={new Date()}
// 						/>
// 					</div>

// 					<div className="flex flex-col items-center">
// 						<label htmlFor="time" className="mb-2">Hora:</label>
// 						<select {...register('time')} id="time" className="mb-4">
// 							<option value="">Seleccione</option>
// 							{Array.from({ length: 12 }, (_, i) => i + 12).map(hour => (
// 								<option key={hour} value={`${hour}:00`}>
// 									{`${hour}:00`}
// 								</option>
// 							))}
// 						</select>

// 						<label htmlFor="numPersons" className="mb-2">Número de personas:</label>
// 						<select {...register('numPersons')} id="numPersons" className="mb-4">
// 							<option value="">Seleccione</option>
// 							{Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
// 								<option key={num} value={num}>
// 									{num}
// 								</option>
// 							))}
// 						</select>

// 						{!showPersonalInfo && (
// 							<button type="button" onClick={handleContinue} className="px-4 py-2 bg-green-500 text-white rounded">
// 								Continuar
// 							</button>
// 						)}
// 					</div>
// 				</form>
// 			)}

// 			{!showForm && (
// 				<form onSubmit={handleSubmit(onSubmit)}>
// 					<label htmlFor="name">Nombre:</label>
// 					<input {...register('name', { required: true })} id="name" />
// 					{errors.name && <p className='text-red-500 font-medium'>Este campo es obligatorio</p>}

// 					<label htmlFor="lastName">Apellido:</label>
// 					<input {...register('lastName', { required: true })} id="lastName" />
// 					{errors.lastName && <p className='text-red-500 font-medium'>Este campo es obligatorio</p>}

// 					<label htmlFor="email">Email:</label>
// 					<input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} id="email" type="email" />
// 					{errors.email && <p className='text-red-500 font-medium'>Por favor, introduce un email válido</p>}

// 					<label htmlFor="phone">Teléfono:</label>
// 					<input {...register('phone', { required: true, pattern: /^[0-9]{9}$/ })} id="phone" type="tel" />
// 					{errors.phone && <p className='text-red-500 font-medium'>Por favor, introduce número de teléfono válido (9 dígitos)</p>}

// 					<button type="submit">Reservar</button>
// 				</form>
// 			)}
// 		</>
// 	);
// }

// export default ReservationForm;




// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import type { SubmitHandler } from 'react-hook-form';
// import Calendar from 'react-calendar';

// type FormValues = {
// 	date: Date;
// 	time: string;
// 	name: string;
// 	lastName: string;
// 	email: string;
// 	phone: string;
// };

// function ReservationForm() {
// 	const [date, setDate] = useState(new Date());
// 	const { register, handleSubmit, setValue } = useForm<FormValues>();

// 	const onSubmit: SubmitHandler<FormValues> = data => {
// 		// Aquí puedes enviar los datos a tu base de datos
// 		console.log(data);

// 	};

// 	const handleDateChange = (value: Date | Date[]) => {
// 		if (value instanceof Date) {
// 			setDate(value);
// 			setValue('date', value.toLocaleString('en-CA', { timeZone: 'Europe/Madrid' }) as any);
// 		}
// 	};

// 	const times = [];
// 	for (let i = 18; i < 24; i++) {
// 		times.push(`${i}:00`);
// 		times.push(`${i}:30`);
// 	}

// 	return (
// 		<>
// 			<Calendar
// 				onChange={handleDateChange as any}
// 				value={date}
// 				locale="es-ES"
// 			/>

// 			<form onSubmit={handleSubmit(onSubmit)}>
// 				<input {...register('date')} value={date.toLocaleString()} hidden />

// 				<label htmlFor="time">Hora:</label>
// 				<select {...register('time')} id="time">
// 					{times.map(time => (
// 						<option key={time} value={time}>
// 							{time}
// 						</option>
// 					))}
// 				</select>

// 				<label htmlFor="name">Nombre:</label>
// 				<input {...register('name')} id="name" />

// 				<label htmlFor="lastName">Apellido:</label>
// 				<input {...register('lastName')} id="lastName" />

// 				<label htmlFor="email">Email:</label>
// 				<input {...register('email')} id="email" type="email" />

// 				<label htmlFor="phone">Teléfono:</label>
// 				<input {...register('phone')} id="phone" type="tel" />

// 				<button type="submit">Reservar</button>
// 			</form>
// 		</>
// 	);
// }

// export default ReservationForm;


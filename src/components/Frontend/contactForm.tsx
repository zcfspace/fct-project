import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Toaster, toast } from 'sonner'

type FormData = {
    name: string;
    email: string;
    contactReason: string;
    message: string;
    privacyPolicy: boolean;
};

const ContactForm: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post('/api/sendEmail', data);
            if (response.status === 200) {
                toast.success('Correo enviado correctamente');
                reset();
            } else {
                toast.error('Error al enviar el correo');
            }
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            toast.error('Error al enviar el correo');
        }
        console.log(data);
    };

    return (
        <>
            <Toaster closeButton richColors position="top-right" />
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-3">
                        <label htmlFor="name">Nombre:</label>
                        <input className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300" id="name" {...register("name", { required: "Este campo es obligatorio" })} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email">Gmail:</label>
                        <input className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300" id="email" type="email" {...register("email", { required: "Este campo es obligatorio" })} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="contactReason">Motivo de contacto:</label>
                    <select className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
                        id="contactReason" {...register("contactReason", { required: "Este campo es obligatorio" })}>
                        <option value="">Selecciona un motivo</option>
                        <option value="reserva">Reserva</option>
                        <option value="consulta">Consulta</option>
                        <option value="sugerencia">Sugerencia</option>
                        <option value="reclamacion">Reclamación</option>
                        <option value="katering">katering</option>
                        <option value="otros">Otros</option>
                    </select>
                    {errors.contactReason && <p className="text-red-500 text-sm">{errors.contactReason.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="message">Mensaje:</label>
                    <textarea
                        className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
                        id="message"
                        rows={4}
                        {...register("message")}></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="privacyPolicy">
                        <input
                            className="mr-2"
                            id="privacyPolicy"
                            type="checkbox" {...register("privacyPolicy", { required: "Debes aceptar la política de protección de datos" })} />
                        He leído y acepto la política de protección de datos de la web
                    </label>
                    {errors.privacyPolicy && <p className="text-red-500 text-sm">{errors.privacyPolicy.message}</p>}
                </div>

                <div className="mb-3">
                    <button
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        type="submit">Enviar
                    </button>
                </div>
            </form>
        </>
    );
};

export default ContactForm;

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
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        // try {
        //     const response = await axios.post('/api/sendEmail', data);
        //     if (response.status === 200) {
        //         toast.success('Correo enviado correctamente');
        //     } else {
        //         toast.error('Error al enviar el correo');
        //     }
        // } catch (error) {
        //     console.error('Error al enviar el correo:', error);
        //     toast.error('Error al enviar el correo');
        // }
        console.log(data);
    };

    return (
        <div>
            <Toaster closeButton richColors />
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Nombre:</label>
                <input id="name" {...register("name", { required: "Este campo es obligatorio" })} />
                {errors.name && <p>{errors.name.message}</p>}

                <label htmlFor="email">Gmail:</label>
                <input id="email" type="email" {...register("email", { required: "Este campo es obligatorio" })} />
                {errors.email && <p>{errors.email.message}</p>}

                <label htmlFor="contactReason">Motivo de contacto:</label>
                <select id="contactReason" {...register("contactReason", { required: "Este campo es obligatorio" })}>
                    <option value="">Selecciona un motivo</option>
                    <option value="reserva">Reserva</option>
                    <option value="consulta">Consulta</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="reclamacion">Reclamación</option>
                    <option value="katering">katering</option>
                    <option value="otros">Otros</option>
                </select>
                {errors.contactReason && <p>{errors.contactReason.message}</p>}

                <label htmlFor="message">Mensaje:</label>
                <textarea id="message" {...register("message", { required: "Este campo es obligatorio" })}></textarea>
                {errors.message && <p>{errors.message.message}</p>}

                <label htmlFor="privacyPolicy">
                    <input id="privacyPolicy" type="checkbox" {...register("privacyPolicy", { required: "Debes aceptar la política de protección de datos" })} />
                    He leído y acepto la política de protección de datos de la web
                </label>
                {errors.privacyPolicy && <p>{errors.privacyPolicy.message}</p>}

                <button type="submit">Enviar</button>
            </form>
        </div>

    );
};

export default ContactForm;

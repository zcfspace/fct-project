import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Toaster, toast } from 'sonner'
import { signIn } from "next-auth/react";

type FormData = {
    username: string;
    password: string;
};

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(4).required(),
});

export default function LoginForm() {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormData) => {

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {

                if (callback?.ok) {
                    router.push('/admin/dashboard');
                }
                if (callback?.error) {
                    const promise = () => new Promise((resolve, reject) => setTimeout(reject, 1500));
                    toast.promise(promise, {
                        loading: 'Loading...',
                        error: callback.error,
                        success: 'Logged in',
                    });
                }
            })
    };

    return (
        <div className="flex justify-center mt-20 mx-auto max-w-screen-xl">
            <form className="p-16 rounded shadow-md w-3/4 sm:w-3/6 md:w-3/6 lg:w-5/12 xl:w-2/6" onSubmit={handleSubmit(onSubmit)}>
                <Toaster richColors position="bottom-center" />
                <div>
                    <label htmlFor="username" className="block text-gray-700 font-semibold ">Usuario</label>
                    <input id="username" {...register('username')} className="border p-2 w-full rounded" />
                    {errors.username && <p className="text-red-500">Debe ser un correo electrónico válido</p>}
                </div>

                <div className="mt-4">
                    <label htmlFor="password" className="block text-gray-700 font-semibold">Contraseña</label>
                    <input id="password" type="password" {...register('password')} className="border p-2 w-full rounded" />
                    {errors.password && <p className="text-red-500">La contraseña debe tener al menos 4 caracteres</p>}
                </div>

                <div className="flex justify-start">
                    <button type="submit" className="bg-green-500 text-white rounded transition hover:bg-green-600 p-2 mt-6">Iniciar sesión</button>
                </div>
            </form>
        </div>
    );
}


// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// async function createAdmin() {
//   const password = "toor"; // Contraseña
//   const hashedPassword = await bcrypt.hash(password, 10);

//   await prisma.admin.create({
//     data: {
//       username: "root", // NOmbre de usuario
//       password: hashedPassword,
//     },
//   });

//   console.log("Admin created");
// }

// createAdmin();

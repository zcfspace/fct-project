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
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-semibold ">Usuario</label>
                    <input id="username" {...register('username')}
                        className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300" />
                    {errors.username && <p className="text-red-500">Debes introducir un usuario</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-semibold">Contraseña</label>
                    <input id="password" type="password" {...register('password')}
                        className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300" />
                    {errors.password && <p className="text-red-500">La contraseña debe tener al menos 4 caracteres</p>}
                </div>

                <div>
                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
                        Iniciar sesión
                    </button>
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

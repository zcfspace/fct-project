import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'sonner'

interface Category {
	id: string;
	name: string;
	slug: string;
}

interface CreateCategoryProps {
	onAddCategory: (newCategory: Category) => void;
}

export default function CreateCategory({ onAddCategory }: CreateCategoryProps) {

	let [isOpen, setIsOpen] = useState(false)

	const { register, handleSubmit, formState: { errors }, } = useForm();

	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}

	const onSubmit = async (data: any) => {
		try {
			const response = await axios.post('/api/category/post', data);

			onAddCategory(response.data);

			toast.success(`Categoría ${data.name} creada correctamente`);

		} catch (error) {
			toast.error('Error al crear la categoría');
		}
		closeModal();
	};

	return (
		<>
			<div>
				<button
					type="button"
					onClick={openModal}
					className="rounded-md bg-green-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				>
					Añadir categoría
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Agregar categoría
									</Dialog.Title>
									<div className="mt-4">
										<form onSubmit={handleSubmit(onSubmit)}>
											<label htmlFor="name" className="block text-sm font-medium text-gray-700">
												Nombre
											</label>
											<input
												{...register('name', { required: true })}
												type="text"
												id="name"
												className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
											/>
											{errors.name && <p className="text-red-500 text-xs mt-1">El nombre es obligatorio</p>}

											<label htmlFor="slug" className="block mt-4 text-sm font-medium text-gray-700">
												Slug
											</label>
											<input
												{...register('slug', { required: true })}
												type="text"
												id="slug"
												className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
											/>
											{errors.slug && <p className="text-red-500 text-xs mt-1">El slug es obligatorio</p>}

											<div className="mt-4">
												<button
													type="submit"
													className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
												>
													Crear
												</button>
											</div>
										</form>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'sonner'
interface Category {
	id: string;
	name: string;
	slug: string;
}
interface Food {
	id: string;
	name: string;
	price: number;
	image: string;
	categoryId: string;
}
interface CreateFoodProps {
	onAddFood: (newFood: Food) => void;
}
	
export default function FoodCategory({ onAddFood }: CreateFoodProps) {

	let [isOpen, setIsOpen] = useState(false)

	const { register, handleSubmit, formState: { errors }, } = useForm();
	const [categories, setCategories] = useState<Category[]>([]);

	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}

	const onSubmit = async (data: any) => {
		const { name, price, image, categoryId } = data;

		if (!image[0].type.startsWith("image/")) {
			toast.error('El archivo seleccionado no es una imagen');
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(image[0]);
		reader.onload = async () => {
			const base64Image = reader.result;

			const response = await fetch('/api/food/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					price,
					image: base64Image,
					categoryId,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				onAddFood(data);
				toast.success(`Plato ${name} añadido correctamente`);
			} else {
				toast.error('Error al añadir el plato');
			}
		};
		closeModal();
	};

	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await axios.get(`/api/category/get`);
				const data = await response.data;
				setCategories(data);
			} catch (error) {
				toast.error('Error al cargar las categorias');
			}
		};
		getCategories();
	}, [])


	return (
		<>
			<div>
				<button
					type="button"
					onClick={openModal}
					className="rounded-md bg-green-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				>
					Añadir plato
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
										Agregar plato
									</Dialog.Title>
									<div className="mt-4">
										<form onSubmit={handleSubmit(onSubmit)}>
											<div className="mb-4">
												<label htmlFor="name" className="block text-sm font-medium text-gray-700">
													Nombre
												</label>
												<input
													{...register("name", { required: true })}
													type="text"
													id="name"
													className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
												/>
												{errors.name && (
													<span className="text-red-500 text-xs">Este campo es obligatorio</span>
												)}
											</div>

											<div className="mb-4">
												<label htmlFor="price" className="block text-sm font-medium text-gray-700">
													Precio
												</label>
												<input
													{...register("price", { required: true })}
													type="number"
													id="price"
													className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
												/>
												{errors.price && (
													<span className="text-red-500 text-xs">Este campo es obligatorio</span>
												)}
											</div>

											<div className="mb-4">
												<label htmlFor="image" className="block text-sm font-medium text-gray-700">
													Imagen
												</label>
												<input
													{...register("image", { required: true })}
													type="file"
													id="image"
													accept="image/*"
													className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
												/>

												{errors.image && (
													<span className="text-red-500 text-xs">Este campo es obligatorio</span>
												)}
											</div>

											<div className="mb-4">
												<label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
													Categoría
												</label>
												<select
													{...register("categoryId", { required: true })}

													id="categoryId"
													className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
												>
													<option value="">Selecciona una categoría</option>
													{categories.map((category) => (
														<option key={category.id} value={category.id}>{category.name}</option>
													))}
												</select>
												{errors.categoryId && (
													<span className="text-red-500 text-xs">Este campo es obligatorio</span>
												)}
											</div>

											<div className="mt-4">
												<button
													type="submit"
													className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
												>
													Añadir plato
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

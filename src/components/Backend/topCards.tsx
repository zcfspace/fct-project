import { useState, useEffect } from "react";

interface TopCards {
	reservationsCount: number;
	ordersCount: number;
	foodCount: number;
}

function TopCards() {

	const [data, setData] = useState<TopCards>({
		reservationsCount: 0,
		ordersCount: 0,
		foodCount: 0,
	});

	useEffect(() => {
		async function fetchData() {
			const res = await fetch("/api/dashboard/count");
			const json = await res.json();
			setData(json);
		}
		fetchData();
	}, []);

	return (
		<div className='grid lg:grid-cols-6 gap-4 px-4 pt-4'>
			<div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-3 rounded-lg'>
				<div className='flex flex-col w-full'>
					<p className='text-2xl font-bold'>{data.reservationsCount}</p>
					<p className='text-gray-600'>Reservas</p>
				</div>

			</div>
			<div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-3 rounded-lg'>
				<div className='flex flex-col w-full'>
					<p className='text-2xl font-bold'>{data.ordersCount}</p>
					<p className='text-gray-600'>Comandas</p>
				</div>

			</div>
			<div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-3 rounded-lg'>
				<div className='flex flex-col w-full'>
					<p className='text-2xl font-bold'>{data.foodCount}</p>
					<p className='text-gray-600'>Platos</p>
				</div>
			</div>
		</div>
	)
}

export default TopCards
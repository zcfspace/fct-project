const TopCards = () => {
    return (
        <div className='grid lg:grid-cols-6 gap-4 px-4 pt-4'>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-3 rounded-lg'>
                <div className='flex flex-col w-full'>
                    <p className='text-2xl font-bold'>152</p>
                    <p className='text-gray-600'>Reservas</p>
                </div>

            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-3 rounded-lg'>
                <div className='flex flex-col w-full'>
                    <p className='text-2xl font-bold'>16</p>
                    <p className='text-gray-600'>Comandas</p>
                </div>

            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-3 rounded-lg'>
                <div className='flex flex-col w-full'>
                    <p className='text-2xl font-bold'>1.689€</p>
                    <p className='text-gray-600'>Propinas</p>
                </div>
            </div>
        </div>
    )
}

export default TopCards
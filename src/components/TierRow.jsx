// Componente auxiliar para no repetir código
function TierRow({ label, color, items, refEl }) {
  return (
    <div className='flex flex-row items-center justify-center w-[1000px] h-[80px]'>
      <div
        className='flex items-center justify-center w-1/8 h-full px-6 py-3'
        style={{ backgroundColor: color }}
      >
        <h1 className='text-5xl font-bold'>{label}</h1>
      </div>
      <ul ref={refEl} className='flex w-full h-full bg-zinc-800 gap-x-2'>
        {items.map((item) => (
          <li className='bg-transparent' key={item.id}>
            <img
              src={item.src}
              alt='Item'
              className='w-[80px] h-[80px] object-cover'
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TierRow

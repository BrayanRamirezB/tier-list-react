import Aurora from './components/Aurora.jsx'
import TierMaker from './components/TierMaker.jsx'

function App() {
  return (
    <div className='size-full'>
      <div className='w-full h-3/4 absolute top-0 left-0 -z-1'>
        <Aurora
          colorStops={['#00d8ff', '#7cff67', '#00d8ff']}
          blend={0.2}
          amplitude={1.0}
        />
      </div>

      <div className='flex flex-col items-center justify-center z-999 gap-20 text-zinc-800'>
        <div className='flex items-center justify-center w-full h-full mt-20'>
          <img
            src='/images/tiermaker-logo.webp'
            className='w-1/4 h-auto object-cover'
          />
        </div>

        <TierMaker />
      </div>
    </div>
  )
}

export default App

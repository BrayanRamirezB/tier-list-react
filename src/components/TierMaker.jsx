import { useRef, useState } from 'react'
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { Button } from '@heroui/button'

const generateId = () => Math.random().toString(36).substring(2, 9)

function TierMaker() {
  const [tiers, setTiers] = useState({
    s: [],
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    items: []
  })

  const [levelS, itemS, setItemS] = useDragAndDrop(tiers.s, {
    group: 'tierList'
  })
  const [levelA, itemA, setItemA] = useDragAndDrop(tiers.a, {
    group: 'tierList'
  })
  const [levelB, itemB, setItemB] = useDragAndDrop(tiers.b, {
    group: 'tierList'
  })
  const [levelC, itemC, setItemC] = useDragAndDrop(tiers.c, {
    group: 'tierList'
  })
  const [levelD, itemD, setItemD] = useDragAndDrop(tiers.d, {
    group: 'tierList'
  })
  const [levelE, itemE, setItemE] = useDragAndDrop(tiers.e, {
    group: 'tierList'
  })
  const [freeLevel, freeItem, setFreeItem] = useDragAndDrop(tiers.items, {
    group: 'tierList'
  })

  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const [file] = e.target.files
    if (!file) return

    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 80
        canvas.height = 80
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, 80, 80)

        const resizedDataUrl = canvas.toDataURL('image/png')
        const newItemObj = {
          id: generateId(),
          src: resizedDataUrl
        }

        setFreeItem((prev) => [...prev, newItemObj])
        setTiers((prev) => ({
          ...prev,
          items: [...prev.items, newItemObj]
        }))
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-1'>
      {/* Tier S */}
      <div className='flex flex-row items-center justify-center w-[1000px] h-[80px]'>
        <div className='flex items-center justify-center w-1/8 h-full px-6 py-3 bg-[#ff7f80]'>
          <h1 className='text-5xl font-bold'>S</h1>
        </div>
        <ul ref={levelS} className='flex w-full h-full bg-zinc-800 gap-x-2'>
          {itemS.map((item) => (
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

      {/* Tier A */}
      <div className='flex flex-row items-center justify-center w-[1000px] h-[80px]'>
        <div className='flex items-center justify-center w-1/8 h-full px-6 py-3 bg-[#fec07e]'>
          <h1 className='text-5xl font-bold'>A</h1>
        </div>
        <ul ref={levelA} className='flex w-full h-full bg-zinc-800 gap-x-2'>
          {itemA.map((item) => (
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

      {/* Tier B */}
      <div className='flex flex-row items-center justify-center w-[1000px] h-[80px]'>
        <div className='flex items-center justify-center w-1/8 h-full px-6 py-3 bg-[#fede80]'>
          <h1 className='text-5xl font-bold'>B</h1>
        </div>
        <ul ref={levelB} className='flex w-full h-full bg-zinc-800 gap-x-2'>
          {itemB.map((item) => (
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

      {/* Tier C */}
      <div className='flex flex-row items-center justify-center w-[1000px] h-[80px]'>
        <div className='flex items-center justify-center w-1/8 h-full px-6 py-3 bg-[#fcfe7f]'>
          <h1 className='text-5xl font-bold'>C</h1>
        </div>
        <ul ref={levelC} className='flex w-full h-full bg-zinc-800 gap-x-2'>
          {itemC.map((item) => (
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

      {/* Tier D */}
      <div className='flex flex-row items-center justify-center w-[1000px] h-[80px]'>
        <div className='flex items-center justify-center w-1/8 h-full px-6 py-3 bg-[#bfff7f]'>
          <h1 className='text-5xl font-bold'>D</h1>
        </div>
        <ul ref={levelD} className='flex w-full h-full bg-zinc-800 gap-x-2'>
          {itemD.map((item) => (
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

      {/* Tier E */}
      <div className='flex flex-row items-center justify-center w-[1000px] h-[80px]'>
        <div className='flex items-center justify-center w-1/8 h-full px-6 py-3 bg-[#7fff7f]'>
          <h1 className='text-5xl font-bold'>E</h1>
        </div>
        <ul ref={levelE} className='flex w-full h-full bg-zinc-800 gap-x-2'>
          {itemE.map((item) => (
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

      {/* Upload Button */}
      <div className='mt-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageUpload}
          ref={fileInputRef}
          className='hidden'
        />
        <Button
          onPress={() => fileInputRef.current.click()}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 overflow-hidden cursor-pointer'
        >
          Subir Imagen
        </Button>
      </div>

      {/* Items Pool */}
      <div className='flex flex-row items-center justify-center w-[1000px] h-[84px] mt-10 border-2 border-neutral-400'>
        <ul ref={freeLevel} className='flex w-full h-full bg-transparent'>
          {freeItem.map((item) => (
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
    </div>
  )
}

export default TierMaker

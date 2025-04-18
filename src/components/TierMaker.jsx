import { useRef, useState } from 'react'
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { Button } from '@heroui/button'
import TierRow from './TierRow'

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

  const [levelS, itemS, setLevelS] = useDragAndDrop(tiers.s, {
    group: 'tierList'
  })
  const [levelA, itemA, setLevelA] = useDragAndDrop(tiers.a, {
    group: 'tierList'
  })
  const [levelB, itemB, setLevelB] = useDragAndDrop(tiers.b, {
    group: 'tierList'
  })
  const [levelC, itemC, setLevelC] = useDragAndDrop(tiers.c, {
    group: 'tierList'
  })
  const [levelD, itemD, setLevelD] = useDragAndDrop(tiers.d, {
    group: 'tierList'
  })
  const [levelE, itemE, setLevelE] = useDragAndDrop(tiers.e, {
    group: 'tierList'
  })
  const [freeLevel, freeItem, setFreeItem] = useDragAndDrop(tiers.items, {
    group: 'tierList'
  })

  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    files.forEach((file) => {
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
          const newItemObj = { id: generateId(), src: resizedDataUrl }

          setFreeItem((prev) => [...prev, newItemObj])
          setTiers((prev) => ({
            ...prev,
            items: [...prev.items, newItemObj]
          }))
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSaveImage = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const tierLabels = ['S', 'A', 'B', 'C', 'D', 'E']
    const tierColors = [
      '#ff7f80',
      '#fec07e',
      '#fede80',
      '#fcfe7f',
      '#bfff7f',
      '#7fff7f'
    ]
    const tierData = [itemS, itemA, itemB, itemC, itemD, itemE]

    const rowHeight = 80
    const labelWidth = 100
    const imgSize = 80
    const canvasWidth = 1000
    const canvasHeight = tierLabels.length * rowHeight

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    tierLabels.forEach((label, idx) => {
      const y = idx * rowHeight
      ctx.fillStyle = tierColors[idx]
      ctx.fillRect(0, y, labelWidth, rowHeight)

      ctx.fillStyle = 'black'
      ctx.font = 'bold 40px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(label, labelWidth / 2, y + rowHeight / 2)

      const items = tierData[idx]
      items.forEach((item, i) => {
        const img = new Image()
        img.src = item.src
        const x = labelWidth + i * imgSize
        img.onload = () => {
          ctx.drawImage(img, x, y, imgSize, imgSize)

          if (idx === tierData.length - 1 && i === items.length - 1) {
            const link = document.createElement('a')
            link.download = 'tier-list.png'
            link.href = canvas.toDataURL('image/png')
            link.click()
          }
        }
      })
    })
  }

  const handleReset = () => {
    setLevelS([])
    setLevelA([])
    setLevelB([])
    setLevelC([])
    setLevelD([])
    setLevelE([])
    setFreeItem([])
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-1'>
      {/* Tier S */}
      <TierRow label='S' color='#ff7f80' items={itemS} refEl={levelS} />
      {/* Tier A */}
      <TierRow label='A' color='#fec07e' items={itemA} refEl={levelA} />
      {/* Tier B */}
      <TierRow label='B' color='#fede80' items={itemB} refEl={levelB} />
      {/* Tier C */}
      <TierRow label='C' color='#fcfe7f' items={itemC} refEl={levelC} />
      {/* Tier D */}
      <TierRow label='D' color='#bfff7f' items={itemD} refEl={levelD} />
      {/* Tier E */}
      <TierRow label='E' color='#7fff7f' items={itemE} refEl={levelE} />

      {/* Upload y Save Buttons */}
      <div className='mt-4 flex flex-row items-center gap-2'>
        <input
          type='file'
          accept='image/*'
          multiple
          onChange={handleImageUpload}
          ref={fileInputRef}
          className='hidden'
        />

        <Button
          onPress={() => fileInputRef.current.click()}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer'
        >
          Subir Imagen
        </Button>
        <Button
          onPress={handleSaveImage}
          className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer'
        >
          Guardar Imagen
        </Button>
        <Button
          onPress={handleReset}
          className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer'
        >
          Reset
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

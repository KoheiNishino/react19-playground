'use client'

import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    function draw() {
      const canvas = document.querySelector<HTMLCanvasElement>('canvas')
      if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = 'rgb(200 0 0)'
          ctx.fillRect(10, 10, 50, 50)

          ctx.fillStyle = 'rgb(0 0 200 / 50%)'
          ctx.fillRect(30, 30, 50, 50)
        }
      }
    }
    draw()
  }, [])
  return (
    <canvas className="border border-black" id="tutorial" width="150" height="150"></canvas>
  )
}

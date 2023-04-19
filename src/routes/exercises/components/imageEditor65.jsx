import { useState, useEffect, useRef } from 'react'
import '../../../styles/imagenEditor.css'

export default function ImagenEditor ({
  sequence,
  startSequence,
  isFinished,
  reset,
  num
}) {
  const img = useRef(null)
  const [bg, setBg] = useState(null)
  const [pinos, setPinos] = useState(null)
  const [montana, setMontana] = useState(null)
  const [initBackground, setInitBackground] = useState(null)

  function delay (n) {
    return new Promise(function (resolve) {
      setTimeout(resolve, n)
    })
  }

  useEffect(() => {
    if (reset) {
      pinos.removeAttribute('pinos')
      montana.removeAttribute('montana')
      bg.setAttribute('fill', initBackground)
    }
  }, [reset])

  useEffect(() => {
    async function test () {
      while (!img.current.contentWindow.document.querySelector('#Montanas')) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      setBg(img.current.contentWindow.document.querySelector('#Cielo'))
      setInitBackground(img.current.contentWindow.document.querySelector('#Cielo').attributes.fill.value)
      setPinos(img.current.contentWindow.document.querySelector('#Pinos'))
      setMontana(img.current.contentWindow.document.querySelector('#Montanas'))
    }
    test()
  }, [])

  useEffect(() => {
    if (pinos && montana && startSequence) {
      async function init () {
        for (let i = 0; i < sequence.length; i++) {
          if (sequence[i][0] === 'Pinos') {
            pinos.setAttribute('style', 'opacity: 1')
          } else if (sequence[i][0] === 'Montanas') {
            montana.setAttribute('style', 'opacity: 1')
          } else if (sequence[i][0] === 'Cielo 1') {
            bg.setAttribute('fill', '#FCBC84')
          } else if (sequence[i][0] === 'Cielo 2') {
            bg.setAttribute('fill', '#04557C')
          }
          /*
            *
          */

          await delay(2000)
        }

        isFinished(true)
      }
      init()
    }
  }, [bg, pinos, montana, startSequence])

  return (
    <div className='imagenEditor-65'>
      <iframe src={`images/exercises/65/${num}.svg`} ref={img} />
    </div>
  )
}

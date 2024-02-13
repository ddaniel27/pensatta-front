import { useState, useRef, useEffect } from 'react'
import { fabric } from 'fabric'
import { saveAs } from 'file-saver'
import getCursor from './cursors'
import SelectIcon from '/images/exercises/27/select.svg'
import EraserIcon from '/images/exercises/27/eraser.svg'
import TextIcon from '/images/exercises/27/text.svg'
import RectangleIcon from '/images/exercises/27/rectangle.svg'
import LineIcon from '/images/exercises/27/line.svg'
import EllipseIcon from '/images/exercises/27/ellipse.svg'
import TriangleIcon from '/images/exercises/27/triangle.svg'
import PencilIcon from '/images/exercises/27/pencil.svg'
import DeleteIcon from '/images/exercises/27/delete.svg'
import ImageIcon from '/images/exercises/27/imageicon.svg'
import SaveIcon from '/images/exercises/27/save.svg'

import './eraserBrush'

import styles from '../../../styles/whiteBoard.module.css'
import { useTranslation } from 'react-i18next'

let drawInstance = null
let origX
let origY
let mouseDown = false

const options = {
  currentMode: '',
  currentColor: '#000000',
  currentWidth: 5,
  fill: false,
  group: {}
}

const modes = {
  RECTANGLE: 'RECTANGLE',
  TRIANGLE: 'TRIANGLE',
  ELLIPSE: 'ELLIPSE',
  LINE: 'LINE',
  PENCIL: 'PENCIL',
  ERASER: 'ERASER'
}

const initCanvas = (width, height) => {
  const canvas = new fabric.Canvas('canvas', { height, width })
  fabric.Object.prototype.transparentCorners = false
  fabric.Object.prototype.cornerStyle = 'circle'
  fabric.Object.prototype.borderColor = '#4447A9'
  fabric.Object.prototype.cornerColor = '#4447A9'
  fabric.Object.prototype.cornerSize = 6
  fabric.Object.prototype.padding = 10
  fabric.Object.prototype.borderDashArray = [5, 5]

  canvas.on('object:added', (e) => {
    e.target.on('mousedown', removeObject(canvas))
  })
  canvas.on('path:created', (e) => {
    e.path.on('mousedown', removeObject(canvas))
  })

  return canvas
}

function removeObject (canvas) {
  return (e) => {
    if (options.currentMode === modes.ERASER) {
      canvas.remove(e.target)
    }
  }
}

function stopDrawing () {
  mouseDown = false
}

function removeCanvasListener (canvas) {
  canvas.off('mouse:down')
  canvas.off('mouse:move')
  canvas.off('mouse:up')
}

/*  ==== line  ==== */
function createLine (canvas) {
  if (modes.currentMode !== modes.LINE) {
    options.currentMode = modes.LINE

    removeCanvasListener(canvas)
    canvas.on('mouse:down', startAddLine(canvas))
    canvas.on('mouse:move', startDrawingLine(canvas))
    canvas.on('mouse:up', stopDrawing)

    canvas.selection = false
    canvas.hoverCursor = 'auto'
    canvas.isDrawingMode = false
    canvas.getObjects().map((item) => item.set({ selectable: false }))
    canvas.discardActiveObject().requestRenderAll()
  }
}

function startAddLine (canvas) {
  return ({ e }) => {
    mouseDown = true

    const pointer = canvas.getPointer(e)
    drawInstance = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
      strokeWidth: options.currentWidth,
      stroke: options.currentColor,
      selectable: false
    })

    canvas.add(drawInstance)
    canvas.requestRenderAll()
  }
}

function startDrawingLine (canvas) {
  return ({ e }) => {
    if (mouseDown) {
      const pointer = canvas.getPointer(e)
      drawInstance.set({
        x2: pointer.x,
        y2: pointer.y
      })
      drawInstance.setCoords()
      canvas.requestRenderAll()
    }
  }
}

/* ==== rectangle ==== */
function createRect (canvas) {
  if (options.currentMode !== modes.RECTANGLE) {
    options.currentMode = modes.RECTANGLE

    removeCanvasListener(canvas)

    canvas.on('mouse:down', startAddRect(canvas))
    canvas.on('mouse:move', startDrawingRect(canvas))
    canvas.on('mouse:up', stopDrawing)

    canvas.selection = false
    canvas.hoverCursor = 'auto'
    canvas.isDrawingMode = false
    canvas.getObjects().map((item) => item.set({ selectable: false }))
    canvas.discardActiveObject().requestRenderAll()
  }
}

function startAddRect (canvas) {
  return ({ e }) => {
    mouseDown = true

    const pointer = canvas.getPointer(e)
    origX = pointer.x
    origY = pointer.y

    drawInstance = new fabric.Rect({
      stroke: options.currentColor,
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      width: 0,
      height: 0,
      selectable: false
    })

    canvas.add(drawInstance)

    drawInstance.on('mousedown', (e) => {
      if (options.currentMode === modes.ERASER) {
        canvas.remove(e.target)
      }
    })
  }
}

function startDrawingRect (canvas) {
  return ({ e }) => {
    if (mouseDown) {
      const pointer = canvas.getPointer(e)

      if (pointer.x < origX) {
        drawInstance.set('left', pointer.x)
      }
      if (pointer.y < origY) {
        drawInstance.set('top', pointer.y)
      }
      drawInstance.set({
        width: Math.abs(pointer.x - origX),
        height: Math.abs(pointer.y - origY)
      })
      drawInstance.setCoords()
      canvas.renderAll()
    }
  }
}

/* ==== Ellipse ==== */
function createEllipse (canvas) {
  if (options.currentMode !== modes.ELLIPSE) {
    options.currentMode = modes.ELLIPSE

    removeCanvasListener(canvas)

    canvas.on('mouse:down', startAddEllipse(canvas))
    canvas.on('mouse:move', startDrawingEllipse(canvas))
    canvas.on('mouse:up', stopDrawing)

    canvas.selection = false
    canvas.hoverCursor = 'auto'
    canvas.isDrawingMode = false
    canvas.getObjects().map((item) => item.set({ selectable: false }))
    canvas.discardActiveObject().requestRenderAll()
  }
}

function startAddEllipse (canvas) {
  return ({ e }) => {
    mouseDown = true

    const pointer = canvas.getPointer(e)
    origX = pointer.x
    origY = pointer.y
    drawInstance = new fabric.Ellipse({
      stroke: options.currentColor,
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      cornerSize: 7,
      objectCaching: false,
      selectable: false
    })

    canvas.add(drawInstance)
  }
}

function startDrawingEllipse (canvas) {
  return ({ e }) => {
    if (mouseDown) {
      const pointer = canvas.getPointer(e)
      if (pointer.x < origX) {
        drawInstance.set('left', pointer.x)
      }
      if (pointer.y < origY) {
        drawInstance.set('top', pointer.y)
      }
      drawInstance.set({
        rx: Math.abs(pointer.x - origX) / 2,
        ry: Math.abs(pointer.y - origY) / 2
      })
      drawInstance.setCoords()
      canvas.renderAll()
    }
  }
}

/* === triangle === */
function createTriangle (canvas) {
  removeCanvasListener(canvas)

  canvas.on('mouse:down', startAddTriangle(canvas))
  canvas.on('mouse:move', startDrawingTriangle(canvas))
  canvas.on('mouse:up', stopDrawing)

  canvas.selection = false
  canvas.hoverCursor = 'auto'
  canvas.isDrawingMode = false
  canvas.getObjects().map((item) => item.set({ selectable: false }))
  canvas.discardActiveObject().requestRenderAll()
}

function startAddTriangle (canvas) {
  return ({ e }) => {
    mouseDown = true
    options.currentMode = modes.TRIANGLE

    const pointer = canvas.getPointer(e)
    origX = pointer.x
    origY = pointer.y
    drawInstance = new fabric.Triangle({
      stroke: options.currentColor,
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      width: 0,
      height: 0,
      selectable: false
    })

    canvas.add(drawInstance)
  }
}

function startDrawingTriangle (canvas) {
  return ({ e }) => {
    if (mouseDown) {
      const pointer = canvas.getPointer(e)
      if (pointer.x < origX) {
        drawInstance.set('left', pointer.x)
      }
      if (pointer.y < origY) {
        drawInstance.set('top', pointer.y)
      }
      drawInstance.set({
        width: Math.abs(pointer.x - origX),
        height: Math.abs(pointer.y - origY)
      })

      drawInstance.setCoords()
      canvas.renderAll()
    }
  }
}

function createText (canvas) {
  removeCanvasListener(canvas)

  canvas.isDrawingMode = false

  const text = new fabric.Textbox('text', {
    left: 100,
    top: 100,
    fill: options.currentColor,
    editable: true
  })

  canvas.add(text)
  canvas.renderAll()
}

function changeToErasingMode (canvas) {
  if (options.currentMode !== modes.ERASER) {
    removeCanvasListener(canvas)

    canvas.isDrawingMode = false

    options.currentMode = modes.ERASER
    canvas.hoverCursor = `url(${getCursor({ type: 'eraser' })}), default`
  }
}

function onSelectMode (canvas) {
  options.currentMode = ''
  canvas.isDrawingMode = false

  removeCanvasListener(canvas)

  canvas.getObjects().map((item) => item.set({ selectable: true }))
  canvas.hoverCursor = 'all-scroll'
}

function clearCanvas (canvas) {
  canvas.getObjects().forEach((item) => {
    if (item !== canvas.backgroundImage) {
      canvas.remove(item)
    }
  })
}

function draw (canvas) {
  if (options.currentMode !== modes.PENCIL) {
    removeCanvasListener(canvas)

    options.currentMode = modes.PENCIL
    // canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = parseInt(options.currentWidth, 10) || 1
    canvas.isDrawingMode = true
  }
}

function handleResize (callback) {
  const resize_ob = new ResizeObserver(callback)

  return resize_ob
}

function resizeCanvas (canvas, whiteboard) {
  return () => {
    const ratio = canvas.getWidth() / canvas.getHeight()
    const whiteboardWidth = whiteboard.clientWidth

    const scale = whiteboardWidth / canvas.getWidth()
    const zoom = canvas.getZoom() * scale
    canvas.setDimensions({ width: whiteboardWidth, height: whiteboardWidth / ratio })
    canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0])
  }
}

const WhiteboardComponent = ({ aspectRatio = 4 / 3, setPhase }) => {
  const { t } = useTranslation('whiteBoardComponent')
  const [canvas, setCanvas] = useState(null)
  const [brushWidth, setBrushWidth] = useState(5)
  const [isFill, setIsFill] = useState(false)
  const [fileReaderInfo, setFileReaderInfo] = useState({
    file: '',
    totalPages: null,
    currentPageNumber: 1,
    currentPage: ''
  })
  const canvasRef = useRef(null)
  const whiteboardRef = useRef(null)
  const uploadImageRef = useRef(null)
  const uploadPdfRef = useRef(null)

  useEffect(() => {
    if (!canvas && canvasRef.current) {
      const canvas = initCanvas(
        whiteboardRef.current.clientWidth,
        whiteboardRef.current.clientWidth / aspectRatio
      )
      setCanvas(() => canvas)

      handleResize(resizeCanvas(canvas, whiteboardRef.current)).observe(whiteboardRef.current)
    }
  }, [canvasRef])

  useEffect(() => {
    if (canvas) {
      const center = canvas.getCenter()
      fabric.Image.fromURL(fileReaderInfo.currentPage, (img) => {
        img.scaleToHeight(canvas.height)
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          top: center.top,
          left: center.left,
          originX: 'center',
          originY: 'center'
        })

        canvas.renderAll()
      })
    }
  }, [fileReaderInfo.currentPage])

  function uploadImage (e) {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.addEventListener('load', () => {
      fabric.Image.fromURL(reader.result, (img) => {
        img.scaleToHeight(canvas.height)
        canvas.add(img)
      })
    })

    reader.readAsDataURL(file)
  }

  function changeCurrentWidth (e) {
    const intValue = parseInt(e.target.value)
    options.currentWidth = intValue
    canvas.freeDrawingBrush.width = intValue
    setBrushWidth(() => intValue)
  }

  function changeCurrentColor (e) {
    options.currentColor = e.target.value
    canvas.freeDrawingBrush.color = e.target.value
  }

  function changeFill (e) {
    options.fill = e.target.checked
    setIsFill(() => e.target.checked)
  }

  function onSaveCanvasAsImage () {
    canvasRef.current.toBlob(function (blob) {
      saveAs(blob, 'image.png')
    })
  }

  function onFileChange (event) {
    updateFileReaderInfo({ file: event.target.files[0], currentPageNumber: 1 })
  }

  function updateFileReaderInfo (data) {
    setFileReaderInfo({ ...fileReaderInfo, ...data })
  }

  return (
    <>
      <div className={styles['game-container']}>
        <div ref={whiteboardRef} className={styles.whiteboard}>
          <div className={styles['canvas-area']}>
            <canvas ref={canvasRef} id="canvas" />
          </div>
        </div>
        <div>
          <div className={styles.toolbar}>
            <div>
              <button id={styles['btn-toolbar']} type="button" onClick={() => createLine(canvas)}>
                <img src={LineIcon} alt="line" />
              </button>
            </div>
            <div>
              <button id={styles['btn-toolbar']} type="button" onClick={() => createRect(canvas)}>
                <img src={RectangleIcon} alt="Rectangle" />
              </button>
            </div>
            <div>
              <button id={styles['btn-toolbar']} type="button" onClick={() => createEllipse(canvas)}>
                <img src={EllipseIcon} alt="Ellipse" />
              </button>
            </div>
            <div>
              <button id={styles['btn-toolbar']} type="button" onClick={() => createTriangle(canvas, options)}>
                <img src={TriangleIcon} alt="Triangle" />
              </button>
            </div>
            <div>
              <button id={styles['btn-toolbar']} type="button" onClick={() => draw(canvas)}>
                <img src={PencilIcon} alt="Pencil" />
              </button>
            </div>
            <div>
              <button id={styles['btn-toolbar']} type="button" onClick={() => createText(canvas)}>
                <img src={TextIcon} alt="Text" />
              </button>
            </div>
            <div>
              <button id={styles['btn-toolbar']} type="button" onClick={() => onSelectMode(canvas)}>
                <img src={SelectIcon} alt="Selection mode" />
              </button>
            </div>
            <div>
              <button id={styles['btn-toolbar']} type="button" onClick={() => changeToErasingMode(canvas)}>
                <img src={EraserIcon} alt="Eraser" />
              </button>
            </div>
            <div>
              <button id={styles['btn-toolbar']} type="button" onClick={() => clearCanvas(canvas)}>
                <img src={DeleteIcon} alt="Delete" />
              </button>
            </div>
            <div>
              <input type="checkbox" name="fill" id="fill" checked={isFill} onChange={changeFill} />
              <label htmlFor="fill">{t('fill')}</label>
            </div>
            <div>
              <input type="color" name="color" id="color" onChange={changeCurrentColor} />
            </div>
            <div>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={brushWidth}
                onChange={changeCurrentWidth}
              />
            </div>
            <div className={styles.uploadDropdown}>
              <input ref={uploadImageRef} accept="image/*" type="file" onChange={uploadImage} className={styles.inputFile} />
              <button id={styles['btn-toolbar']} className={styles.dropdownButton} onClick={() => uploadImageRef.current.click()}>
                <img src={ImageIcon}/>
              </button>
            </div>
            <div>
              <button id={styles['btn-toolbar']} onClick={onSaveCanvasAsImage}>
                <img src={SaveIcon}/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setPhase('end')}>{t('btnNext')}</button>
    </>
  )
}

export default WhiteboardComponent

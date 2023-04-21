import { useEffect, useState } from 'react'
import styles from '../../../styles/windowsExplorer.module.css'

const Panels = () => {
  return (
    <div className={styles['panels-container']}>
      <div className={styles['panels-elements-container']}>
        <div className={styles['panel-navigation-container']}>
          <div className={styles['panel-navigation']}/>
          <span>Panel de navegación</span>
        </div>
        <div className={styles['panel-other-container']}>
          <div className={styles['panel-preview-container']}>
            <div className={styles['panel-preview']}/>
            <span>Vista previa</span>
          </div>
          <div className={styles['panel-details-container']}>
            <div className={styles['panel-details']}/>
            <span>Detalles</span>
          </div>
        </div>
      </div>
      <span>Paneles</span>
    </div>
  )
}

const Design = () => {
  return (
    <div className={styles['design-container']}>
      <div className={styles['design-options']}>
        <div className={styles['design-options-col']}>
          <div className={styles['design-icons-very-large-container']}>
            <div className={styles['design-icons-very-large']}/>
            <span>Iconos muy grandes</span>
          </div>
          <div className={styles['design-icons-small-container']}>
            <div className={styles['design-icons-small']}/>
            Iconos pequeños
          </div>
          <div className={styles['design-icons-mosaico-container']}>
            <div className={styles['design-icons-mosaico']}/>
            Mosaico
          </div>
        </div>
        <div className={styles['design-options-col']}>
          <div className={styles['design-icons-large-container']}>
            <div className={styles['design-icons-large']}/>
            Iconos grandes
          </div>
          <div className={styles['design-icons-list-container']}>
            <div className={styles['design-icons-list']}/>
            Lista
          </div>
          <div className={styles['design-icons-content-container']}>
            <div className={styles['design-icons-content']}/>
            Contenido
          </div>
        </div>
        <div className={styles['design-options-col']}>
          <div className={styles['design-icons-medium-container']}>
            <div className={styles['design-icons-medium']}/>
            Iconos medianos
          </div>
          <div className={styles['design-icons-details-container']}>
            <div className={styles['design-icons-details']}/>
             Detalles
          </div>
        </div>
      </div>

    Diseño
    </div>
  )
}

const OrderBy = () => {
  return (
    <div className={styles['current-view-container']}>
      <div className={styles['current-view-options']}>
        <div className={styles['order-by-container']}>
          <div className={styles['order-by-icon']}/>
                  Ordenar por
        </div>
        <div className={styles['group-by-container']}>
          <div className={styles['group-by-icon']}/>
                  Agrupar por
        </div>
      </div>
              Vista actual
    </div>
  )
}
const ShowOccult = () => {
  return (
    <div className={styles['show-occult-container']}>
      <div className={styles['show-occult']}>
        <div className={styles['show-occult-mark-options']}>
          <div className={styles['show-occult-element-box']}>
            <div className={styles['mark-box']}/>
                    Casillas del elemento
          </div>
          <div className={styles['show-occult-extension']}>
            <div className={styles['mark-box']}/>
                    Extensiones de archivo
          </div>
          <div className={styles['show-occult-hidden']}>
            <div className={styles['mark-box']}/>
                    Elementos ocultos
          </div>
        </div>
        <div className={styles['hidden-select-container']}>
          <div className={styles['hidden-select-icon']}/>
                Ocultar elementos seleccionados
        </div>
      </div>
              Mostrar/Ocultar
    </div>
  )
}
const Options = () => {
  return (
    <div className={styles['options-container']}>
      <div className={styles['options-icon']}/>
              Opciones
    </div>
  )
}
const WindowHeaderButtons = () => {
  return (
    <div className={styles['window-header-buttons']}>
              x
    </div>
  )
}
const WindowHeaderTabs = () => {
  return (
    <div className={styles['window-header-tabs']}>
      <div className={styles['window-header-tabs-element']}>Archivo</div>
      <div className={styles['window-header-tabs-element']}>Inicio</div>
      <div className={styles['window-header-tabs-element']}>Compartir</div>
      <div className={`${styles['window-header-tabs-element']} ${styles['window-header-tabs-element-selected']}`}>Vista</div>
    </div>
  )
}

const WindowHeaderOptions = () => {
  return (
    <div className={styles['windows-header-options']}>
      <Panels />
      <Design />
      <OrderBy />
      <ShowOccult />
      <Options />
    </div>
  )
}

const WindowHeaderSearch = () => {
  return (
    <div className={styles['window-header-search']}>
      <div className={styles['arrows-container']}>
        <div className={styles['back-arrow']}/>
        <div className={styles['forward-arrow']}/>
        <div className={styles['recents-arrow']}/>
        <div className={styles['up-arrow']}/>
      </div>
      <div className={styles['path-container']}>
        <div className={styles['path-element']}>Acceso directo</div>
        <div className={styles['recents-arrow']}/>
        <div className={styles['reload-arrow-icon']}/>

      </div>
      <div className={styles['search-container']}>
        <div className={styles['search-icon']}/>
        <input className={styles['search-input']} type="text" placeholder="Buscar"/>
      </div>
    </div>
  )
}

const ContentElement = ({ name, type, size, date, image, index }) => {
  return (
    <div className={styles['window-content-element']}>
      <div className={styles['window-content-element-image']} style={{ backgroundImage: `url(/images/exercises/76/${image})`, top: `${index * 20}px` }} />
      <div className={styles['window-content-element-name']} style={{ top: `${index * 20}px` }}>{name}</div>
      <div className={styles['window-content-element-date']} style={{ top: `${index * 20}px` }}>{date}</div>
      <div className={styles['window-content-element-type']} style={{ top: `${index * 20}px` }}>{type}</div>
      <div className={styles['window-content-element-size']} style={{ top: `${index * 20}px` }}>{size}</div>
    </div>
  )
}

const WindowsExplorer = ({ content }) => {
  const [contentState, setContentState] = useState(content)
  return (
    <>
      <div className={styles['window-container']}>
        <div className={styles['window-header']}>
          <WindowHeaderButtons />
          <WindowHeaderTabs />
          <WindowHeaderOptions />
          <WindowHeaderSearch />
        </div>
        <div className={'window-content'} >
          <div className={styles['window-content-header']}>
            <div className={styles['window-content-header-name']}>Nombre</div>
            <div className={styles['window-content-header-date']}>Fecha de modificación</div>
            <div className={styles['window-content-header-type']}>Tipo</div>
            <div className={styles['window-content-header-size']}>Tamaño</div>
          </div>
          <div className={styles['window-content-files']}>
            {
              contentState.map((element, index) => {
                return (
                  <ContentElement
                    key={index}
                    name={element.name}
                    type={element.type}
                    size={element.size}
                    date={element.date}
                    image={element.image}
                    index={index + 1}
                  />
                )
              })
            }
          </div>

        </div>
        <div />
        <div />

      </div>
    </>
  )
}
export default WindowsExplorer

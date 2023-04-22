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

const Design = ({ setView }) => {
  return (
    <div className={styles['design-container']}>
      <div className={styles['design-options']}>
        <div className={styles['design-options-col']}>
          <div className={`${styles['design-icons-very-large-container']} ${styles['on-hover']}`} onClick={() => { setView('very-large') }} >
            <div className={styles['design-icons-very-large']}/>
            <span>Iconos muy grandes</span>
          </div>
          <div className={`${styles['design-icons-small-container']} ${styles['on-hover']}`} onClick={() => { setView('small') }}>
            <div className={styles['design-icons-small']}/>
            Iconos pequeños
          </div>
          <div className={`${styles['design-icons-mosaico-container']} ${styles['on-hover']}`} onClick={() => { setView('mosaico') }}>
            <div className={styles['design-icons-mosaico']}/>
            Mosaico
          </div>
        </div>
        <div className={styles['design-options-col']}>
          <div className={`${styles['design-icons-large-container']} ${styles['on-hover']}`} onClick={() => { setView('large') }}>
            <div className={styles['design-icons-large']}/>
            Iconos grandes
          </div>
          <div className={`${styles['design-icons-list-container']} ${styles['on-hover']}`} onClick={() => { setView('list') }}>
            <div className={styles['design-icons-list']}/>
            Lista
          </div>
          <div className={`${styles['design-icons-content-container']} ${styles['on-hover']}`} onClick={() => { setView('content') }}>
            <div className={styles['design-icons-content']}/>
            Contenido
          </div>
        </div>
        <div className={styles['design-options-col']}>
          <div className={`${styles['design-icons-medium-container']} ${styles['on-hover']}`} onClick={() => { setView('medium') }}>
            <div className={styles['design-icons-medium']}/>
            Iconos medianos
          </div>
          <div className={`${styles['design-icons-details-container']} ${styles['on-hover']}`} onClick={() => { setView('details') }}>
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
          <span> Ordenar por</span>
          <div className={styles['order-by-dropdown']}>
            <div className={styles['order-by-dropdown-options']}>
              <p className={`${styles['on-hover']}`}>Nombre</p>
              <p className={`${styles['on-hover']}`}>Fecha</p>
              <p className={`${styles['on-hover']}`}>Tipo</p>
              <p className={`${styles['on-hover']}`}>Tamaño</p>
            </div>
            <div>
              <p className={`${styles['on-hover']}`}>Ascendente</p>
              <p className={`${styles['on-hover']}`}>Descendente</p>
            </div>
          </div>
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
    <div className={styles['window-header-buttons-folder-name']}>
      <div className={styles['window-header-folder-name']}>
        <div className={styles['folder-icon']}/>
        <div className={styles['sheet-icon']}/>
        <div className={styles['new-folder-icon']}/>
        <span>Explorador de archivos</span>
      </div>
      <div className={styles['window-header-buttons']}>
        <span> - </span>
        <span> □ </span>
        <span> x </span>
      </div>
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

const WindowHeaderOptions = ({ setView }) => {
  return (
    <div className={styles['windows-header-options']}>
      <Panels />
      <Design setView={setView} />
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

const ContentElement = ({ name, type, size, date, image, index, view }) => {
  const windowStyles = {
    details: styles['window-content-element'],
    'very-large': styles['window-content-element-vl'],
    small: styles['window-content-element-s'],
    large: styles['window-content-element-l'],
    medium: styles['window-content-element-m'],
    content: styles['window-content-element-c'],
    list: styles['window-content-element-li'],
    mosaico: styles['window-content-element-mo']

  }
  const imageStyle = {
    details: styles['window-content-element-image'],
    'very-large': styles['window-content-element-image-vl'],
    small: styles['window-content-element-image-s'],
    large: styles['window-content-element-image-l'],
    medium: styles['window-content-element-image-m'],
    content: styles['window-content-element-image-c'],
    list: styles['window-content-element-image-li'],
    mosaico: styles['window-content-element-image-mo']
  }
  const nameStyle = {
    details: styles['window-content-element-name'],
    'very-large': styles['window-content-element-vl'],
    small: styles['window-content-element-s'],
    large: styles['window-content-element-l'],
    medium: styles['window-content-element-m'],
    content: styles['window-content-element-name-c'],
    list: styles['window-content-element-li'],
    mosaico: styles['window-content-element-mo']
  }
  const dateStyle = {
    details: styles['window-content-element-date'],
    'very-large': styles['window-content-element-vl'],
    small: styles['window-content-element-s'],
    large: styles['window-content-element-l'],
    medium: styles['window-content-element-m'],
    content: styles['window-content-element-date-c'],
    list: styles['window-content-element-li'],
    mosaico: styles['window-content-element-mo']
  }
  const typeStyle = {
    details: styles['window-content-element-type'],
    'very-large': styles['window-content-element-vl'],
    small: styles['window-content-element-s'],
    large: styles['window-content-element-l'],
    medium: styles['window-content-element-m'],
    content: styles['window-content-element-type-c'],
    list: styles['window-content-element-li'],
    mosaico: styles['window-content-element-mo']
  }
  const sizeStyle = {
    details: styles['window-content-element-size'],
    'very-large': styles['window-content-element-vl'],
    small: styles['window-content-element-s'],
    large: styles['window-content-element-l'],
    medium: styles['window-content-element-m'],
    content: styles['window-content-element-size-c'],
    list: styles['window-content-element-li'],
    mosaico: styles['window-content-element-mo']
  }
  return (
    <div className={`${windowStyles[view]} ${styles['on-hover']}`} >
      <div className={`${imageStyle[view]}`} style={{ backgroundImage: `url(/images/exercises/76/${image})` }} />
      <div className={`${nameStyle[view]} ${styles['overflow-hidden']} `} >{name}</div>
      {(view === 'details' || view === 'content') && <div className={`${dateStyle[view]}`} >{date}</div>}
      {(view === 'details') && <div className={`${typeStyle[view]}`} >{type}</div>}
      {(view === 'details' || view === 'content') && <div className={`${sizeStyle[view]}`} >{size}</div>}
    </div>
  )
}

const WindowsExplorer = ({ content }) => {
  const [contentState, setContentState] = useState(content)
  const [view, setView] = useState('details')
  const windowStyles = {
    details: styles['window-content-files'],
    'very-large': styles['window-content-files-vl'],
    small: styles['window-content-files-s'],
    large: styles['window-content-files-l'],
    medium: styles['window-content-files-m'],
    content: styles['window-content-files-c'],
    list: styles['window-content-files-li'],
    mosaico: styles['window-content-files-mo']

  }
  return (
    <>
      <div className={styles['window-container']}>
        <div className={styles['window-header']}>
          <WindowHeaderButtons />
          <WindowHeaderTabs />
          <WindowHeaderOptions setView={setView} />
          <WindowHeaderSearch />
        </div>
        <div className={styles['window-content']} >
          {view === 'details' && <div className={styles['window-content-header']}>
            <div className={styles['window-content-header-name']}>Nombre</div>
            <div className={styles['window-content-header-date']}>Fecha de modificación</div>
            <div className={styles['window-content-header-type']}>Tipo</div>
            <div className={styles['window-content-header-size']}>Tamaño</div>
          </div>}
          <div className={`${windowStyles[view]} ${styles['height-335']}`}>
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
                    view={view}
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

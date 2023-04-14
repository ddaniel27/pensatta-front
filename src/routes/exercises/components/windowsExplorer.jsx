import { useEffect, useState } from 'react'
import styles from '../../../styles/windowsExplorer.module.css'

const OrderBy = ({ content, order }) => {

}

const ContentElement = ({ name, type, size, date, image }) => {
  return (
    <div className={styles['window-content-element']}>
      <div className={styles['window-content-element-image']} style={{ backgroundImage: `url(/images/exercises/76/${image})` }} />
      <div className={styles['window-content-element-name']}>{name}</div>
      <div className={styles['window-content-element-date']}>{date}</div>
      <div className={styles['window-content-element-type']}>{type}</div>
      <div className={styles['window-content-element-size']}>{size}</div>
    </div>
  )
}

const WindowsExplorer = ({ content }) => {
  const [contentState, setContentState] = useState(content)
  return (
    <>
      <div className={styles['window-container']}>
        <div className={styles['window-header']}>
          <div className={styles['window-header-buttons']}>
              x
          </div>
          <div className={styles['window-header-tabs']}>
            <div className={styles['window-header-tabs-element']}>Archivo</div>
            <div className={styles['window-header-tabs-element']}>Inicio</div>
            <div className={styles['window-header-tabs-element']}>Compartir</div>
            <div className={`${styles['window-header-tabs-element']} ${styles['window-header-tabs-element-selected']}`}>Vista</div>
          </div>
          <div className={styles['windows-header-options']}>
            <div className={styles['panels-container']}>
              <div className={styles['panel-navigation-container']}>
                <div className={styles['panel-navigation']}/>
                Panel de navegación
              </div>
              <div className={styles['panel-other-container']}>
                <div className={styles['panel-preview-container']}>
                  <div className={styles['panel-preview']}/>
                  Vista previa
                </div>
                <div className={styles['panel-details-container']}>
                  <div className={styles['panel-details']}/>
                  Detalles
                </div>
              </div>
              Paneles
            </div>
            <div className={styles['design-container']}>
              <div className={styles['design-options']}>
                <div className={styles['design-icons-very-large-container']}>
                  <div className={styles['design-icons-very-large']}/>
                  Iconos muy grandes
                </div>
                <div className={styles['design-icons-large-container']}>
                  <div className={styles['design-icons-large']}/>
                  Iconos grandes
                </div>
                <div className={styles['design-icons-medium-container']}>
                  <div className={styles['design-icons-medium']}/>
                  Iconos medianos
                </div>
                <div className={styles['design-icons-small-container']}>
                  <div className={styles['design-icons-small']}/>
                  Iconos pequeños
                </div>
                <div className={styles['design-icons-list-container']}>
                  <div className={styles['design-icons-list']}/>
                  Lista
                </div>
                <div className={styles['design-icons-details-container']}>
                  <div className={styles['design-icons-details']}/>
                  Detalles
                </div>
                <div className={styles['design-icons-mosaico-container']}>
                  <div className={styles['design-icons-mosaico']}/>
                  Mosaico
                </div>
                <div className={styles['design-icons-content-container']}>
                  <div className={styles['design-icons-content']}/>
                  Contenido
                </div>
              </div>
              Diseño
            </div>
            <div className={styles['current-view-container']}>
              <div className={styles['current-view-options']}>
                <div className={styles['order-by-container']}>
                  <div className={styles['order-by']}/>
                  Ordenar por
                </div>
                <div className={styles['group-by-container']}>
                  <div className={styles['group-by']}/>
                  Agrupar por
                </div>
              </div>
              Vista actual
            </div>
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
                  <div className={styles['hidden-select']}/>
                Ocultar elementos seleccionados
                </div>
              </div>
              Mostrar/Ocultar
            </div>
            <div className={styles['options-container']}>
              <div className={styles['options-icon']}/>
              Opciones
            </div>
          </div>
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
              <div className={styles['reload-arrow']}/>

            </div>
            <div className={styles['search-container']}>
              <div className={styles['search-icon']}/>
              <input className={styles['search-input']} type="text" placeholder="Buscar"/>
            </div>
          </div>
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

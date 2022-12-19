# Pensatta Front-End

Documentacion de la aplicacion frontend para Pensatta



## Tecnologias

- React

- React - Router - DOM

- Vite

- Axios

- ChartJS

- React - ChartJS - 2

- Lottie

- React - PDF - Renderer / Vite - Plugin

- React - Beautiful - DND

- Tone

- React - Game - Snake

- React - Jigsaw - Puzzle



## Estructura

La estructura del codigo se encuentra dispuesta de la siguiente forma

```
/
|- index.html
|- package.json
|- vite.config.js
|- package-lock.json
|- .gitignore
|
|- /images
|
|- /src
    |- main.jsx
    |- App.jsx
    |- requests.js
    |- exercisesList.json
    |
    |- /styles
    |
    |- /context
    |   |- ActivityContext.js
    |   |- DemoContext.js
    |   |- UserContext.js
    |    
    |- /routes
        |- dashboard.jsx
        |- loginScreen.jsx
        |
        |- /components
        |
        |- /demo
        |
        |- /exercises
            |- routerActivity.jsx
            |
            |- /components
            |- /ex[id]
                |-ex[id].jsx
                |-data.json
```

En `/` se encuentran todos los archivos de configuracion del sistema y los archivos estaticos que sirve la aplicacion.



En `/images` se encuentran todos los recursos visuales de la aplicacion ordenados en distintas carpetas de acuerdo a su uso. En la raiz estan los recursos visuales mas generales, mientras que en la carpeta `/exercises` se ordenan los recursos de cada aplicacion dependiendo del ejercicio.



En `/src` esta la configuracion de React para toda la aplicacion. `main.jsx` es el archivo general de React (en WebPack su analogo seria `index.js`), alli se importa el archivo de `App.jsx` asi como otros componentes de `react-router-dom` para configurar la aplicacion. `App.jsx` maneja los estados generales de las vistas (Ya sea vista **demo**, **login screen** o **dashboard**). `requests.js` es un archivo que maneja todas las *requests* de la aplicacion haciendo uso de `Axios` para las peticiones hacia el backend. En el mismo archivo se configurar todos los parametros de las peticiones. `exercisesList.json` es un archivo de configuracion especial usado por la aplicacion para identificar las id's de los ejercicios disponibles.



En `/styles` estan todos los archivos de tipo `css` de la aplicacion. Cada archivo es nombrado de la misma forma que el componente que lo importa.



En `/context` estan los archivos de contexto de la aplicacion. Actualmente existen tres contextos distintos. `ActivityContext.js` maneja el contexto de la actividad (id, puntaje, tiempo, entre otros.); `UserContext.js` maneja el contexto del usuario logueado en la aplicacion; `DemoContext.js`, similar al contexto del usuario, maneja parametros de la aplicacion en version **demo**.



En `/routes` se manejan todos los archivos de logica para las distintas vistas de la aplicacion. `Dashboard.jsx` y `loginScreen.jsx` son los componentes para manejar la vista de **dashboard** y **login screen** respectivamente. En `/components` se encuentran todos los componentes usados para construir ambas vistas.



En `/demo` se encuentra un clon de la vista de **dashboard** simplificado, sin peticiones al backend.



En `/exercises` se encuentran todos los archivos de logica para los distintos ejercicios de la aplicacion. `routerActivity.jsx` se encarga de renderizar el ejercicio correspondiente al id dado. La estructura de cada carpeta contiene el componente y los datos en un archivo de tipo `json`. Cada archivo de tipo `json` comparte algunos campos como `id`, `name`, `color`, `initMessages`, entre otros de acuerdo al tipo de ejercicio. `/components` guarda todos los componentes generales de los distintos ejercicios para ser reutilizados en otros.



## Notas Importantes

- Cada ejercicio se encuentra envuelto en un componente ya sea `scoringComponent.jsx` o `noScoringComponent.jsx`, usados para manejar el estado de la pantalla de ejercicio (mensajes iniciales, actividad, mensaje final). `scoringComponent.jsx` tambien se encarga de hacer las peticiones al backend para llevar un registro de los ejercicios.

- Existe un ejercicio llamado `exTest` usado solamente para el desarrollo, se debe quitar el id `test` del archivo `exercisesList.json` cuando se lleve a produccion.

- `react-pdf` maneja una forma de estilizacion bastante limitada, por lo que hacer layouts complejos no es tarea sencilla.

- La aplicacion esta preparada para hacer integraciones continuas de nuevos ejercicios, por lo que solo es necesario importar cada nuevo ejercicio en el `routerActivity.jsx` y en el `exercisesList.json` para produccion.

- Cada componente general tiene una pequeña descripcion de su funcionamiento en el codigo.











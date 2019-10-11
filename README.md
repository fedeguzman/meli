# Mercado Libre - Front End Challenge

**Autor:** Federico Guzmán

**Versión:** 1.0

**Ultima modificación al archivo:** 10/10/2019 - 10:09 PM

## Stack Tecnologico

La aplicación posee el siguiente stack tecnologico:

**FRONT END**
Javascript: React
CSS / Sass
HTML

Se utilizo "create-react-app" para crear el frontend de la aplicación

**BACKEND**
Node JS
Express
Axios for HTTP requests

Se utilizo "express-generator" para crear la parte del backend de la aplicación

## Instalación

Desde el root:

**Backend**

    cd backend
    npm install o yarn install
    npm start o yarn start
   
 El backend estara funcionando en el puerto **3001**.
 
**Frontend**

    cd frontend
    npm install o yarn install

**Para lanzar una versión de desarrollo**

    npm run dev o yarn dev

**Para lanzar una versión compilada y lista para producción**

    npm run build o yarn build

Una vez finalizado el proceso de "build", se puede correr la aplicación con la libreria **"serve"**. Para eso se debe tener instalada primero, más información en [https://www.npmjs.com/package/serve](https://www.npmjs.com/package/serve)

    serve -p 3000 build

Ahora solo falta ingresar a http://localhost:3000 y buscar los productos que vos quieras!

## Detalles de la aplicación

**Backend**

 - La aplicación utiliza la libreria axios para realizar todas las solicitudes a la API de Mercado Libre.
 - El BE esta configurado para que solamente se puede acceder a través del front end, desde el puerto 3000, a través de CORS.
 - Se creo un archivo .env donde se encuentran los parametros del puerto, la URL de la API de MELI y la URL del front end para el CORS.
 - Se creo un archivo de ayuda llamado "endpoints.js" que retorna un objeto con todos los endpoints utilizados en la aplicación.
 - Se agrego un endpoint que obtiene el "path_from_root" de las categorias para obtener segun el id de la categoria.

**Frontend**

 - Se utilizo la libreria React Helmet para mejorar el SEO pudiendo cambiar el titulo y las etiquetas meta.
 - La aplicación cumple con todas las caracteristicas de una Progressive Web App
 - Se utiliza flex para que la aplicación sea responsive
 - Se utilizo sass para la creación de los estilos
 - Se usa la libreria "node-sass" para compilar los ".scss"
 - Se utilizo la herramienta de Google, Lighthouse para verificar el SEO, la accesibilidad, la performance, las buenas practicas y si se cumplen las caracteristicas principales de una PWA.
 - Se agrega un indicador visual de que la aplicación esta cargando al momento de realizar alguna request.
 - Al momento de realizar una busqueda, se guarda en localStorage la busqueda que se realizo, la hora y fecha y el resultado de la busqueda. Para lo ultimo, se guarda como un "cache" del resultado, por si el usuario vuelve a refrescar la pagina o se mueve entre productos, para que tenga una mejor experiencia. La información del resultado de la busqueda tiene una duración de un minuto, luego de pasado ese tiempo, ya no es mas valido y al volver consultar la misma "query", vuelve a realizar la request a la API. Lo mismo sucede, al momento de ingresar a la descripción del producto. La duración de expiración se puede modificar.
- Las busquedas se registran para poder mostrar sugerencias al hacer clic en la caja de busqueda, donde se mostraran las 5 busquedas más recientes

## Otros

Debido a que la API no traia ningun "autor", considere ingresar mi nombre y apellido.
Se agrego un banner al inicio de la aplicación.


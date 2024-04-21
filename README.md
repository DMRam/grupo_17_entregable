# Para poder ejecutar este proyecto

    > Tener instalado Node

# 1 - Al clonar el proyecto deben:
    > Navegar a la carpeta que contiene App.tsx
    > verificar que están en la misma carpeta que package.json y ejecutar:
        > npm install
    -> Se creara la carpeta node_modules con las dependencias del proyecto
# Ejecutar el frontend - (React Typescript + IBM React Carbon)

> Ejecutar:
> npm start
> se les abrira el proyecto React Typescript que corre en el puerto (habitualmente)
> http://localhost:3000/
> http://192.168.2.16:3000

# Configurar Google Client ID

* Este project use Google Client ID API para el login por lo que para ejecutarlo en local sin Google Client ID deben: 
> Navegar hasta el directorio scr/components/login/ImmLandingForm.tsx y comentar el componente <GoogleSignIn /> en la linea 85 y el import del mismo componente en la linea 6 
> Comentar client_id: GOOGLE_CLIENT_ID en la linea 62 en GoogleSignIn.tsx
> También en el directorio src/components/google/GoogleSignin.tsx y comentar el import de las claves de accesso a google "import {GOOGLE_CLIENT_ID} from '../../api/keys/ApiKeys'" en la linea 3 y la instancia del mismo en la linea 62

> Ir a src/data/UrlForAPICalls.tsx y cambiar a 'http://localHost:8080' comentando el que está habilitado y habilitando el que está comentado.

Build Frontend con Gulp + NGINX

Este proyecto utiliza Gulp para construir los assets del frontend (HTML, CSS, JS e imágenes) con hashing de ficheros y reescritura de referencias, y NGINX como servidor web para servir los archivos generados.

Requisitos previos

Sistema operativo: Windows, Linux o macOS

Acceso a terminal / consola

Permisos para instalar software

1. Instalación de Node.js

Gulp se ejecuta sobre Node.js.

Opción recomendada

Descargar la versión LTS desde:

https://nodejs.org


Verifica la instalación:

node -v
npm -v

2. Instalación de Gulp CLI (global)

Instala la interfaz de línea de comandos de Gulp:

npm install -g gulp-cli


Verifica:

gulp --version

3. Inicialización del proyecto

Desde la raíz del proyecto:

npm init -y


Esto generará el archivo package.json.

4. Instalación de dependencias del proyecto

Instala Gulp y los módulos utilizados en gulpfile.js:

npm install --save-dev \
gulp \
gulp-rev \
gulp-rev-rewrite \
del

Dependencias utilizadas
Paquete	Descripción
gulp	Task runner
gulp-rev	Versionado de assets con hash
gulp-rev-rewrite	Reescritura de referencias en HTML
del	Limpieza del directorio dist
stream/promises	Pipelines async (Node.js nativo)
5. Estructura de directorios esperada
project-root/
│
├── src/
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── images/
│   └── avatars/
│
├── dist/             (generado automáticamente)
│
├── gulpfile.js
├── package.json
└── README.md

6. Ejecución del build

Lanza el proceso completo de build:

gulp build


Esto ejecuta, en orden:

Limpieza del directorio dist

Copia de index.html

Procesado de assets (CSS, JS, imágenes) con hash

Reescritura de rutas en index.html

El resultado final queda en el directorio dist/.

7. Instalación de NGINX
Windows

Descargar desde:

https://nginx.org/en/download.html


Descomprimir, por ejemplo en:

C:\nginx


Ejecutar:

nginx.exe

Linux (Debian / Ubuntu)
sudo apt update
sudo apt install nginx

macOS (Homebrew)
brew install nginx

8. Configuración básica de NGINX

Configura NGINX para servir el contenido del directorio dist.

Ejemplo de configuración:

server {
    listen 80;
    server_name localhost;

    root /ruta/absoluta/al/proyecto/dist;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}


Reinicia NGINX tras aplicar cambios.

9. Acceso a la aplicación

Abre el navegador y accede a:

http://localhost


La aplicación se servirá directamente desde los archivos generados en dist/.

10. Notas importantes

Nunca edites manualmente dist/

Todos los cambios deben hacerse en src/

Cada ejecución de gulp build genera nuevos hashes

El rev-manifest.json es interno y no debe versionarse

11. Comandos útiles
gulp build        # Genera el build completo
node -v           # Ver versión de Node.js
npm -v            # Ver versión de npm
gulp --version    # Ver versión de Gulp


12. Ciclo de construcción

npm run build -> prepara el dist
docker compose build -> construye la imagen
docker compose up -d -> despliega el nuevo contenedor

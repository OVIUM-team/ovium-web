# ovium-web

Portal web de Ovium. Hecho con React + Vite y React Router.

## Requisitos

- [Node.js](https://nodejs.org/) 20.19 o superior, o 22.12 o superior (incluye `npm`)
- La API de Ovium corriendo (por defecto en `http://localhost:8000`)

## Cómo levantar el portal

1. Clona el repositorio y entra a la carpeta:

   ```bash
   git clone https://github.com/OVIUM-team/ovium-web.git
   cd ovium-web
   ```

2. Crea tu archivo de variables de entorno a partir del ejemplo:

   ```bash
   cp .env.example .env
   ```

   Si tu API corre en otra dirección, cambia `VITE_API_URL` dentro de `.env`.

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Levanta el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre la dirección que aparece en la terminal (normalmente <http://localhost:5173>).

## Scripts

| Comando           | Qué hace                                  |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga en vivo |
| `npm run build`   | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente el build de producción    |
| `npm run lint`    | Revisa el código con oxlint                |

## Variables de entorno

| Variable       | Ejemplo                 | Descripción                  |
| -------------- | ----------------------- | ---------------------------- |
| `VITE_API_URL` | `http://localhost:8000` | URL base de la API de Ovium  |

`.env` no se sube a git; `.env.example` sí. Después de cambiar `.env`, reinicia `npm run dev`.

## Estructura

```
src/
├── main.jsx            # Punto de entrada (BrowserRouter)
├── App.jsx             # Rutas: /login y /ranchos
├── api.js              # Cliente de la API (usa VITE_API_URL)
├── components/
│   ├── Layout.jsx      # Barra superior + contenido
│   ├── Tabla.jsx       # Tabla reutilizable
│   └── Formulario.jsx  # Formulario reutilizable
└── pages/
    ├── Login.jsx
    └── Ranchos.jsx
```

### Llamar a la API

```js
import api from './api'

// Comprobar que la API responde (sin autenticación)
await api.get('/health')

// Iniciar sesión: POST /auth/login con { username, password }
// y devuelve { access_token, ... }
const { access_token } = await api.post('/auth/login', { username, password })

// Las demás rutas piden el header Authorization: Bearer <access_token>
const ranchos = await api.get('/ranchos', {
  headers: { Authorization: `Bearer ${access_token}` },
})
```

Si la API responde con error, `api` lanza un `ApiError` con `status` y `data`.

### Probar la conexión con la API

En la página `/login` hay un botón **Probar conexión** que llama a `GET /health`
y muestra "Conectado a la API" o el error. Con la API corriendo y `VITE_API_URL`
bien configurado, ese es el primer paso para comprobar que todo funciona.

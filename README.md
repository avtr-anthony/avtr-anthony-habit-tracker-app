# Proyecto hábitos diarios

Aplicación web para llevar un seguimiento de hábitos diarios por usuario.

---

## Stack Tecnológico

- **Next.js (App Router) + React + TypeScript**
- **Tailwind CSS** para estilos
- **Prisma ORM** sobre **PostgreSQL (Supabase)**
- **Firebase Auth** para autenticación de usuarios
- **Firebase Hosting + Cloud Functions (Web Frameworks)** para deploy de la app Next (SSR + API Routes)
- **Docker** (Dockerfile + `docker-compose.yml`) para entorno local / pruebas

---

## Diagramas (docs)

- **Modelo base de datos (ERD)**  
   `erdV3.png` muestra las tablas `users` y `habitos` y su relación 1:N (un usuario tiene muchos hábitos).

---

![ERD](./docs/images/erdV3.png)

- **Diagrama de arquitectura**  
   `diagramaArquitecturaV3.png` muestra el flujo: Usuario → Proxy/Middleware → Páginas Next → Hooks/Servicios → API Routes → Prisma → Supabase, más Docker y GitHub Actions + Firebase Hosting para deploy.

---

![Diagrama de arquitectura](./docs/images/diagramaArquitecturaV3.png)

- **Diagrama de secuencia**

  `diagramaSecuencia.png` resume el flujo de login con Firebase Auth y la carga/gestión de hábitos a través de las APIs protegidas.

---

## ![Diagrama de secuencia](./docs/images/diagramaSecuenciaV2.png)

## Cómo ejecutar el proyecto

### 1. Requisitos

- Node.js 20+
- npm
- (Opcional) Docker y Docker Compose

### 2. Variables de entorno (resumen)

Crea un archivo `.env.local` (para desarrollo) con, al menos:

- Conexión a base de datos (Supabase / PostgreSQL):
  - `DIRECT_URL=postgresql://...`
- Firebase (cliente):
  - `NEXT_PUBLIC_FIREBASE_API_KEY=...`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID=...`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...`
  - `NEXT_PUBLIC_FIREBASE_APP_ID=...`
- Firebase Admin (servidor):
  - `FIREBASE_CLIENT_EMAIL=...`
  - `FIREBASE_PRIVATE_KEY=...`

> Nota: los nombres exactos se pueden ver en `src/lib/firebase.ts` y `src/lib/firebaseAdmin.ts`.

### 3. Desarrollo local (sin Docker)

```bash
npm install
npm run dev
```

La app quedará disponible normalmente en `http://localhost:3000`.

### 4. Ejecución con Docker

```bash
docker-compose up --build
```

Esto levanta un contenedor con la app en el puerto `3000` usando el `Dockerfile` y `.env.production`.

---

## Deploy con Firebase App Hosting

### 1. Producción (rama `main`)

- **Código fuente**: repositorio en GitHub.
- **Rama de producción**: `main`.
- Firebase App Hosting está conectado al repo y:
  - Clona la rama `main`.
  - Ejecuta `npm install` y `npm run build`.
  - Despliega la app Next (SSR + API Routes) en una URL de producción (`*.web.app` / `*.firebaseapp.com`).

### 2. Desarrollo / previews (rama `develop`)

- El desarrollo diario se hace en la rama `develop`.
- Cada `git push origin develop` puede crear un **preview deployment**:
  - App Hosting compila esa rama y expone una **URL temporal** para probar cambios.
  - Cuando todo está OK, se hace merge de `develop` → `main` y se actualiza producción.

---

## Flujo de autenticación y verificación de correo

1. **Registro (cliente)**
   - `useRegister` crea la cuenta con `firebase/auth`.
   - Se fuerza que el correo sea de dominios populares (`gmail.com`, `hotmail.com`, `outlook.com`, `live.com`, `yahoo.com`) y que la contraseña tenga mínimo 8 caracteres.
   - Tras crear el usuario se envía automáticamente el correo de verificación y se cierra la sesión local (`logoutUser`) para evitar que el usuario quede logueado sin confirmar.
   - Finalmente se redirige a `/login`.

2. **Verificación obligatoria**
   - `loginUser` llama a `signInWithEmailAndPassword`, pero antes de emitir la cookie revisa `user.emailVerified`.
   - Si no está verificado, reenvía el correo (`sendEmailVerification`), cierra la sesión y lanza el error `email-not-verified`.
   - `useLogin` captura ese error y muestra “Debes verificar tu correo antes de iniciar sesión…”.

3. **Cookies de sesión**
   - Cuando el correo ya está verificado, `loginUser` pide el `idToken` y lo guarda en la cookie `token`.
   - Ese token se usa en `requireNoAuth` y en todas las API Routes para validar al usuario mediante Firebase Admin (`auth.uid()`).

4. **Protecciones en la UI**
   - `LoginClient` y `RegisterClient` solo consideran “autenticado” a un usuario con `emailVerified`.
   - Si un usuario sin verificar navega atrás/adelante entre `/login` y `/register`, las pantallas se renderizan sin mostrar el loading infinito.

## APIs y flujo de datos

### Perfil (`/api/profile`)

| Método | Ruta                   | Descripción                              |
| ------ | ---------------------- | ---------------------------------------- |
| POST   | `/api/profile`         | Guarda `uid`, `email`, `username` en BD  |
| GET    | `/api/profile?uid=UID` | Devuelve el `username` asociado al `uid` |

### Hábitos (`/api/habitos`)

| Método | Ruta               | Descripción                               |
| ------ | ------------------ | ----------------------------------------- |
| GET    | `/api/habitos`     | Lista hábitos del usuario autenticado     |
| POST   | `/api/habitos`     | Crea un hábito (fecha + título + desc)    |
| PUT    | `/api/habitos/:id` | Actualiza campos (label, desc, completed) |
| DELETE | `/api/habitos/:id` | Elimina un hábito propio                  |

Todas las rutas anteriores verifican el token con **Firebase Admin** antes de invocar Prisma/Supabase.

## Policies RLS en Supabase

Con RLS activado en `public.users` y `public.habitos`, se aplican estas políticas (basadas en `auth.uid()`):

```sql
CREATE POLICY "insert own profile"
  ON public.users FOR INSERT
  WITH CHECK ((auth.uid())::uuid = uid);

CREATE POLICY "select own profile"
  ON public.users FOR SELECT
  USING ((auth.uid())::uuid = uid);

CREATE POLICY "update own profile"
  ON public.users FOR UPDATE
  USING ((auth.uid())::uuid = uid)
  WITH CHECK ((auth.uid())::uuid = uid);

CREATE POLICY "insert own habit"
  ON public.habitos FOR INSERT
  WITH CHECK ((auth.uid())::uuid = user_id);

CREATE POLICY "select own habits"
  ON public.habitos FOR SELECT
  USING ((auth.uid())::uuid = user_id);

CREATE POLICY "update own habits"
  ON public.habitos FOR UPDATE
  USING ((auth.uid())::uuid = user_id)
  WITH CHECK ((auth.uid())::uuid = user_id);

CREATE POLICY "delete own habits"
  ON public.habitos FOR DELETE
  USING ((auth.uid())::uuid = user_id);
```

## Resumen del flujo completo

1. El usuario se registra (`useRegister`) → se valida dominio/contraseña → se envía verificación y se cierra sesión.
2. Hace clic en el correo de verificación → vuelve a `/login`.
3. Inicia sesión (`useLogin`) → si el correo está verificado se genera cookie `token`.
4. `requireNoAuth` y `proxy.ts` usan Firebase Admin para decidir si envían al usuario a `/habitos` o al login.
5. Las API Routes (`/api/habitos`, `/api/profile`) validan la cookie y ejecutan Prisma.
6. Supabase aplica las policies RLS para que cada usuario solo lea/escriba sus filas.

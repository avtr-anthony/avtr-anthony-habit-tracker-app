# Proyecto hábitos diarios

## Descripción

Aplicación web enfocada en llevar un seguimiento sobre los hábitos diarios de cada persona, por usuario.

## Tecnologías

- Next.js
- Typsecript
- Tailwind CSS
- Firebase Auth / Hosting (deploy)
- Supabase (base de datos)

## Modelo base de datos (ERD)

![ERD](./docs/images/ERD_V1.png)

## Endpoints API

### Auth

| Método | Ruta               | Descripción            |
| ------ | ------------------ | ---------------------- |
| POST   | /api/auth/register | Registro nuevo usuario |
| POST   | /api/auth/login    | Inicio Sesión          |
| GET    | /api/auth/profile  | Obtiene perfil usuario |

### Hábitos

| Método | Ruta                        | Descripción                |               |
| ------ | --------------------------- | -------------------------- | ------------- |
| GET    | /api/habit                | Listar hábitos del usuario |               |
| GET    | /api/habits?date=2025-11-07 | Obtener habito por fecha   | // Se aplica? |
| POST   | /api/habits                 | Crear nuevo hábito         |               |
| PUT    | /api/habits/:id             | Actualizar hábito          |               |
| DELETE | /api/habits/:id             | Eliminar hábito            |               |

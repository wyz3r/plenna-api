# Plenna Challenge – Backend API (Node.js + Express + TypeScript + MongoDB)

Este proyecto es parte del **Code Challenge para Plenna**.  
Consiste en una API REST construida con **Node.js**, **Express 5**, **TypeScript** y **MongoDB**, usando **Mongoose** como ODM.

El objetivo del challenge es demostrar un diseño limpio, buenas prácticas, tipado estricto, validaciones, manejo de errores, pruebas unitarias y uso de scripts para inicialización y semillas de datos.

---

## 🚀 Características principales

- Express 5 + TypeScript  
- Validación con **Zod**  
- MongoDB + Mongoose  
- Manejo global de errores  
- Logger y middlewares personalizados  
- Seeds y scripts de inicialización  
- Docker para levantar el entorno completo  
- Testing con Jest + Supertest  
- Cobertura de código integrada  

---

# 📦 Requerimientos

- Node.js >= 20  
- Docker y Docker Compose  
- pnpm / npm / yarn (cualquiera que prefieras)

---

# 🐳 Levantar el proyecto con Docker

El proyecto incluye configuración para levantar **MongoDB y la API** usando Docker.

### 1. Construir imagen y levantar mongo db:

```bash
docker compose up 

```
# Ejecutar el proyecto localmente

1. Instalar dependencias

```bash
npm install
```

2. Crear archivo .env (por fines practicos es el mismo que el)
```bash
PORT=3000
MONGO_URI=localhost:27017
DB_USER=admin
DB_PASS=admin123
DB_NAME=clinic
```

3. Modo desarrollo
```bash
npm run dev
```

4. Modo producción
```bash
npm run build
npm start
```

# Scripts del proyecto

## Desarrollo

| Script          | Descripción                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Inicia servidor con ts-node-dev |
| `npm run build` | Compila TypeScript a `dist/`    |
| `npm start`     | Corre el servidor compilado     |

## Base de datos y seeds

| Script                     | Descripción                             |
| -------------------------- | --------------------------------------- |
| `npm run init:collections` | Crea las colecciones base en Mongo      |
| `npm run seed:basic`       | Inserta data mínima para pruebas        |
| `npm run seed:massive`     | Inserta data masiva para test de carga  |
| `npm run reset:db`         | Limpia y reinicia toda la base de datos |


## Lint & Formatting

| Script           | Descripción      |
| ---------------- | ---------------- |
| `npm run lint`   | Ejecuta ESLint   |
| `npm run format` | Ejecuta Prettier |

## Testing & Coverage

| Script                  | Descripción                    |
| ----------------------- | ------------------------------ |
| `npm test`              | Ejecuta pruebas unitarias      |
| `npm run test:coverage` | Muestra el coverage en consola |


# 🧪 Pruebas (Jest + Supertest)

Ejecutar pruebas:
```bash
npm test
```

Ver cobertura:

```bash
npm run test:coverage
```

% Stmts | % Branch | % Funcs | % Lines



Esto generará /coverage donde podrás ver:


# 📁 Estructura del proyecto
```bash
src/
 ├── modules/
 │   ├── patients/
 │   ├── consultations/
 │   ├── schedule/
 │   └── ...
 ├── dtos/
 ├── middleware/
 ├── utils/
 ├── scripts/          # init, seeds, reset
 ├── server.ts
 └── app.ts
```

## 📚 Endpoints de la API

### 🧑‍⚕️ Patients

| Método | Endpoint | Descripción | Body | Params | Status |
|--------|----------|-------------|-------|---------|--------|
| GET | `/patients` | Obtener todos los pacientes (solo los no eliminados `isDeleted: false`) | — | — | 200 |
| GET | `/patients/:id` | Obtener un paciente por ID | — | `id: string` (MongoId) | 200 / 404 |
| POST | `/patients` | Crear un nuevo paciente | `{ name, lastName, age, gender, phone?, email?, medicalProfile? }` | — | 201 |
| PATCH | `/patients/:id` | Actualizar parcialmente datos del paciente | Campos opcionales | `id: string` | 200 / 404 |
| DELETE | `/patients/:id` | Borrado lógico (`isDeleted: true`) | — | `id: string` | 200 / 404 |
| PATCH | `/patients/restore/:id` | Restaurar paciente borrado (`isDeleted: false`) | — | `id: string` | 200 / 404 |

---

### 📝 Consultations

| Método | Endpoint | Descripción | Body | Params | Status |
|--------|----------|-------------|-------|---------|--------|
| GET | `/consultations/history/:patientId` | Obtener historial de consultas de un paciente | — | `patientId: string` | 200 / 404 |
| POST | `/consultations` | Crear nueva consulta para un paciente | `{ patientId, reason, date?, symptoms?, diagnosis? }` | — | 201 |
| GET | `/consultations/:id` | Obtener una consulta por ID | — | `id: string` | 200 / 404 |

---

### 🗓️ Schedule (Unificación de horarios)

| Método | Endpoint | Descripción | Body | Query | Status |
|--------|----------|-------------|-------|---------|--------|
| GET | `/schedule` | Unificar todos los horarios disponibles | — | `?date=YYYY-MM-DD` opcional | 200 |

Ejemplo de query: /schedule?date=2024-12-01


---

### 💥 Errores globales

La API retorna errores con esta estructura:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [...]
}
```

Errores manejados:

| Error              | Código   | Motivo                |
| ------------------ | -------- | --------------------- |
| `NotFoundError`    | 404      | Recurso no encontrado |
| `ValidationError`  | 400      | Datos inválidos       |
| `DatabaseError`    | 500      | Fallos internos de DB |
| `AppError`         | variable | Error controlado      |
| Rutas inexistentes | 404      | `notFoundHandler`     |




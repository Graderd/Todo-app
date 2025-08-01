# 📝 Todo App

Una aplicación web simple de lista de tareas donde los usuarios pueden registrarse, iniciar sesión y gestionar sus tareas diarias (crear, marcar como completadas, editar y eliminar). Proyecto desarrollado con Node.js, Express, MongoDB, y JavaScript.

## 🚀 Características

- ✅ Autenticación de usuarios (registro e inicio de sesión)
- ✍️ Crear tareas con nombre y descripción
- ✏️ Editar tareas existentes
- 🗑️ Eliminar tareas
- 📌 Marcar tareas como completadas o incompletas
- 💾 Persistencia de datos con MongoDB
- 🧭 API RESTful

## 🛠️ Tecnologías utilizadas

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (autenticación)
- bcryptjs (encriptación de contraseñas)
- dotenv

**Frontend:**
- HTML, CSS, JavaScript
- Fetch API

## 📦 Instalación

1. Clona el repositorio:

git clone https://github.com/Graderd/Todo-app.git

2. Instala las dependencias del backend:

cd todo-backend
npm install

3. Crea un archivo .env en todo-backend con este contenido:

PORT=2808
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=una_clave_secreta

4. Inicia el servidor backend:

npm start

5. Abre el archivo index.html ubicado en la carpeta todo-frontend en tu navegador para usar la aplicación.

## 📄 Endpoints principales

| Método | Ruta               | Descripción                |
| ------ | ------------------ | -------------------------- |
| POST   | /api/auth/register | Registrar usuario          |
| POST   | /api/auth/login    | Iniciar sesión             |
| GET    | /tasks             | Obtener tareas del usuario |
| POST   | /tasks             | Crear nueva tarea          |
| PUT    | /tasks/\:id        | Actualizar tarea           |
| DELETE | /tasks/\:id        | Eliminar tarea             |

## 📧 Contacto

✍️ Autor: Starling Feliz de Jesús
🔗 [LinkedIn](https://www.linkedin.com/in/starling-feliz-de-jesus-a2022328a/)
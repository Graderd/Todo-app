# 📝 Todo App

Una aplicación web simple de lista de tareas donde los usuarios pueden registrarse, iniciar sesión y gestionar sus tareas diarias (crear, marcar como completadas, editar y eliminar). Proyecto desarrollado con **Node.js**, **Express**, **MongoDB** y **JavaScript Vanilla**.

## 🚀 Características

- ✅ Registro y login de usuarios con JWT
- ✉️ Verificación de correo electrónico tras registro
- 🔐 Hash de contraseñas con `bcryptjs`
- ✍️ Crear tareas con texto
- ✏️ Editar tareas (si no están completadas)
- 🗑️ Eliminar tareas
- ✅ Marcar tareas como completadas o incompletas
- 🔒 Rutas protegidas con middleware de autenticación
- 🧭 API RESTful con persistencia en MongoDB

## 🛠️ Tecnologías utilizadas

**Backend:**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) para autenticación
- `bcryptjs` para hasheo de contraseñas
- `nodemailer` para envío de correos
- `dotenv` para variables de entorno

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
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/taskManagerDB?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=contraseña_app_de_gmail
FRONTEND_URL=http://localhost:5173

🛑 Recuerda usar una contraseña de aplicación en Gmail, no tu contraseña real.

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

✅ Funcionalidad extra

🔒 El login solo es válido si el usuario ya ha verificado su correo.
⏱️ Expira el token en caso de sesión inválida.
📬 Enlace de verificación enviado al registrar.


## 📧 Contacto

✍️ Autor: Starling Feliz de Jesús
🔗 [LinkedIn](https://www.linkedin.com/in/starling-feliz-de-jesus-a2022328a/)
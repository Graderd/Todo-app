let tasks = [];

const taskList = document.getElementById("tasks");
const botonAdd = document.getElementById("add");
const taskInput = document.getElementById("taskInput");
const token = localStorage.getItem("token");

if(!token){
    alert("⚠️ Debes iniciar sesión para acceder a tus tareas.")
    window.location.href = ("login.html");
}

function showError(msg) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = msg;
    errorDiv.style.display = "block";
    setTimeout(() => errorDiv.style.display = "none", 3000);
}

function showSuccess(msg) {
    const successDiv = document.getElementById("success-message");
    successDiv.textContent = msg;
    successDiv.style.display = "block";
    setTimeout(() => successDiv.style.display = "none", 3000);
}

async function secureFetch(url, options = {}){
    const token = localStorage.getItem("token");

    if(!options.headers) options.headers = {};
    if(token) options.headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(url, options);

    if(response.status === 401){
        localStorage.removeItem("token");
        localStorage.removeItem("nombre");
        showError("Sesión expirada. Por favor, inicie sesión nuevamente.");

        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);

        return null;
    }
    return response;
}

async function fetchTasks(){
    taskList.innerHTML = "<li>Cargando tarea...</li>";

    try{
        const response = await secureFetch("http://localhost:2808/api/tasks", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if(!response) return;
        if(!response.ok) throw new Error("Error al obtener las tareas");

        tasks = await response.json();
    } catch (error) {
        console.error("Error al cargar las tareas:", error);
        showError("No se pudieron cargar las tareas. Intenta recargar.");
    }
}

function renderTasks() {
    taskList.innerHTML = "";

    if(tasks.length === 0){
        taskList.innerHTML = "<li>No hay tareas disponibles</li>";
        return;
    }

    tasks.forEach((task) => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}

//Crear
function createTaskElement(task) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completado;

    const label = document.createElement("label");
    label.textContent = task.texto;

    const editButton = document.createElement("button");
    editButton.textContent = "✏️";

    editButton.disabled = task.completado;
    editButton.title = task.completado ? "No puedes editar una tarea Completada" : "";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";

    //Evento para cambiar estado completado
    checkbox.addEventListener("change", async () => {
        console.log(`Actualizando tarea con ID: ${task._id}`)
        task.completado = checkbox.checked;
        try {
            await updateTaskOnServer(task);
            await fetchTasks();
            renderTasks();
        }catch (error) {
            console.error(error);
            showError("Error al actualizar la tarea.");
        }
    });

    //Evento para elimianr la tarea
    deleteButton.addEventListener("click", async () => {
        if (!task.completado) {
            const confirmacion = confirm("¿Estas Seguro de que deseas eliminar una tarea incompleta?");
            if(!confirmacion) return;
        }
        try {
            await deleteTaskFromServer(task._id);
            await fetchTasks();
            renderTasks();
        } catch (error) {
            console.error(error);
            showError("Error al elimianar la tarea.");
        }
    });

    li.append(checkbox, label, editButton, deleteButton);

    editButton.addEventListener("click", () => {
        const inputEdit = document.createElement("input");
        inputEdit.type = "text";
        inputEdit.value = task.texto;
        inputEdit.classList.add("task-edit-input");

        label.replaceWith(inputEdit);
        inputEdit.focus();

        inputEdit.addEventListener("blur", async () => {
            const nuevoTexto = inputEdit.value.trim();
            if (!nuevoTexto) {
                showError("El texto no puede estar vacio.");
                inputEdit.focus();
                return;
            }

            task.texto = nuevoTexto;
            try {
                await updateTaskOnServer(task);
                renderTasks();
            } catch(error) {
                console.error(error);
                showError("Error al actualizar la tarea.");
            }
        });

        inputEdit.addEventListener("keydown", (e) => {
            if (e.key === "Enter") inputEdit.blur();
            if (e.key === "Escape") renderTasks();
        });
    });
    return li;
}

//Agregar
async function addTaskToServer(task) {
    const response = await secureFetch("http://localhost:2808/api/tasks", {
        method: "POST",
        headers: {"Content-Type": "application/json"
        },
        body: JSON.stringify(task),
    });

    if(!response) return;
    if (!response.ok) throw new Error("Error al crear la tarea");
    return await response.json();
}

//Actualizar
async function updateTaskOnServer(task) {
    const response = await secureFetch(`http://localhost:2808/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
    },
        body: JSON.stringify(task),
    });

    if(!response) return;
    if (!response.ok) throw new Error("Error al actualizar la tarea");
    return await response.json();
}

//Eliminar
async function deleteTaskFromServer(_id) {
    const response = await secureFetch(`http://localhost:2808/api/tasks/${_id}`, {
        method: "DELETE",
    });

    if (!response) return;
    if (!response.ok) throw new Error("Error al eliminar la tarea");
    return await response.json();
}

//Agregar tarea desde el input
async function handleAddTask() {
    const texto = taskInput.value.trim();
    if (!texto) {
        showError("Por favor, ingrese una tarea valida.");
        return;
    }
    
    const newTask = {
        texto,
        completado: false,
    };

    try {
        const savedTask = await addTaskToServer(newTask);
        tasks.push(savedTask);
        renderTasks();
        taskInput.value = "";
    } catch (error) {
        console.error(error);
        showError("Error al agregar la tarea.")
    }
}

//Eventos en botones e input
function setupEventListeners(){
    botonAdd.addEventListener("click", handleAddTask);
    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTask();
        }
    });
}

//Boton de cierre de sesion
function setupLogoutButton(){
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("nombre");
            window.location.href = "login.html";
        });
    }
}

//Inicializacion de la aplicación
window.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    const nombre = localStorage.getItem("nombre");
    const usuarioNombreElemento = document.getElementById("usuarioNombre");
    const logoutBtn = document.getElementById("logout");

    if(usuarioNombreElemento && nombre){
        usuarioNombreElemento.textContent = `Hola, ${nombre}`;
    }

    if(logoutBtn){
        logoutBtn.style.display = "inline-block";
    }
    
    if(!token) {
        showError("Por favor, inicie sesion.");
        botonAdd.disabled = true;
        taskInput.disabled = true;
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
        return;
    }

    botonAdd.disabled = false;
    taskInput.disabled = false;

    await fetchTasks();
    renderTasks();
    setupEventListeners();
    setupLogoutButton();
});

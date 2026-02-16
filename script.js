// ejercicio 1
function ejecutarCallback() {
    const resultadoDiv = document.getElementById('resultado1');
    resultadoDiv.innerHTML = '<p class="loading">Procesando con callback...</p>';
    
    // operacion asincrona con setTimeout 
    setTimeout(function() {
        const mensaje = 'Callback ejecutado despues de 2 segundos: Hola desde el pasado!';
        resultadoDiv.innerHTML = `<p class="success">${mensaje}</p>`;
        console.log('Callback ejecutado:', mensaje);
    }, 2000);
}

//  Async/Await del setTimeout
function ejecutarAsyncAwait() {
    const resultadoDiv = document.getElementById('resultado1');
    resultadoDiv.innerHTML = '<p class="loading">Procesando con async/await...</p>';
    

    simulacionAsync();
}

// Funcion async que simula un setTimeout usando Promise y await
async function simulacionAsync() {
    try {
        const mensaje = await new Promise((resolve) => {
            setTimeout(() => {
                resolve('Async/Await ejecutado despues de 2 segundos: Hola desde el futuro!');
            }, 2000);
        });
        
        const resultadoDiv = document.getElementById('resultado1');
        resultadoDiv.innerHTML = `<p class="success">${mensaje}</p>`;
        console.log('Async/Await ejecutado:', mensaje);
    } catch (error) {
        console.error('Error:', error);
        const resultadoDiv = document.getElementById('resultado1');
        resultadoDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

// Ejercicio 2: Consulta a API con Async/Await
async function consultarAPI() {
    const resultadoDiv = document.getElementById('resultado2');
    resultadoDiv.innerHTML = '<p class="loading">Consultando API de usuarios...</p>';
    
    try {
        // Consultamos la API de JSONPlaceholder (API gratuita de prueba)
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!respuesta.ok) {
            throw new Error('Error en la consulta a la API');
        }
        
        // Convertimos la respuesta a JSON
        const usuarios = await respuesta.json();
        
        // Mostramos los primeros 3 usuarios en la pagina
        let htmlContent = '<h3>Usuarios obtenidos:</h3><ul class="user-list">';
        
        // Tomamos solo los primeros 3 usuarios para no saturar la pagina
        for (let i = 0; i < 3; i++) {
            const usuario = usuarios[i];
            htmlContent += `
                <li>
                    <strong>${usuario.name}</strong><br>
                    Email: ${usuario.email}<br>
                    Telefono: ${usuario.phone}
                </li>
            `;
        }
        
        htmlContent += '</ul>';
        htmlContent += '<p class="success">Datos cargados correctamente desde la API</p>';
        
        resultadoDiv.innerHTML = htmlContent;
        
        console.log('Usuarios obtenidos de la API:', usuarios.slice(0, 3));
        
    } catch (error) {
        console.error('Error en la API:', error);
        resultadoDiv.innerHTML = `<p class="error">Error al consultar la API: ${error.message}</p>`;
    }
}

// Funciones para limpiar los resultados
function limpiarResultado1() {
    document.getElementById('resultado1').innerHTML = '<p class="loading">Presiona un boton para ver el resultado...</p>';
}

function limpiarResultado2() {
    document.getElementById('resultado2').innerHTML = '<p class="loading">Presiona "Consultar API" para ver los datos...</p>';
}
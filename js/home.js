HomeTerminal = {
    
    start: function () {
        // CLIENT 
        const dataClient = clientesList.find(client => client.id == IndexTerminal.logged_client);

        //PAGE HOME
        var getParentElement = document.getElementById('terminal');
        getParentElement.innerHTML = '';

        const createLogin = document.createElement('main');
        createLogin.classList.add('container');
        createLogin.innerHTML = `
                <div id="homeContainer" class="container">
                    <h1>Bienvenido ${dataClient.nombre}</h1>
                </div>
            `;
        getParentElement.appendChild(createLogin);

        
        
    }

}
LoginTerminal = {

    login: function () {
        var getParentElement = document.getElementById('terminal');
        getParentElement.innerHTML = '';

        const createLogin = document.createElement('main')
        createLogin.classList.add('container') 
        createLogin.innerHTML = `
                    <div class="row">
                        <div class="col-8 offset-2">
                            <h1>Ingresa tu NIP</h1>
                            <form>                    
                                <div class="row">
                                    <div class="col-6 offset-3">
                                        <div class="input-group input-group-lg">
                                            <input type="password" id="nipInput" maxlength="4" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 offset-3 p-1" id="nipAlert">
                                    <div class="alert alert-warning" role="alert">
                                        Nip incorrecto
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
            `
        getParentElement.appendChild(createLogin)

        
        var nipInput = document.getElementById('nipInput');
        var nipAlert = document.getElementById('nipAlert');
        nipAlert.style.display = 'none';
        nipInput.addEventListener('change', (e) => {
            this.validarNIP();
        })
        
        nipInput.addEventListener('click', (e) => {
            nipAlert.style.display = 'none';
        })
        nipInput.addEventListener('keyup', (e) => {
            let nipInput = document.getElementById('nipInput');
            let largo = nipInput.value;
            if(largo.length == 4) this.validarNIP();
        })
    },
    validarNIP: function(){
        let nipAlert = document.getElementById('nipAlert');
        nipAlert.style.display = 'none';
        //usuariosLogueadosList.pop();
        IndexTerminal.logged_client = 0;
        item = clientesList.find(client => client.nip == nipInput.value);
        console.log("usuario: " + JSON.stringify(item));
        if(item != undefined){
            //usuariosLogueadosList.push(item);
            IndexTerminal.logged_client = item.id;
			localStorage.setItem('user_logged', item.id);
            nipAlert.style.display = 'none';

            HomeTerminal.start();
            HeaderTerminal.create();
        }
        nipAlert.style.display = 'block';
    }

}

RetiroTerminal = {
    
    start: function () {

        //PAGE RETIRO
        var getParentElement = document.getElementById('terminal');
        getParentElement.innerHTML = '';

        const createLogin = document.createElement('main');
        createLogin.classList.add('container');
        createLogin.innerHTML = `
                <div id="retiroContainer" class="container">
                    <h1>Retiro</h1>
                    <div class="row justify-content-around align-items-center">
                        <div class="col-12">
                            <a href="#" id="ingresarBtn" class="btn btn-lg btn-secondary fw-bold border-white bg-white m-4">$5</a>
                            <a href="#" id="ingresarBtn" class="btn btn-lg btn-secondary fw-bold border-white bg-white m-4">$10</a>
                            <a href="#" id="ingresarBtn" class="btn btn-lg btn-secondary fw-bold border-white bg-white m-4">$20</a>
                        </div>
                        <div class="col-12">
                            <a href="#" id="ingresarBtn" class="btn btn-lg btn-secondary fw-bold border-white bg-white m-4">$50</a>
                            <a href="#" id="ingresarBtn" class="btn btn-lg btn-secondary fw-bold border-white bg-white m-4">$100</a>
                            <a href="#" id="ingresarBtn" class="btn btn-lg btn-secondary fw-bold border-white bg-white m-4">$200</a>
                        </div>
                        <div class="col-12">
                            <a href="#" id="ingresarBtn" class="btn btn-lg btn-secondary fw-bold border-white bg-white m-4">Otra cantidad</a>
                        </div>
                        <div class="col-12" id="retiroAlertSaldo">   
                            <div class="alert alert-warning p-1" id="ingresoAlertSaldo" role="alert">
                                No es posible retirar, su saldo no debe se menor a $10 pesos.
                            </div>
                        </div>      
                    </div>
                </div>
            `;
        getParentElement.appendChild(createLogin);

        retiroAlertSaldo.style.display = 'none';
        const opcRetiro = document.querySelectorAll(".btn");
        console.log("Opciones: " + JSON.stringify(opcRetiro));
        if(opcRetiro != undefined){
            opcRetiro.forEach(function(opcBtn, index) {
                let importe = opcBtn.innerHTML;
                opcBtn.addEventListener('click', function(e) {
                    if(importe == "Otra cantidad"){
                        RetiroTerminal.otherQuantity();
                    }
                    else{
                        importe = parseInt(importe.replace("$", ""));
                        let saldoFuturo = SaldoTerminal.saldoActual() - importe;
                        // console.log("Saldo futuro: " + saldoFuturo);
                        if(saldoFuturo >= 10){
                            const fecha = SaldoTerminal.obtenerFechaActual();
                            let retiro = {
                                user_id: IndexTerminal.logged_client,
                                fecha: fecha,
                                importe: importe,
                                tipo_movto:  'retiro'
                            };
                            if(movimientosList.push(retiro)){
                                let item = clientesList.find(client => client.id == IndexTerminal.logged_client);
                                item.saldo -= importe;
                                RetiroTerminal.successEntry(importe);
                            } //else RetiroTerminal.errorEntry();    
                        }  else retiroAlertSaldo.style.display = 'block';
                    }
                });
            });
        }  
    },
    successEntry: function (entry) {
        // SALDO
        let saldoCliente = SaldoTerminal.saldoActual();

        //PAGE HOME
        var getParentElement = document.getElementById('terminal');
        getParentElement.innerHTML = '';

        const createElement = document.createElement('main');
        createElement.classList.add('container');
        createElement.innerHTML = `
                <div id="retiroContainer" class="container"> 
                    <div class="row">
                        <div class="col-8 offset-2">
                            <table class="table table-dark">
                                <thead>
                                    <tr>
                                    <th colspan="2" scope="col"><h1>Retiro</h1></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row"><div class="text-left">Saldo anterior:</div></th>
                                        <th scope="row"><div class="text-right">$${saldoCliente + entry}</div></th>
                                    </tr>
                                    <tr>
                                        <th scope="row"><div class="text-left">Monto retirado:</div></th>
                                        <th scope="row"><div class="text-right">$${entry}</div></th>
                                    </tr>
                                    <tr>
                                        <th scope="row"><div class="text-left">Saldo actual:</div></th>
                                        <th scope="row"><div class="text-right">$${saldoCliente}</div></th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            `;
        getParentElement.appendChild(createElement);
        
    },
    otherQuantity: function () {

        //PAGE HOME
        var getParentElement = document.getElementById('terminal');
        getParentElement.innerHTML = '';

        const createElement = document.createElement('main');
        createElement.classList.add('container');
        createElement.innerHTML = `
                <div id="retiroContainer" class="container">
                    <h1>Retiro</h1>
                    <h3>Monto a retirar:</h3>           
                    <div class="row">
                        <div class="col-4 offset-4">
                            <div class="input-group input-group-lg">
                                <input type="text" id="retirarInput" maxlength="3" class="form-control">
                            </div>                            
                            <div class="alert alert-warning p-1" id="retirarAlert" role="alert">
                                Cantidad invalida, debe ser mayor o igual a 10 y menor que 990.
                            </div>                             
                            <div class="alert alert-warning p-1" id="retirarAlertResiduo" role="alert">
                                Cantidad invalida, solo puede retirar cantidades multiplos de 5.
                            </div>                  
                            <div class="alert alert-warning p-1" id="retirarAlertSaldo" role="alert">
                                No es posible retirar esta cantidad, su saldo mínimo debe ser de $10 pesos.
                            </div>
                            <div class="input-group input-group-lg p-1 justify-content-center ">
                                <a href="#" id="retirarBtn" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Retirar</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        getParentElement.appendChild(createElement);
        
        var retirarAlert = document.getElementById('retirarAlert');
        retirarAlert.style.display = 'none';
        
        var retirarAlertResiduo = document.getElementById('retirarAlertResiduo');
        retirarAlertResiduo.style.display = 'none';
        
        var retirarAlertSaldo = document.getElementById('retirarAlertSaldo');
        retirarAlertSaldo.style.display = 'none';

        let retirarBtn = document.getElementById("retirarBtn");
        let retirarInput = document.getElementById("retirarInput");
        retirarBtn.addEventListener('click', function(e) {
            let importe = parseInt(retirarInput.value);
            if(importe >= 1 && importe <= 990){
                let saldoFuturo = SaldoTerminal.saldoActual() - importe;
                console.log("Saldo futuro: " + saldoFuturo);
                if(saldoFuturo >= 10){
                    if(importe%5 == 0){
                        const fecha = SaldoTerminal.obtenerFechaActual();
                        let retiro = {
                            user_id: IndexTerminal.logged_client,
                            fecha: fecha,
                            importe: importe,
                            tipo_movto:  'retiro'
                        };
                        if(movimientosList.push(retiro)){
                            let item = clientesList.find(client => client.id == IndexTerminal.logged_client);
                            item.saldo += parseInt(importe);
                            RetiroTerminal.successEntry(importe);
                        } //else RetiroTerminal.errorEntry();    
                        console.log("Retiro: " + JSON.stringify(movimientosList));
                    }  else retirarAlertResiduo.style.display = 'block';
                }  else retirarAlertSaldo.style.display = 'block';
            }  else retirarAlert.style.display = 'block';
        });
        
        retirarInput.addEventListener('input', function(e) {
	        if(e.shiftKey) e.preventDefault();
	        let old_input = retirarInput.value;
	        retirarInput.value = old_input.replace(/[^0-9]/g,'');
		    //if(input.value.length >= 4) e.preventDefault();
        });
        retirarInput.addEventListener('click', (e) => {
            retirarAlert.style.display = 'none';
            retirarAlertSaldo.style.display = 'none';
            retirarAlertResiduo.style.display = 'none';
            retirarInput.value = "";
        })
    },

}
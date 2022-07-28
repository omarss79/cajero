IngresoTerminal = {
    
    start: function () {

        //PAGE HOME
        var getParentElement = document.getElementById('terminal');
        getParentElement.innerHTML = '';

        const createElement = document.createElement('main');
        createElement.classList.add('container');
        createElement.innerHTML = `
                <div id="ingresoContainer" class="container">
                    <h1>Ingreso</h1>
                    <h3>Monto a ingresar:</h3>           
                    <div class="row">
                        <div class="col-4 offset-4">
                            <div class="input-group input-group-lg">
                                <input type="text" id="ingresarInput" maxlength="3" class="form-control">
                            </div>                            
                            <div class="alert alert-warning p-1" id="ingresoAlert" role="alert">
                                Cantidad invalida, debe ser mayor o igual a 10 y menor que 990.
                            </div>                                   
                            <div class="alert alert-warning p-1" id="ingresoAlertResiduo" role="alert">
                                Cantidad invalida, solo puede retirar cantidades multiplos de 5.
                            </div>            
                            <div class="alert alert-warning p-1" id="ingresoAlertSaldo" role="alert">
                                No es posible ingresar esta cantidad, su saldo no debe exceder $990 pesos.
                            </div>
                            <div class="input-group input-group-lg p-1 justify-content-center">
                                <a href="#" id="ingresarBtn" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Ingresar</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        getParentElement.appendChild(createElement);
        
        var ingresoAlert = document.getElementById('ingresoAlert');
        ingresoAlert.style.display = 'none';
        
        var ingresoAlertResiduo = document.getElementById('ingresoAlertResiduo');
        ingresoAlertResiduo.style.display = 'none';
        
        var ingresoAlertSaldo = document.getElementById('ingresoAlertSaldo');
        ingresoAlertSaldo.style.display = 'none';

        let ingresarBtn = document.getElementById("ingresarBtn");
        let ingresarInput = document.getElementById("ingresarInput");
        ingresarBtn.addEventListener('click', function(e) {
            let importe = parseInt(ingresarInput.value);
            if(importe >= 1 && importe <= 990){
                let saldoFuturo = SaldoTerminal.saldoActual() + parseInt(importe);
                // console.log("Saldo futuro: " + saldoFuturo);
                if(saldoFuturo <= 990){
                    if(importe%5 == 0){
                        const fecha = SaldoTerminal.obtenerFechaActual();
                        let ingreso = {
                            user_id: IndexTerminal.logged_client,
                            fecha: fecha,
                            importe: importe,
                            tipo_movto:  'ingreso'
                        };
                        if(movimientosList.push(ingreso)){
                            let item = clientesList.find(client => client.id == IndexTerminal.logged_client);
                            item.saldo += parseInt(importe);
                            IngresoTerminal.successEntry(importe);
                        } else IngresoTerminal.errorEntry();    
                        // console.log("Ingreso: " + JSON.stringify(movimientosList));
                    }  else ingresoAlertResiduo.style.display = 'block';
                }  else ingresoAlertSaldo.style.display = 'block';
            }  else ingresoAlert.style.display = 'block';
        });
        
        ingresarInput.addEventListener('input', function(e) {
	        if(e.shiftKey) e.preventDefault();
	        let old_input = ingresarInput.value;
	        ingresarInput.value = old_input.replace(/[^0-9]/g,'');
		    //if(input.value.length >= 4) e.preventDefault();
        });
        ingresarInput.addEventListener('click', (e) => {
            ingresoAlert.style.display = 'none';
            ingresoAlertResiduo.style.display = 'none';
            ingresoAlertSaldo.style.display = 'none';
            ingresarInput.value = "";
        })
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
                <div id="ingresoContainer" class="container"> 
                    <div class="row">
                        <div class="col-8 offset-2">
                            <table class="table table-dark">
                                <thead>
                                    <tr>
                                    <th colspan="2" scope="col"><h1>Ingreso</h1></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row"><div class="text-left">Saldo anterior:</div></th>
                                        <th scope="row"><div class="text-right">$${saldoCliente - entry}</div></th>
                                    </tr>
                                    <tr>
                                        <th scope="row"><div class="text-left">Monto a ingresado:</div></th>
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

}
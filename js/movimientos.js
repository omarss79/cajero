MovimientosTerminal = {
    
    start: function () {

        //PAGE HOME
        var getParentElement = document.getElementById('terminal');
        getParentElement.innerHTML = '';

        let listadoMovtos = "";
        let saldo = 0;
        let saldo_actual = parseInt(SaldoTerminal.saldoActual());
        const dataClient = clientesList.find(client => client.id == IndexTerminal.logged_client);
        const movtosClient = movimientosList.filter(movto => movto.user_id == IndexTerminal.logged_client);
        if(movtosClient != undefined){ 
            let fecha = "";
            // let abono = "";
            // let saldo_actual = SaldoTerminal.saldoActual();

            let saldo_anterior = dataClient.saldo_anterior;
            saldo = saldo + saldo_anterior;
            listadoMovtos = listadoMovtos + `
                <tr>
                    <th scope="row"><div class="text-right">${dataClient.fecha_ultimo_corte}</div></th>
                    <th scope="row"><div class="text-right">Saldo anterior:</div></th>
                    <th scope="row"><div class="text-right">$${saldo_anterior}</div></th>
                </tr>                
            `;

            console.log("Movimiento saldo anterior: " + saldo);
            for (i=0; i < movtosClient.length; i++) {
                console.log("Movimiento importe: " + movtosClient[i].importe);
                if(movtosClient[i].tipo_movto == "ingreso"){
                    abono = "";
                    saldo = saldo + parseInt(movtosClient[i].importe);
                } 
                else {
                    abono = "-";
                    saldo = saldo - parseInt(movtosClient[i].importe);
                } 
                console.log("Movimiento suma: " + saldo);
                listadoMovtos = listadoMovtos + `
                    <tr>
                        <th scope="row"><div class="text-right">${movtosClient[i].fecha}</div></th>
                        <th scope="row"><div class="text-right">${movtosClient[i].tipo_movto}</div></th>
                        <th scope="row"><div class="text-right">${abono}$${movtosClient[i].importe}</div></th>
                    </tr>                
                `;
            }
            console.log("Movimiento saldo actual: " + saldo);
            
        } 
        else {
            listadoMovtos = `
                    <tr>
                        <th colspan="3" scope="row"><div class="text-left">No hay movimientos</div></th>
                    </tr>                
                `;
        }
        let diferencia = "";
        if(saldo != saldo_actual) diferencia = "*";
        

        const createMovtos = document.createElement('main');
        createMovtos.classList.add('container');
        const templateMovtos = `
                <div id="movContainer" class="container">
                    <h1>Movimientos</h1>
                    
                    <div class="row">
                        <div class="col-lg-8 offset-lg-2 col-sm-12">
                            <table class="table table-dark">
                                <thead>
                                    <tr>
                                        <th colspan="3" scope="col">Cuenta: ${dataClient.cuenta}</th>
                                    </tr>
                                </thead>
                                <thead>
                                    <tr>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Movimiento</th>
                                        <th scope="col">Importe</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${listadoMovtos}
                                </tbody>
                                <thead>
                                    <tr>
                                        <th colspan="2" scope="col">${diferencia}Saldo actual:</th>
                                        <th scope="col">$${saldo}</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            `;

        
        createMovtos.innerHTML = templateMovtos;
        getParentElement.appendChild(createMovtos);

        
        
    }

}
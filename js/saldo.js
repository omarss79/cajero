SaldoTerminal = {
    
    start: function () {

        let cliente_saldo = SaldoTerminal.saldoActual();        
        const dataClient = clientesList.find(client => client.id == IndexTerminal.logged_client);

        //PAGE SALDO
        var getParentElement = document.getElementById('terminal');
        getParentElement.innerHTML = '';

        const createLogin = document.createElement('main');
        createLogin.classList.add('container');
        createLogin.innerHTML = `
                <div id="saldoContainer" class="container">
                    <h1>Saldo</h1>
                    <h4>Cuenta: ${dataClient.cuenta}</h4>
                    <br>
                    <h3>Saldo actual: $${cliente_saldo}</3>
                </div>
            `;
        getParentElement.appendChild(createLogin);
        
        
    },

    // calculateSaldo: function (client_id){
    //     let item = clientesList.find(client => client.id == client_id);
    //     return item.saldo;
    // },
    
    saldoActual: function(){
        
        const dataClient = clientesList.find(client => client.id == IndexTerminal.logged_client);
        const movtosClient = movimientosList.filter(movto => movto.user_id == IndexTerminal.logged_client);

        let saldoActual = dataClient.saldo_anterior;
        console.log("Movimientos: " + JSON.stringify(movtosClient));
        if(movtosClient != undefined){
            let importe = 0;
            for (i=0; i < movtosClient.length; i++) {
                importe = parseInt(movtosClient[i].importe);
                if(movtosClient[i].tipo_movto == "ingreso") saldoActual = saldoActual + importe;
                else saldoActual = saldoActual - importe;
                
            }
        }
        
        return saldoActual;
    },

    obtenerFechaActual(){
        n =  new Date();
        //Año
        y = n.getFullYear();
        //Mes
        m = n.getMonth() + 1;
        //Día
        d = n.getDate();

        return d + "/" + m + "/" + y;
    }


}
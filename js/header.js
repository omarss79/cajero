HeaderTerminal = {
    
    create: function () {

        //MENU
        var getHeaderElement = document.getElementById('headerTerminal');
        getHeaderElement.innerHTML = '';

        const createHeader = document.createElement('div');
        createHeader.innerHTML = `
                    <h3 class="float-md-start mb-0"><img src="assets/img/Logo_de_BanCoppel.svg.png" width="120"></h3>
                    <nav id="navTerminal" class="nav nav-masthead justify-content-center float-md-end">
                        <a class="nav-link active" id="homeTerminal" aria-current="page" href="#">Home</a>
                        <a class="nav-link" id="ingresoTerminal" href="#">Ingresar</a>
                        <a class="nav-link" id="retiroTerminal" href="#">Retiro</a>
                        <a class="nav-link" id="saldoTerminal" href="#">Saldo</a>
                        <a class="nav-link" id="movTerminal" href="#">Movimientos</a>
                        <a class="nav-link" id="exitTerminal" href="#">Salir</a>
                    </nav>
            `;
        getHeaderElement.appendChild(createHeader);

        var getExitElement = document.getElementById('exitTerminal');
        getExitElement.addEventListener('click', (e) => {
            this.clean();
            this.exitTerminal();
            LoginTerminal.login();
        });
        
        var getMovElement = document.getElementById('movTerminal');
        getMovElement.addEventListener('click', (e) => {
            MovimientosTerminal.start();
            this.cleanClassNav();
            this.addClassNav(getMovElement);
        });
        
        var getSaldoElement = document.getElementById('saldoTerminal');
        getSaldoElement.addEventListener('click', (e) => {
            SaldoTerminal.start();
            this.cleanClassNav();
            this.addClassNav(getSaldoElement);
        });
        
        var getRetiroElement = document.getElementById('retiroTerminal');
        getRetiroElement.addEventListener('click', (e) => {
            RetiroTerminal.start();
            this.cleanClassNav();
            this.addClassNav(getRetiroElement);
        });
        
        var getIngresoElement = document.getElementById('ingresoTerminal');
        getIngresoElement.addEventListener('click', (e) => {
            IngresoTerminal.start();
            this.cleanClassNav();
            this.addClassNav(getIngresoElement);
        });
        
        var getHomeElement = document.getElementById('homeTerminal');
        getHomeElement.addEventListener('click', (e) => {
            HomeTerminal.start();
            this.cleanClassNav();
            this.addClassNav(getHomeElement);
        });

    },

    clean: function () {

        //MENU
        var getHeaderElement = document.getElementById('headerTerminal');
        getHeaderElement.innerHTML = '';

        const createHeader = document.createElement('div');
        createHeader.innerHTML = `
                <h3 class="float-md-start mb-0"><img src="assets/img/Logo_de_BanCoppel.svg.png" width="120"></h3>
            `;
        getHeaderElement.appendChild(createHeader);
    },

    exitTerminal: function (){
        IndexTerminal.logged_client = 0;
        localStorage.removeItem("user_logged");
    },

    cleanClassNav: function () {
        arreglo = document.querySelectorAll('.nav-link');

        if(arreglo.length > 0){
            arreglo.forEach(element => {
                element.classList.remove("active");
            });
        }
    },

    addClassNav: function (getNavElement) {
        getNavElement.classList.add("active");
    }


}
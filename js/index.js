IndexTerminal = {
    logged_client: 0,

    start: function (){
        const _userId = localStorage.getItem("user_logged");
        if(_userId > 0){
            // IndexTerminal.funcion1();
            // IndexTerminal.funcion2();

            IndexTerminal.logged_client = _userId;
            HomeTerminal.start();
            HeaderTerminal.create();
        }
        else {
            LoginTerminal.login();
        }
    },

    // getIndexBar: function(){

    //     IndexTerminal.progressBar();

    //     var progreso = 0;
    //     var idIterval = setInterval(function(){
    //     // Aumento en 10 el progeso
    //     progreso +=10;
    //     document.getElementById("bar").style.width = progreso + '%';

            
    //     //Si llegó a 100 elimino el interval
    //     if(progreso == 100){
    //         clearInterval(idIterval);
    //     }
    //     },300);

        
    //     // const _userId = localStorage.getItem("user_logged");
    //     // IndexTerminal.logged_client = _userId;
    //     // HomeTerminal.start();
    //     // HeaderTerminal.create();


    // },
    // progressBar: function(){
    //     var getParentElement = document.getElementById('terminal');
    //     getParentElement.innerHTML = '';

    //     const createIndex = document.createElement('main');
    //     createIndex.classList.add('container');
    //     createIndex.innerHTML = `
    //         <div class="progress">
    //             <div id="bar" class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    //         </div>
    //     `;
    //     getParentElement.appendChild(createIndex);
    // },

    // funcion1: function(_callback){
    //     IndexTerminal.getIndexBar();
    //     // _callback();
    //     const _userId = localStorage.getItem("user_logged");
    //     IndexTerminal.logged_client = _userId;
    //     HomeTerminal.start();
    //     HeaderTerminal.create();
    // },
    
    // funcion2: function(){
    //     IndexTerminal.progressBar();
    //     IndexTerminal.funcion1(()=>{
    //         console.log("Termino bar")

    //         // const _userId = localStorage.getItem("user_logged");
    //         // IndexTerminal.logged_client = _userId;
    //         // HomeTerminal.start();
    //         // HeaderTerminal.create();

    //     });
    // },


}


IndexTerminal.start();




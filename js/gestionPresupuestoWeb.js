import * as gestion from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){

    let id = document.getElementById(idElemento);
    let resultado = id.textContent = valor;

    return resultado;    
}

function mostrarGastoWeb(idElemento, gasto){

    let id = document.getElementById(idElemento);    
   
    //Primero creo los elementos.
    let divPrincipal = document.createElement("div");
    divPrincipal.classList.add("gasto");

    let gastoDescripcion = document.createElement("div");
    gastoDescripcion.classList.add("gasto-descripcion");
    gastoDescripcion.textContent = `${gasto.descripcion}`;

    let gastoFecha = document.createElement("div");
    gastoFecha.classList.add("gasto-fecha");
    gastoFecha.textContent = `${new Date(gasto.fecha).toLocaleDateString()}`;

    let gastoValor = document.createElement("div");
    gastoValor.classList.add("gasto-valor");
    gastoValor.textContent = `${gasto.valor}`;

    let contenedorEtiquetas = document.createElement("div");
    contenedorEtiquetas.classList.add("gasto-etiquetas");    

    let arrayEtiquetas = gasto.etiquetas;
    for(let unaEtiqueta of arrayEtiquetas){
        let etiqueta = document.createElement("span");
        etiqueta.classList.add("gasto-etiquetas-etiqueta");
        etiqueta.textContent = `${unaEtiqueta}`;
        contenedorEtiquetas.append(etiqueta);
    }    
        
    //Añado los elementos al documento HTML        
    divPrincipal.append(gastoDescripcion);
    divPrincipal.append(gastoFecha);
    divPrincipal.append(gastoValor); 
    divPrincipal.append(contenedorEtiquetas);
    id.append(divPrincipal);    

}   

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    let id = document.getElementById(idElemento);   
    let nombrePeriodo = "";

    if(periodo === "dia")
        nombrePeriodo = "día";

    else if(periodo === "anyo")
        nombrePeriodo = "año";

    else
        nombrePeriodo = "mes";


    let divPrincipal = document.createElement("div");
    divPrincipal.classList.add("agrupacion");

    let encabezadoH1 = document.createElement("h1");
    encabezadoH1.textContent = `Gastos agrupados por ${nombrePeriodo}`;
    divPrincipal.append(encabezadoH1);

    let arrayAgrupacion = agrup;
    for(let [key, value] of Object.entries(arrayAgrupacion)){
        let agrupacionDato = document.createElement("div");
        agrupacionDato.classList.add("agrupacion-dato");
        
        let agrupacionDatoClave = document.createElement("span");
        agrupacionDatoClave.classList.add("agrupacion-dato-clave");
        agrupacionDatoClave.textContent = `${key} : `;

        let agrupacionDatoValor = document.createElement("span");
        agrupacionDatoValor.classList.add("agrupacion-dato-valor");
        agrupacionDatoValor.textContent = `${value}`;

        agrupacionDato.append(agrupacionDatoClave);
        agrupacionDato.append(agrupacionDatoValor);
        divPrincipal.append(agrupacionDato);
    }   

    id.append(divPrincipal);

}

function repintar(){

    mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());

    mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());

    mostrarDatoEnId("balance-total", gestion.calcularBalance());

    let listadoGastos = document.getElementById("listado-gastos-completo");
    listadoGastos.innerHTML = "";

    for(let gasto of gestion.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb(){
    let nuevoPresupuesto = prompt("Introduzca un presupuesto: ");   
    gestion.actualizarPresupuesto(Number(nuevoPresupuesto));
    repintar();
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let nuevaDescripcion = prompt("Introduzca una descripción: ");

    let nuevoValor = prompt("Introduzca un valor: ");
    nuevoValor = Number(nuevoValor);

    let nuevaFecha = prompt("Introduzca una fecha: ");  

    let nuevasEtiquetas = prompt("Introduzca las etiquetas (ejemplo: etiqueta1,etiqueta2,etiqueta3): ");
    let arrayEtiquetas = nuevasEtiquetas.split(',');
    let nuevoArrayEtiquetas = [];
    for(let etiqueta of arrayEtiquetas){
        nuevoArrayEtiquetas.push(etiqueta);
    }

    let nuevoGasto = gestion.CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, ...nuevoArrayEtiquetas);
    gestion.anyadirGasto(nuevoGasto);

    repintar();     
}

let botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle(){
    
        this.handleEvent = function(){
            let editarDescripcion = prompt("Descripción: ", `${this.gasto.descripcion}`);

            let editarValor = prompt("Valor: ", `${this.gasto.valor}`);
            editarValor = Number(editarValor);

            let editarFecha = prompt("Fecha: ", `${new Date(this.gasto.fecha).toISOString()}`);

            let editarEtiquetas = prompt("Etiquetas (ejemplo: etiqueta1,etiqueta2,etiqueta3):", `${this.gasto.etiquetas.join(',')}`);      
            let arrayEtiquetas = editarEtiquetas.split(',');  
            let nuevoArrayEtiquetas = [];
            for(let etiqueta of arrayEtiquetas){
                nuevoArrayEtiquetas.push(etiqueta);
            }
            
            this.gasto.actualizarDescripcion(editarDescripcion);
            this.gasto.actualizarValor(editarValor);
            this.gasto.actualizarFecha(editarFecha);
            this.gasto.anyadirEtiquetas(...nuevoArrayEtiquetas);

            repintar();            
        }
}

function BorrarHandle(){

    this.handleEvent = function(){
        gestion.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle(){

    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}




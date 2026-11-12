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
        //evento borrar etiqueta
        let manejadorBorrarEtiquetas = new BorrarEtiquetasHandle();
        manejadorBorrarEtiquetas.gasto = gasto;
        manejadorBorrarEtiquetas.etiqueta = unaEtiqueta;
        etiqueta.addEventListener("click", manejadorBorrarEtiquetas);

        contenedorEtiquetas.append(etiqueta);
    }    

    //botón editar
    let botonEditar = document.createElement("button");
    botonEditar.classList.add("gasto-editar");
    botonEditar.setAttribute("type", "button");
    botonEditar.textContent = "Editar";
    //evento botón editar
    let manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = gasto;
    botonEditar.addEventListener("click", manejadorEditar);

    //botón borrar
    let botonBorrar = document.createElement("button");
    botonBorrar.classList.add("gasto-borrar");
    botonBorrar.setAttribute("type", "button");
    botonBorrar.textContent = "Borrar";
    //evento botón borrar
    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", manejadorBorrar);

    //botón editar formulario
    let botonEditarForm = document.createElement("button");
    botonEditarForm.classList.add("gasto-editar-formulario");
    botonEditarForm.setAttribute("type", "button");
    botonEditarForm.textContent = "Editar (formulario)";
    //evento botón editar formulario
    let manejadorEditarForm = new EditarHandleFormulario();
    manejadorEditarForm.gasto = gasto;
    botonEditarForm.addEventListener("click", manejadorEditarForm);

        
    //Añado los elementos al documento HTML        
    divPrincipal.append(gastoDescripcion);
    divPrincipal.append(gastoFecha);
    divPrincipal.append(gastoValor); 
    divPrincipal.append(contenedorEtiquetas);
    divPrincipal.append(botonEditar);
    divPrincipal.append(botonBorrar);
    divPrincipal.append(botonEditarForm);
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
    for(let prop in arrayAgrupacion){
        let agrupacionDato = document.createElement("div");
        agrupacionDato.classList.add("agrupacion-dato");
        
        let agrupacionDatoClave = document.createElement("span");
        agrupacionDatoClave.classList.add("agrupacion-dato-clave");
        agrupacionDatoClave.textContent = `${prop} : `;

        let agrupacionDatoValor = document.createElement("span");
        agrupacionDatoValor.classList.add("agrupacion-dato-valor");
        agrupacionDatoValor.textContent = `${arrayAgrupacion[prop]}`;

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

    let nuevoGasto = new gestion.CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, ...nuevoArrayEtiquetas);
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

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");
    let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");   

    function enviarFormulario(event){
        event.preventDefault();

        let form = event.currentTarget;
        let descripcion = form.elements.descripcion.value;
        let valor = form.elements.valor.value;
        let fecha = form.elements.fecha.value;
        let etiquetas = form.elements.etiquetas.value;
        let arrayEtiquetas = etiquetas.split(",");

        let nuevoGasto = new gestion.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);
        gestion.anyadirGasto(nuevoGasto);

        repintar();

        botonAnyadirGastoFormulario.removeAttribute("disabled");        
    }  

    formulario.addEventListener("submit", enviarFormulario);

}


function cancelarFormulario(){
    this.handleEvent = function(event){
        this.formulario.remove();            
        this.boton.removeAttribute("disabled");
    }
}

let manejadorCancelar = new cancelarFormulario();
manejadorCancelar.formulario = formulario;
manejadorCancelar.boton = botonAnyadirGastoFormulario;

let botonCancelar = formulario.querySelector("button.cancelar");
botonCancelar.addEventListener("click", manejadorCancelar);
botonAnyadirGastoFormulario.setAttribute("disabled", "true");

let divControles = document.getElementById("controlesprincipales");
divControles.append(plantillaFormulario);

function EditarHandleFormulario(){       

    this.handleEvent = function(event){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");
        
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().slice(0, 10);
        let arrayEtiquetas = this.gasto.etiquetas.join(",");
        formulario.elements.etiquetas.value = arrayEtiquetas;     

        let divControles = document.getElementById("controlesprincipales");
        divControles.append(plantillaFormulario);

        let botonEditarFormulario = event.currentTarget;
        botonEditarFormulario.setAttribute("disabled", "true");

    }
}

        

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    nuevoGastoWebFormulario
}




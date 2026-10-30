import { createElement } from "react";


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
    gastoFecha.textContent = `${gasto.fecha}`;

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




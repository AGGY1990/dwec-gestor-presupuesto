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
        agrupacionDatoClave.textContent = `${key}`;

        let agrupacionDatoValor = document.createElement("span");
        agrupacionDatoValor.classList.add("agrupacion-dato-valor");
        agrupacionDatoValor.textContent = `${value}`;

        agrupacionDato.append(agrupacionDatoClave);
        agrupacionDato.append(agrupacionDatoValor);
        divPrincipal.append(agrupacionDato);
    }   

    id.append(divPrincipal);

}



<div class="agrupacion">
  <!-- PERIODO será "mes", "día" o "año" en función de si el parámetro
       de la función es "mes", "dia" o "anyo" respectivamente -->
  <h1>Gastos agrupados por PERIODO</h1>

  <!-- Se deberá crear un div.agrupacion-dato para cada propiedad del objeto agrup:
       https://es.javascript.info/keys-values-entries#object-keys-values-entries -->
  <div class="agrupacion-dato">
    <span class="agrupacion-dato-clave">NOMBRE_PROPIEDAD_OBJETO_AGRUP</span>
    <span class="agrupacion-dato-valor">VALOR_PROPIEDAD_OBJETO_AGRUP</span>
  </div>

  <div class="agrupacion-dato">
    <span class="agrupacion-dato-clave">NOMBRE_PROPIEDAD_OBJETO_AGRUP</span>
    <span class="agrupacion-dato-valor">VALOR_PROPIEDAD_OBJETO_AGRUP</span>
  </div>

  <!-- Etcétera -->

</div>




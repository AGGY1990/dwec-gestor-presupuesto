
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

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}




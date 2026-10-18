//VARIABLES GLOBALES
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


function actualizarPresupuesto(nuevoPresupuesto){
    if(typeof nuevoPresupuesto === "number" && nuevoPresupuesto >= 0){

        presupuesto = nuevoPresupuesto;

        return presupuesto;
    }

    else{

        console.log(`Error. El presupuesto debe ser un número no negativo.`);

        return -1;
    }
}

function mostrarPresupuesto(){

    return `Tu presupuesto actual es de ${presupuesto} €`;
}




function CrearGasto(descripcion, valor, fecha, ...etiquetas){
    //***valor***//
    if(typeof valor === "number" && valor >= 0){

        this.valor = valor;       
    }

    else{

        this.valor = 0;
    }     


    //***Descripción***//
    this.descripcion = descripcion;  
   

    //***Fecha***
    if(typeof fecha === "string" && !Number.isNaN(Date.parse(fecha))){      

        this.fecha = Date.parse(fecha);        
    }

    else{
        this.fecha = Date.now();
    }

    
    //***Etiquetas***//   
    this.etiquetas = [];          


    //***Métodos***/
    this.mostrarGasto = function (){

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function (nuevaDescripcion){

        this.descripcion = nuevaDescripcion;            
    }

    this.actualizarValor = function (nuevoValor){
        if(typeof nuevoValor === "number" && nuevoValor >= 0){

            this.valor = nuevoValor;            
        }          
    }

    this.mostrarGastoCompleto = function(){     
        let textoEtiquetas = "";   

        for(let etiqueta of this.etiquetas){

            textoEtiquetas += `- ${etiqueta}\n`
        }

        let texto =
`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:
${textoEtiquetas}`;        

        return texto;       
    }

    this.actualizarFecha = function (nuevaFecha){
        if(typeof nuevaFecha === "string" && !Number.isNaN(Date.parse(nuevaFecha))){

            this.fecha = Date.parse(nuevaFecha);
        }
    }

    this.anyadirEtiquetas = function(...nuevasEtiquetas){       
        for(let etiqueta of nuevasEtiquetas){

            if(!this.etiquetas.includes(etiqueta)){

                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.borrarEtiquetas = function(...etiquetasBorrar){
        for(let etiqueta of etiquetasBorrar){        

            let posicion = this.etiquetas.indexOf(etiqueta);

            if(posicion !== -1){

                this.etiquetas.splice(posicion, 1);
            }
                
        }
    }        

    this.anyadirEtiquetas(...etiquetas);
}
  


function listarGastos(){
    return gastos;
}

function anyadirGasto(nuevoGasto){
    nuevoGasto.id = idGasto;
    idGasto ++;
    gastos.push(nuevoGasto);
}

function borrarGasto(id){    

}

function calcularTotalGastos(){
   
}

function calcularBalance(){
   
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}

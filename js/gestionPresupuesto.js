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

    this.obtenerPeriodoAgrupacion = function(periodo){
        let fecha = new Date(this.fecha);
        let resultado;

        let anyo = fecha.getFullYear().toString();
        let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
        let dia = fecha.getDate().toString().padStart(2, "0");

        if(periodo === "mes")
            resultado = `${anyo}-${mes}`;

        else if(periodo === "anyo")
            resultado = `${anyo}`;

        else if(periodo === "dia")
            resultado = `${anyo}-${mes}-${dia}`;

        return resultado;
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
    for(let gasto of gastos){

        if(gasto.id === id){

            let posicion = gastos.indexOf(gasto);        
            gastos.splice(posicion, 1);        
            break;
        }
   }
}

function calcularTotalGastos(){
   let total = 0;

    for(let gasto of gastos){

        total += gasto.valor;
   }

   return total;
}

function calcularBalance(){    
   return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtros){
    return gastos.filter(gasto => {        

        if(filtros.fechaDesde !== undefined && Date.parse(filtros.fechaDesde) > gasto.fecha)
            return false;

        if(filtros.fechaHasta !== undefined && Date.parse(filtros.fechaHasta) < gasto.fecha)
            return false;

        if(filtros.valorMinimo !== undefined && filtros.valorMinimo > gasto.valor)
            return false;

        if(filtros.valorMaximo !== undefined && filtros.valorMaximo < gasto.valor)
            return false;

        if(filtros.descripcionContiene !== undefined && !gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase()))
            return false;

        if(filtros.etiquetasTiene != undefined){
            let filtroEtiquetasMinusculas = filtros.etiquetasTiene.map(function(etiqueta){
                return etiqueta.toLowerCase();
            });

            let etiquetasMinusculas = gasto.etiquetas.map(function(etiqueta){
                return etiqueta.toLowerCase();
            });

            let encontrado = false;

            for(let filtroEtiqueta of filtroEtiquetasMinusculas){

                for(let etiqueta of etiquetasMinusculas){
                    
                    if(etiqueta === filtroEtiqueta)
                    encontrado = true;      
                }                            
            }
            

            if(!encontrado)
                return false;
        }                              

        return true;
    });
}

function agruparGastos(periodo="mes", etiquetas, fechaDesde, fechaHasta){
    
    let filtro = {
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta,       
    }      

    if(etiquetas !== undefined && etiquetas.length > 0)
        filtro.etiquetasTiene = etiquetas;  
        
    if(fechaHasta !== undefined && typeof fechaHasta === "string" && !Number.isNaN(Date.parse(fechaHasta)))
        filtro.fechaHasta = fechaHasta;

    else{
        fechaHasta = new Date();       

        let anyo = fechaHasta.getFullYear().toString();
        let mes = (fechaHasta.getMonth() + 1).toString().padStart(2, "0");
        let dia = fechaHasta.getDate().toString().padStart(2, "0");

        let fechaActual = `${anyo}-${mes}-${dia}`;
        filtro.fechaHasta = fechaActual;
    }      
    
    let gastosFiltrados = filtrarGastos(filtro); 


    let resultado = gastosFiltrados.reduce(function(acc, gasto){      

        let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);               
        
        acc[periodoAgrupacion] = (acc[periodoAgrupacion] || 0) + gasto.valor;
 
        return acc

    },{});      

    return resultado;

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
    calcularBalance,
    filtrarGastos,
    agruparGastos    
}

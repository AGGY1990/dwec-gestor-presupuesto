import * as gestion from "./gestionPresupuesto.js";
import * as gestionWeb from "./gestionPresupuestoWeb.js";

gestion.actualizarPresupuesto(1500);

let mostrarPresupuesto = gestion.mostrarPresupuesto();
gestionWeb.mostrarDatoEnId("presupuesto", mostrarPresupuesto);

let gasto1 = new gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestion.anyadirGasto(gasto1);
gestion.anyadirGasto(gasto2);
gestion.anyadirGasto(gasto3);
gestion.anyadirGasto(gasto4);
gestion.anyadirGasto(gasto5);
gestion.anyadirGasto(gasto6);

let gastosTotales = gestion.calcularTotalGastos();
gestionWeb.mostrarDatoEnId("gastos-totales", gastosTotales);

let balanceTotal = gestion.calcularBalance();
gestionWeb.mostrarDatoEnId("balance-total", balanceTotal);

let listadoGastos = gestion.listarGastos();
for(let gasto of listadoGastos){
    gestionWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}

let objeto1 = {
    fechaDesde : "2021-09-01",
    fechaHasta : "2021-09-30"
}
let listadoGastoFiltrado1 = gestion.filtrarGastos(objeto1);
for(let gasto of listadoGastoFiltrado1){
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}


let objeto2 = {
    valorMinimo : 50
}
let listadoGastoFiltrado2 = gestion.filtrarGastos(objeto2)
for(let gasto of listadoGastoFiltrado2){
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}


let objeto3 = {
    valorMinimo : 200,
    etiquetasTiene : ["seguros"]
}
let listadoGastoFiltrado3 = gestion.filtrarGastos(objeto3);
for(let gasto of listadoGastoFiltrado3){
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}


let objeto4 = {
    valorMaximo : 50,
    etiquetasTiene : ["comida", "transporte"]
}
let listadoGastoFiltrado4 = gestion.filtrarGastos(objeto4);
for(let gasto of listadoGastoFiltrado4){
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

let agrupacionDia = gestion.agruparGastos("dia");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupacionDia, "dia");

let agrupacionMes = gestion.agruparGastos("mes");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupacionMes, "mes");

let agrupacionAnyo = gestion.agruparGastos("anyo");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupacionAnyo, "anyo");











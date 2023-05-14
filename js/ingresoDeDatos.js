// Declaracion de primer indice del Array.
const tipoEnergia = new Array();

// Declaracion del segundo indice del Array.
for ( let i = 0 ; i < tipoEnergia.length ; i++ ) {
    tipoEnergia[i] = { tipo: "", descripcion: "", energia: "", presupuesto: "", tiempo: "", efectividad: "" };
}


// Toma de datos desde los inputs y armado de tabla.
function tomarDatos() {
    if ( document.getElementById("iDescripcion").value != "" && document.getElementById("iEnergiaGenerada").value != "" && document.getElementById("iPresupuesto").value != "" && document.getElementById("iTiempoEstimado").value != "" ) {
        tipoEnergia.push({tipo: document.getElementById("iTipoDeEnergia").value,
                        descripcion: document.getElementById("iDescripcion").value,
                        energia: document.getElementById("iEnergiaGenerada").value,
                        presupuesto: document.getElementById("iPresupuesto").value,
                        tiempo: document.getElementById("iTiempoEstimado").value});

        document.getElementById("tBodyDatos").innerHTML = "";

        for ( var i = 0 ; i < tipoEnergia.length ; i++ ) {
            document.getElementById("tBodyDatos").innerHTML += "<tr><td>" + tipoEnergia[i].tipo + "</td><td>" + tipoEnergia[i].descripcion + "</td><td>" + tipoEnergia[i].energia + "</td><td>" + tipoEnergia[i].presupuesto + "</td><td>" + tipoEnergia[i].tiempo + "</td></tr>";
        }

        document.getElementById("iDescripcion").value = "";
        document.getElementById("iEnergiaGenerada").value = "";
        document.getElementById("iPresupuesto").value = "";
        document.getElementById("iTiempoEstimado").value = "";

    } else {
        alert ("Por favor, complete todos los campos para añadir la implementación.");
    }
}


// Muestreo de datos en pantalla.
function procesarDatos() {
    var efectividadesEnergias = calcularEfectividad(tipoEnergia);

    // Muestra en parrafo, bajo la tabla, la efectividad de cada energia ingresada.
    document.getElementById("pEfectividad").innerHTML = "";

    for ( var i = 0 ; i < tipoEnergia.length ; i++ ) {
        document.getElementById("pEfectividad").innerHTML += "Descripción: " + efectividadesEnergias[i].descripcion + " | Efectividad: " + efectividadesEnergias[i].efectividad + "<br>" ;
    }

    // Muestra en parrafo, bajo las efectividades, la energia recomendada.
    document.getElementById("pRecomendada").innerHTML = "";

    for ( var i = 0 ; i < tipoEnergia.length ; i++ ) {
        if (efectividadesEnergias[i].energiaRecomendada == "SI") {
            document.getElementById("pRecomendada").innerHTML += 'La implementación "' + efectividadesEnergias[i].descripcion + '" es la más recomendada, con una efectividad de ' + efectividadesEnergias[i].efectividad + '.';
        }
    }
}


// Etapa 3:

function calcularEfectividad(pArrayDatosTabla) {

    // Array local para guardar efectividades segun tipo de energia, y un atributo para guardar cual es la energia mas recomendada (mayor efectividad).
    var efectividades = new Array();
    for ( var i = 0 ; i < tipoEnergia.length ; i++) {
        efectividades[i] = {descripcion: "", efectividad: "", energiaRecomendada: ""};
    }

    // Iteracion para recorrer todos las energias que ingresaron por parametro a la funcion y tomar los datos de cada una para calcular la efectividad.
    for ( var i = 0 ; i < tipoEnergia.length ; i++ ) {
        efectividades[i].descripcion = pArrayDatosTabla[i].descripcion;
        efectividades[i].efectividad = pArrayDatosTabla[i].energia / (pArrayDatosTabla[i].presupuesto * pArrayDatosTabla[i].tiempo);
    }

    // Se ordenan los objetos de "efectividades[]" segun su efectividad, y a la ultima (la de mayor efectividad) se le indica que es la recomendada.
    efectividades.sort((a, b) => a.efectividad - b.efectividad);
    efectividades[efectividades.length - 1].energiaRecomendada = "SI";

    return efectividades;
}
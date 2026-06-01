
var unidades = {
    longitud: ["milímetro", "centímetro", "metro", "kilómetro"],
    peso: ["gramo", "kilogramo", "libra", "onza"],
    temperatura: ["Celsius", "Fahrenheit", "Kelvin"]
};


function actualizarUnidades() {
    var tipo = document.getElementById("tipoConversion").value;
    var selectOrigen = document.getElementById("unidadOrigen");
    var selectDestino = document.getElementById("unidadDestino");

    selectOrigen.innerHTML = "";
    selectDestino.innerHTML = "";

    if (tipo === "") {
        selectOrigen.innerHTML = "<option>Seleccione tipo</option>";
        selectDestino.innerHTML = "<option>Seleccione tipo</option>";
        return;
    }

    var lista = unidades[tipo];
    for (var i = 0; i < lista.length; i++) {
        var opcion1 = document.createElement("option");
        opcion1.value = lista[i];
        opcion1.text = lista[i];
        selectOrigen.appendChild(opcion1);

        var opcion2 = document.createElement("option");
        opcion2.value = lista[i];
        opcion2.text = lista[i];
        selectDestino.appendChild(opcion2);
    }
}

function calcular() {
    var valor = parseFloat(document.getElementById("valorEntrada").value);
    var origen = document.getElementById("unidadOrigen").value;
    var destino = document.getElementById("unidadDestino").value;
    var tipo = document.getElementById("tipoConversion").value;
    var resultado = document.getElementById("resultado");
    var historial = document.getElementById("historial");

    if (tipo === "") {
        resultado.value = "Seleccione un tipo de conversión";
        historial.textContent = "";
        return;
    }
    if (isNaN(valor)) {
        resultado.value = "Ingrese un valor numérico válido";
        historial.textContent = "";
        return;
    }
    if (origen === destino) {
        resultado.value = valor + " " + origen + " = " + valor + " " + destino;
        historial.textContent = "Misma unidad — sin conversión necesaria";
        animarResultado();
        return;
    }

    var res = convertir(valor, origen, destino, tipo);

    if (res === null) {
        resultado.value = "Conversión no disponible";
        historial.textContent = "";
    } else {
        resultado.value = valor + " " + origen + " = " + res.toFixed(4) + " " + destino;
        historial.textContent = "✔ Convirtiendo: " + valor + " " + origen + " → " + destino;
        animarResultado();
    }
}


function animarResultado() {
    var resultado = document.getElementById("resultado");
    resultado.classList.remove("resultado-animado");
    void resultado.offsetWidth;
    resultado.classList.add("resultado-animado");
}


function limpiar() {
    document.getElementById("tipoConversion").value = "";
    document.getElementById("unidadOrigen").innerHTML = "<option>Seleccione tipo</option>";
    document.getElementById("unidadDestino").innerHTML = "<option>Seleccione tipo</option>";
    document.getElementById("valorEntrada").value = "";
    document.getElementById("resultado").value = "";
    document.getElementById("historial").textContent = "";
}

function convertir(valor, origen, destino, tipo) {

    if (tipo === "longitud") {
        var enMetros = {
            "milímetro": 0.001,
            "centímetro": 0.01,
            "metro": 1,
            "kilómetro": 1000
        };
        return valor * enMetros[origen] / enMetros[destino];
    }

    if (tipo === "peso") {
        var enGramos = {
            "gramo": 1,
            "kilogramo": 1000,
            "libra": 453.592,
            "onza": 28.3495
        };
        return valor * enGramos[origen] / enGramos[destino];
    }

    if (tipo === "temperatura") {
        var enCelsius;

        if (origen === "Celsius") {
            enCelsius = valor;
        } else if (origen === "Fahrenheit") {
            enCelsius = (valor - 32) * 5 / 9;
        } else if (origen === "Kelvin") {
            enCelsius = valor - 273.15;
        }

        if (destino === "Celsius") {
            return enCelsius;
        } else if (destino === "Fahrenheit") {
            return enCelsius * 9 / 5 + 32;
        } else if (destino === "Kelvin") {
            return enCelsius + 273.15;
        }
    }

    return null;
}

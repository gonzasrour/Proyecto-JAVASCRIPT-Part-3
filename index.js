const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const bontonIngresar = document.getElementById("ingresar");
const divInicial = document.getElementById("divInicial");
const divSaludar = document.getElementById("divSaludar");
const divInv = document.getElementById("divInv");
const divResultado = document.getElementById("divResultado");

const riesgo = [
  {
    tipo: "bajo",
    tasa: 0.5,
  },
  {
    tipo: "medio",
    tasa: 0.8,
  },
  {
    tipo: "alto",
    tasa: 1.5,
  },
];

class Banco {
  constructor(nombre) {
    this.nombre = nombre;
    this.rendimiento = Math.ceil(Math.random() * 20);
  }
}
const bancos = [];
bancos.push(new Banco("Banco Galicia"));
bancos.push(new Banco("Itau"));
bancos.push(new Banco("Supervill"));
bancos.push(new Banco("BBVV Frances"));
console.log(bancos);

bontonIngresar.onclick = () => {
  if (inputNombre.value || inputApellido.value) {
    const usuario = {
      nombre: inputNombre.value,
      apellido: inputApellido.value,
    };
    localStorage.setItem("infoUsuario", JSON.stringify(usuario));

    divInicial.remove();

    const saludarTitulo = document.createElement("h2");
    saludarTitulo.innerText = `Bienvenido ${usuario.nombre} ${usuario.apellido}, estas listo para invertir?`;
    divSaludar.append(saludarTitulo);

    crearInversionDiv();

    const botonCalcular = document.getElementById("botonCalcular");
    botonCalcular.onclick = () => {
      const montoAInvertir = document.getElementById("inputMonto").value;
      const riegosEscogido = document.getElementById("selectRiesgo").value;
      console.log(montoAInvertir, riegosEscogido);
      const tasaRiesgoEscogido = riesgo.find(
        (riesgo) => riesgo.tipo === riegosEscogido
      ).tasa;
      console.log(tasaRiesgoEscogido);

      bancos.forEach((banco) => {
        const rendimientoConRiesgo = banco.rendimiento * tasaRiesgoEscogido;
        const utilidad = montoAInvertir * rendimientoConRiesgo;
        const parrafoBanco = document.createElement("p");
        parrafoBanco.innerText = `El banco ${banco.nombre} te ofrece un rendimiento anuela de ${rendimientoConRiesgo}% lo que te generaria unas utilidades de ${utilidad}`;
        divResultado.append(parrafoBanco);
      });
    };
  }
};

function crearInversionDiv() {
  const inputMonto = document.createElement("input");
  inputMonto.setAttribute("type", "number");
  inputMonto.setAttribute("id", "inputMonto");

  const parrafo = document.createElement("p");
  parrafo.innerText =
    "coloca el monto a invertir y el tipo de riesgo que quiere asumir";

  const select = document.createElement("select");
  select.setAttribute("id", "selectRiesgo");

  riesgo.forEach((riesgo) => {
    const optionRiego = document.createElement("option");
    optionRiego.innerText = `${riesgo.tipo}`;
    select.append(optionRiego);
  });

  const botonCalcular = document.createElement("button");
  botonCalcular.setAttribute("id", "botonCalcular");
  botonCalcular.innerText = "CALCULAR";

  divInv.append(parrafo, inputMonto, select, botonCalcular);
}

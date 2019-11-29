const fs = require("fs");
const path = require("path");

// Función para "girar" las combinaciones
const girar = (lista, n) => {
  // si n realiza más de una vuelta completa, se soluciona toma el residuo
  n = n % lista.length;
  return [...lista.slice(n, lista.length), ...lista.slice(0, n)];
};

// Función para recorrer el árbol de búsqueda
const combina = (input, rama = "") => {
  if (input[0] === "0") {
    return rama;
  }
  if (rama.length > 10) return 0; // N no puede ser mayor que 10, por ello tampoco los movimientos.
  const giroIzq = combina(girar(input, parseInt(input[0]) * -1), `${rama}1`);
  const giroDer = combina(girar(input, parseInt(input[0])), `${rama}2`);

  //Se va eligiendo la rama de menor longitud, o se devuelve cero
  if (giroDer && giroIzq)
    return giroDer.length < giroIzq.length ? giroDer : giroIzq;
  if (giroDer) return giroDer;
  if (giroIzq) return giroIzq;
  return 0;
};

async function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}
//Función para escribir el archivo destino
async function writeFile(path) {}

//Función principal
const main = async () => {
  try {
    data = await readFile(path.join(__dirname, "ccf.ent"));
  } catch (error) {
    console.log("Error al leer el archivo", error);
    return;
  }
  let data_array = data.toLocaleString().split("");
  console.log(data_array);
  const movs = combina(data_array, "")
    .replace(/1/g, "0")
    .replace(/2/g, "1");
  // En la función se utilizan 1 y 2 los giros, para facilitar comparaciones.
  // Al final se convierten a 0 y 1

  console.log(movs);
};

main();

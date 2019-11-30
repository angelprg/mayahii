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
  if (rama.length > 10) return 0; // N no puede ser mayor que 10, entonces ese el máximo de movimientos.
  const giroIzq = combina(girar(input, parseInt(input[0]) * -1), `${rama}2`);
  const giroDer = combina(girar(input, parseInt(input[0])), `${rama}1`);

  //Se va eligiendo la rama de menor longitud, o se devuelve cero
  if (giroDer && giroIzq)
    return giroDer.length < giroIzq.length ? giroDer : giroIzq;
  if (giroDer) return giroDer;
  if (giroIzq) return giroIzq;
  return 0;
};

async function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}
//Función para escribir el archivo destino
async function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) reject(err);
      resolve();
    });
  });
}

//Función principal
const main = async () => {
  try {
    data = await readFile(path.join(__dirname, "ccf.ent"));
  } catch (error) {
    return;
  }
  let data_array = data.toLocaleString().split("");
  const movs = combina(data_array, "")
    .replace(/1/g, "0")
    .replace(/2/g, "1");
  // En la función se utilizan 1 y 2 para los giros, para facilitar comparaciones.
  // Al final se convierten a 0 y 1 como se requiere
  try {
    await writeFile(
      path.join(__dirname, "ccf.sal"),
      `${movs.length}\r\n${movs}`
    );
  } catch (error) {
    return;
  }
};

main();

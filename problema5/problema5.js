input = `10
3 1 4 1 5 9 2 6 5 4`;
const [n, datosStr] = [input.split("\n")[0], input.split("\n")[1].split(" ")];
datos = datosStr.map(num => parseInt(num));
let cambios = 1;
let ida = 0;
let v = 0;
let t = 0;
while (cambios) {
  cambios = 0;
  t += 1;
  for (let i = 0; i < n; i++) {
    if (t % 2 ? datos[i] > datos[i + 1] : datos[i] < datos[i + 1]) {
      cambios += 1;
      if (t == 1) ida += 1;
      if (t == 2) v += 1;
      let tmp = datos[i];
      datos[i] = datos[i + 1];
      datos[i + 1] = tmp;
    }
  }
  datos.reverse();
}
console.log(ida, v, t - 1);

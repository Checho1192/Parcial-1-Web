url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
function getData(url) {
  return fetch(url).then((response) => response.json());
}

var clicks = 0;
function createTarjeta(nombre, descripcion, precio, imagen) {
  let col = document.createElement("col");
  let card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";
  let img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = imagen;
  img.alt = "#";
  let divCardBody = document.createElement("div");
  divCardBody.classList.add("card-body");
  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerHTML = nombre;
  let cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.innerHTML = descripcion;
  let cardPrice = document.createElement("h6");
  cardPrice.classList.add("card-text");
  cardPrice.innerHTML = precio;
  let cardBoton = document.createElement("a");
  cardBoton.setAttribute("href", "#");
  cardBoton.classList.add("btn");
  cardBoton.classList.add("btn-primary");
  cardBoton.setAttribute("onClick", "onClickCounter()");
  cardBoton.innerHTML = "Agregar al Carrito";
  divCardBody.appendChild(cardTitle);
  divCardBody.appendChild(cardText);
  divCardBody.appendChild(cardPrice);
  divCardBody.appendChild(cardPrice);
  divCardBody.appendChild(cardBoton);
  card.appendChild(img);
  card.appendChild(divCardBody);
  col.appendChild(card);
  return col;
}

function onClickCounter() {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
}

function createTarjetas(eleccion) {
  getData(url).then((data) => {
    let divTarjetas = document.getElementById("tarjetas");
    tarjetas.innerHTML = "";
    data[eleccion].products.forEach((producto) => {
      let tarjetaCreada = createTarjeta(
        producto.name,
        producto.description,
        producto.price,
        producto.image
      );
      divTarjetas.appendChild(tarjetaCreada);
    });
    array.forEach((element) => {});
  });
}

let btn1 = document.getElementById("boton1");
let btn2 = document.getElementById("boton2");
let btn3 = document.getElementById("boton3");
let btn4 = document.getElementById("boton4");
let btn5 = document.getElementById("boton5");

btn1.addEventListener("click", function (event) {
  event.preventDefault();
  createTarjetas(0);
});
btn2.addEventListener("click", function (event) {
  event.preventDefault();
  createTarjetas(1);
});
btn3.addEventListener("click", function (event) {
  event.preventDefault();
  createTarjetas(2);
});
btn4.addEventListener("click", function (event) {
  event.preventDefault();
  createTarjetas(3);
});
btn5.addEventListener("click", function (event) {
  event.preventDefault();
  createTarjetas(4);
});

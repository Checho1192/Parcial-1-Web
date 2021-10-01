let url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let numeroDeProductos = 0;
let numeroProductosCarrito = document.getElementById("textoItems");

fetch(url)
  .then((res) => res.json())
  .then((dataJson) => {
    let carritoDeCompras = [];
    let boton1 = document.getElementById("boton1");
    let boton2 = document.getElementById("boton2");
    let boton3 = document.getElementById("boton3");
    let boton4 = document.getElementById("boton4");
    let boton5 = document.getElementById("boton5");
    let cartasProductos = document.getElementById("cartasProductos");
    let botones = [boton1, boton2, boton3, boton3, boton4, boton5];
    let tablaDeProductos = document.getElementById("tablaDeProductos");
    let infoProductosTotal = document.getElementById("infoProductosTotal");
    let tablaDesplegada = false;
    document.getElementById("itemsCarro").addEventListener("click", function () {
      tablaDeProductos.innerHTML = "";
      infoProductosTotal.innerHTML = "";
      cartasProductos.innerHTML = "";
      let tituloCategoria = document.getElementById("tituloCategoria");
      tituloCategoria.textContent = "Order detail";
      let tablaACrearProductos = document.createElement("table");
      tablaACrearProductos.className = "table table-striped";
      if (tablaDesplegada == false) {
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");
        let columnasTabla = [
          "Item",
          "Qty.",
          "Description",
          "Unit Price",
          "Amount",
          "Modify",
        ];
        for (let i = 0; i < columnasTabla.length; i++) {
          let th = document.createElement("th");
          th.textContent = columnasTabla[i];
          th.scope = "col";
          tr.appendChild(th);
        }
        thead.appendChild(tr);
        tablaACrearProductos.appendChild(thead);
        tablaDesplegada = true;
      }
      let tbody = document.createElement("tbody");
      let calculoTotalCarrito;
      let indice = 0;
      let total = 0;
      carritoDeCompras.forEach((element) => {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.scope = "col";
        th.textContent = indice;
        let tdCantidad = document.createElement("td");
        tdCantidad.textContent = element.quantity;
        let tdescripcion = document.createElement("td");
        tdescripcion.textContent = element.food;
        let tdPrecio = document.createElement("td");
        tdPrecio.textContent = element.unitPrice;
        let tdAmount = document.createElement("td");
        tdAmount.textContent = element.amount;
        let tdButtons = document.createElement("td");
        let buttomAdd = document.createElement("a");
        buttomAdd.className = "btn btn-dark btn-row";
        buttomAdd.textContent = "+";
        buttomAdd.addEventListener("click", function () {
          tdCantidad.textContent = ++element.quantity;
          tdAmount.textContent = element.quantity * element.unitPrice;
          element.amount = element.quantity * element.unitPrice;
          let nuevoCalculo = 0;
          carritoDeCompras.forEach(producto => {
            nuevoCalculo += producto.amount;
          });
          calculoTotalCarrito.textContent = "Total $" + Number((nuevoCalculo).toFixed(4));
        });
        let buttomLess = document.createElement("a");
        buttomLess.className = "btn btn-dark btn-row";
        buttomLess.textContent = "-";
        buttomLess.addEventListener("click", function () {
          tdCantidad.textContent = --element.quantity;
          if (tdCantidad.textContent !== 0) {
            tdAmount.textContent = element.quantity * element.unitPrice;
            element.amount = element.quantity * element.unitPrice;
            let nuevoCalculo = 0;
            carritoDeCompras.forEach(producto => {
              nuevoCalculo -= producto.amount;
            });
            calculoTotalCarrito.textContent = "Total $" + Number((nuevoCalculo).toFixed(4));
          }
          if (tdCantidad.textContent === "0") {
            tr.innerHTML = "";
            numeroProductosCarrito.textContent = numeroDeProductos - 1 + " items";
          }
        });
        tr.appendChild(th);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdescripcion);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdAmount);
        tdButtons.appendChild(buttomAdd);
        tdButtons.appendChild(buttomLess);
        tr.appendChild(tdButtons);
        tbody.appendChild(tr);
        total += element.amount;
        indice++;
      });
      let divRow = document.createElement("div");
      divRow.className = "row";
      let divSpan = document.createElement("div");
      divSpan.className = "col";
      calculoTotalCarrito = document.createElement("span");
      calculoTotalCarrito.textContent = "Total: $" + total;
      calculoTotalCarrito.setAttribute("id", "spanTotalItems");
      divSpan.appendChild(calculoTotalCarrito);
      let divButtoms = document.createElement("div");
      divButtoms.className = "col d-flex justify-content-end";
      divButtoms.setAttribute("id", "divButtoms");
      let buttomCancel = document.createElement("button");

      buttomCancel.className = "btn btn-danger btn-order";
      buttomCancel.textContent = "Cancel";
      buttomCancel.dataset.toggle = 'modal'
      buttomCancel.dataset.target = '#mensaje'
      let buttomConfirm = document.createElement("a");
      buttomConfirm.className = "btn btn-light btn-order";
      buttomConfirm.textContent = "Confirm order";
      buttomConfirm.addEventListener("click", function () {
        let consoleOutput = [];
        for (let i = 0; i < carritoDeCompras.length; i++) {
          const element = carritoDeCompras[i];
          let productoActual = {};
          productoActual["item"] = i + 1;
          productoActual["quantity"] = element.quantity;
          productoActual["description"] = element.food;
          productoActual["unitPrice"] = element.unitPrice;
          consoleOutput.push(productoActual);
        }
        console.log(consoleOutput);
      });
      divButtoms.appendChild(buttomCancel);
      divButtoms.appendChild(buttomConfirm);
      divRow.appendChild(divSpan);
      divRow.appendChild(divButtoms);
      tablaACrearProductos.appendChild(tbody);
      tablaDeProductos.appendChild(tablaACrearProductos);
      infoProductosTotal.appendChild(divRow);
      document
        .getElementById("cancelOrder")
        .addEventListener("click", function () {
          tablaDeProductos.innerHTML = "";
          infoProductosTotal.innerHTML = "";
          carritoDeCompras = [];
          tablaDesplegada = false;
          numeroProductosCarrito.textContent = 0 + " items";
          numeroDeProductos = 0;
        });
    });
    botones.forEach(botonBarraTipoProductos => {
      botonBarraTipoProductos.addEventListener("click", (event) => {
        let categoria = event.target.text;
        let categoriaTitulo = document.getElementById("tituloCategoria");
        categoriaTitulo.textContent = categoria;
        let categoriaLista = dataJson.find(
          (elementFood) => elementFood.name == categoria
        );
        cartasProductos.innerHTML = "";
        categoriaLista.products.forEach((item) => {
          let divCarta = document.createElement("div");
          divCarta.className = "card";
          divCarta.style = "width: 18rem;"
          let imagen = document.createElement("img");
          imagen.className = "card-img-top";
          imagen.src = item.image;
          let bodyCarta = document.createElement("div");
          bodyCarta.className = "card-body";
          let h5 = document.createElement("h5");
          h5.className = "card-title";
          h5.textContent = item.name;
          let descripcion = document.createElement("p");
          descripcion.className = "card-text";
          descripcion.textContent = item.description;
          let precio = document.createElement("p");
          precio.className = "card-text";
          precio.style = "font-weight: bold;"
          precio.textContent = "$" + item.price;
          let botonAgregar = document.createElement("a");
          botonAgregar.className = "btn btn-dark btn-item";
          botonAgregar.type = "button";
          botonAgregar.textContent = "Add to car";
          botonAgregar.addEventListener("click", function () {
            numeroDeProductos = numeroDeProductos + 1;
            numeroProductosCarrito.textContent = numeroDeProductos + " items";
            let existe = carritoDeCompras.find(
              (producto) => producto.food == item.name
            );
            if (existe === undefined) {
              let productoActual = {};
              productoActual["food"] = item.name;
              productoActual["quantity"] = 1;
              productoActual["unitPrice"] = item.price;
              productoActual["amount"] = item.price;
              carritoDeCompras.push(productoActual);
            } else {
              existe.quantity++;
              existe.amount = existe.quantity * existe.unitPrice;
            }
          });
          divCarta.appendChild(imagen);
          bodyCarta.appendChild(h5);
          bodyCarta.appendChild(descripcion);
          bodyCarta.appendChild(precio);
          bodyCarta.appendChild(botonAgregar);
          divCarta.appendChild(bodyCarta);
          cartasProductos.appendChild(divCarta);
        });
        tablaDeProductos.innerHTML = "";
        infoProductosTotal.innerHTML = "";
      });
    });
  });
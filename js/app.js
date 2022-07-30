const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product p-box-style">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p>Average rating: ${product.rating.rate}</p>
      <p>Customers rated: ${product.rating.count}</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-own-style">Add to cart</button>
      <button onclick="loadSingleDetail(${product.id})" id="details-btn" class="btn btn-own-style">Details</button> 
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

/* FETCHING ID TO DISPLAY PRODUCT DETAILS INDIVIDUALLY */
const loadSingleDetail = (productID) => {
  const url = `https://fakestoreapi.com/products/${productID}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayProduct(json));
};


/************* DISPLAY PRODUCT DETAIL INDIVIDUALLY ************/
const displayProduct = (details) => {
  console.log(details);
  const productDetails = document.getElementById("products-details");
  // CLEARING DISPLAY BOX 
  productDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <div>
      <img src="${details.image}">
      <h1>${details.title}</h1>
      <h2>Category: ${details.category}</h2>
      <p>${details.description}</p>
    </div>
  `;
  productDetails.appendChild(div);
};


/***** CART PRODUCT COUNT   *****/
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;

  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const amount1 = document.getElementById("price").innerText;
  const amount2 = document.getElementById("delivery-charge").innerText;
  const amount3 = document.getElementById("total-tax").innerText;
  const grandTotal =
    parseFloat(amount1) + parseFloat(amount2) + parseFloat(amount3);
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

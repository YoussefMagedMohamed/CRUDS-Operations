let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let title = document.getElementById("title");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deleteBtn = document.getElementById("delete");
let updateBtn = document.getElementById("update");
let deleteAllBtn = document.getElementById("deleteAll");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let search = document.getElementById("search");

let mod = "create";
let temp;

// Get Total Price
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = " ";
    total.style.backgroundColor = "#a00d02";
  }
}

// Get Data From Local Storage
let dataProduct;

if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.getItem("product"));
  displayData();
} else {
  dataProduct = [];
}

// Create Product
function createProduct() {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value.toLowerCase(),
    taxes: taxes.value.toLowerCase(),
    ads: ads.value.toLowerCase(),
    discount: discount.value.toLowerCase(),
    total: total.innerHTML,
    count: count.value.toLowerCase(),
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newProduct.count < 100
  ) {
    if (mod === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[temp] = newProduct;
      mod = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(dataProduct));
  displayData();
}

// Clear Data
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";

  total.style.backgroundColor = "#a00d02";
}

// Display Data
function displayData() {
  let cartona = ``;

  for (let i = 0; i < dataProduct.length; i++) {
    cartona += `
    <tr>
      <td>${i + 1}</td>
      <td>${dataProduct[i].title}</td>
      <td>${dataProduct[i].price}</td>
      <td>${dataProduct[i].taxes}</td>
      <td>${dataProduct[i].ads}</td>
      <td>${dataProduct[i].discount}</td>
      <td>${dataProduct[i].total}</td>
      <td>${dataProduct[i].category}</td>
      <td><button onclick="updateProduct(${i});" id="update">Update</button></td>
      <td><button onclick="deleteProduct(${i});" id="delete">Delete</button></td>
    </tr>`;

    getTotal();
  }

  document.getElementById("tableBody").innerHTML = cartona;

  if (dataProduct.length > 0) {
    deleteAllBtn.innerHTML = `<button onclick="deleteAll();">Delete All (${dataProduct.length})</button>`;
  } else {
    deleteAllBtn.innerHTML = "";
  }
}

// Delete Product
function deleteProduct(i) {
  dataProduct.splice(i, 1);
  displayData();
  localStorage.setItem("product", JSON.stringify(dataProduct));
}

// Delete All Product
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  displayData();
}

function updateProduct(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProduct[i].category;

  submit.innerHTML = "Update";

  mod = "update";

  temp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search Product
let searchMod = "title";

function getSearchMOd(id) {
  if (id === "searchTitle") {
    searchMod = "title";
  } else {
    searchMod = "category";
  }
  search.placeholder = "Search By " + searchMod;
  search.focus();
  search.value = "";
  displayData();
}

function searchData(value) {
  let cartona = "";

  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMod == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        cartona += `
    <tr>
      <td>${i + 1}</td>
      <td>${dataProduct[i].title}</td>
      <td>${dataProduct[i].price}</td>
      <td>${dataProduct[i].taxes}</td>
      <td>${dataProduct[i].ads}</td>
      <td>${dataProduct[i].discount}</td>
      <td>${dataProduct[i].total}</td>
      <td>${dataProduct[i].category}</td>
      <td><button onclick="updateProduct(${i});" id="update">Update</button></td>
      <td><button onclick="deleteProduct(${i});" id="delete">Delete</button></td>
    </tr>`;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        cartona += `
   <tr>
     <td>${i + 1}</td>
     <td>${dataProduct[i].title}</td>
     <td>${dataProduct[i].price}</td>
     <td>${dataProduct[i].taxes}</td>
     <td>${dataProduct[i].ads}</td>
     <td>${dataProduct[i].discount}</td>
     <td>${dataProduct[i].total}</td>
     <td>${dataProduct[i].category}</td>
     <td><button onclick="updateProduct(${i});" id="update">Update</button></td>
     <td><button onclick="deleteProduct(${i});" id="delete">Delete</button></td>
   </tr>`;
      }
    }
  }

  document.getElementById("tableBody").innerHTML = cartona;
}

// Validate Data

// Event Listeners
taxes.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
price.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);

submit.addEventListener("click", createProduct);

searchTitle.addEventListener("click", function () {
  getSearchMOd(this.id);
});
searchCategory.addEventListener("click", function () {
  getSearchMOd(this.id);
});
search.addEventListener("keyup", function () {
  searchData(this.value);
});

// deleteBtn.addEventListener("click" , deleteProduct);

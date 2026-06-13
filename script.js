// INVENTORY MANAGEMENT SYSTEM


// Load saved products from local storage

let products =
JSON.parse(localStorage.getItem("products")) || [];


// SAVE PRODUCTS

function saveProducts() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}


// UPDATE PRODUCT COUNTER

function updateProductCount() {

    document.getElementById("productCount")
    .innerHTML =

    "Total Products: " + products.length;

}


// ADD PRODUCT

function addProduct() {

    let name =
    document.getElementById("productName").value;

    let quantity =
    Number(
        document.getElementById("productQuantity").value
    );

    // Validate input

    if(name === "" || quantity < 0) {

        alert("Please enter valid product details.");

        return;

    }

    let product = {

        name: name,

        quantity: quantity

    };

    products.push(product);

    saveProducts();

    updateProductCount();

    document.getElementById("productName").value = "";
    document.getElementById("productQuantity").value = "";

    alert("Product Added Successfully");

}


// DISPLAY PRODUCTS

function displayProducts() {

    let output =
    document.getElementById("output");

    output.innerHTML =
    "<h2>All Products</h2>";

    if(products.length === 0) {

        output.innerHTML +=
        "<p>No products available.</p>";

        return;
    }

    products.forEach(function(product) {

        output.innerHTML +=

        `
        <div class="product-card">

            <strong>${product.name}</strong>

            <br>

            Quantity:
            ${product.quantity}

        </div>
        `;

    });

}


// SEARCH PRODUCT

function searchProduct() {

    let searchName =
    document.getElementById("searchInput").value;

    let foundProduct =

    products.find(function(product) {

        return product.name.toLowerCase() ===
        searchName.toLowerCase();

    });

    let output =
    document.getElementById("output");

    if(foundProduct) {

        output.innerHTML =

        `
        <div class="product-card">

            <h3>Product Found</h3>

            <strong>${foundProduct.name}</strong>

            <br>

            Quantity:
            ${foundProduct.quantity}

        </div>
        `;

    }

    else {

        output.innerHTML =
        "<p>Product not found.</p>";

    }

}


// UPDATE PRODUCT QUANTITY

function updateQuantity() {

    let productName =
    document.getElementById("updateProductName").value;

    let newQuantity =
    Number(
        document.getElementById("newQuantity").value
    );

    let found = false;

    products.forEach(function(product) {

        if(

            product.name.toLowerCase() ===
            productName.toLowerCase()

        ) {

            product.quantity = newQuantity;

            found = true;

        }

    });

    if(found) {

        saveProducts();

        alert("Quantity Updated Successfully");

        displayProducts();

    }

    else {

        alert("Product Not Found");

    }

}


// SHOW OUT OF STOCK PRODUCTS

function showOutOfStock() {

    let output =
    document.getElementById("output");

    output.innerHTML =
    "<h2>Out Of Stock Products</h2>";

    let found = false;

    products.forEach(function(product) {

        if(product.quantity === 0) {

            found = true;

            output.innerHTML +=

            `
            <div class="product-card out-of-stock">

                <strong>${product.name}</strong>

                <br>

                Quantity:
                ${product.quantity}

            </div>
            `;

        }

    });

    if(!found) {

        output.innerHTML +=
        "<p>No products are out of stock.</p>";

    }

}


// CLEAR INVENTORY

function clearInventory() {

    let confirmDelete =

    confirm(
        "Are you sure you want to delete all products?"
    );

    if(confirmDelete) {

        products = [];

        localStorage.removeItem("products");

        updateProductCount();

        displayProducts();

        alert("Inventory Cleared");

    }

}


//  INITIAL PAGE LOAD

updateProductCount();

displayProducts();
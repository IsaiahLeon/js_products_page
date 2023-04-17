let products = [
    {
        name: "Banana",
        description: "A yellow banana. It is a berry.",
        price: 9
    },
    {
        name: "Apple",
        description: "A red apple, sweet and tasty.",
        price: 7  
    },
    {
        name: "Orange",
        description: "A delicious orange, ripe and plump. The orange sphere of awesomeness is filled with extremely soft and juicy pulp, mouthgasm guaranteed.",
        price: 10
    }
];

//Display all products
function showProducts() {
    let html = '';
    //Loop over products
    for(let product of products) {
        html += `
            <div class="product">
            <h2>${product.name}</h2>
            <div class="info">
                <p>${product.description}</p>
                <p>Pris: <b>${product.price}</b></p>
            </div>
            <button class="remove" data-product-name="${product.name}">Remove</button>
            <hr>
        </div>
        `;
    }
    // add html to the document, products div
    document.querySelector('.products').innerHTML = html;
}
//kör programmet:
//showProducts();

// Handle all click events
function handleEvents() {
    // add event listener to entire body and listen for <click>
    document.querySelector('body').addEventListener('click', function(event) {
        let productClicked = event.target.closest('.product');
        if(!productClicked) { return; }

        // get the info-div from the clicked product
        let infoProduct = productClicked.querySelector('.info');

        //Ternary operator, if block - go none, if none go block
        infoProduct.style.display = infoProduct.style.display === 'block' ? 'none' : 'block';

        //If the closest element is the remove buttom
        let removeButton = event.target.closest('.remove');
        if(removeButton) {
            let productName = removeButton.getAttribute('data-product-name');
            //Remove products by name from array, using filter
            products = products.filter((product) => product.name !== productName);
            productClicked.remove();
        }
    });

        // Event listener for the add product form that listens for submit, and not click
        let addProductForm = document.querySelector('#add-product-form');
        addProductForm.addEventListener('submit', function(event) {
            // don't let the site reload when submit is clicked
            event.preventDefault();

            //get the values from the form
            let name = document.querySelector('#name').value;
            let description = document.querySelector('#description').value;
            let price = Number(document.querySelector('#price').value);

            //Error handling, check that all fields are filled out
            if(name && description && price) {
                //New product
                let newProduct = {
                    name: name,
                    description: description,
                    price: price
                };

                //Add the product to the products array
                products.push(newProduct);

                //Reset the form and show new div
                let productsDiv = document.querySelector('.products');
                productsDiv.innerHTML = '';
                //Render the products again
                showProducts();
                //Reset form
                addProductForm.reset();

            } else {
                alert('Please fill out all the fields!');
            }

        });
    
}

showProducts();
handleEvents();
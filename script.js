function createNode(element) {
    return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
}

const colDiv = document.querySelector('.col');


fetch ('https://api.treez.io/v1.0/dispensary/goe/menu/product_list?type=all&offset=0&limit=600')
.then(response => response.json()) // Transform the data into json
.then(data => {
    let products = data.product_list; // Get the results
    return products.map(product => { // Map through the results and for each run the code below
        let productName = createNode('p'), //  Create the elements
            productClassification = createNode('p'),
            productBrand = createNode('p'),
            gramPrice = createNode('p'),
            thc = createNode('p'),
            gram = createNode('span'),
            img = createNode('img'),
            div = createNode('div');
            div.className = "item";
        let variant = product.size_list.find(item => item['size'] === 3.5); // Find 3.5g size info
        let price = Math.round(variant.price_sell + (variant.price_sell * variant.primary_tax_rate)); // Calculate price for 3.5g
        img.src = product.images.cropped_image; // source of the image 
        productName.innerHTML = `${product.product_name}`;
        productName.className = "productName";
        productClassification.innerHTML = `${product.classifications}`;
        productClassification.className = "productClassification";        
        productBrand.innerHTML = `${product.brand}`;
        productBrand.className = "productBrand";
        gramPrice.innerHTML = ` $${price.toFixed(2)}`;
        gramPrice.className = "gramPrice";
        gram.innerHTML = ` / ${variant.size}g`;
        gram.className = "gram";

        append(div, img); // Append all our elements
        append(div, productBrand);
        append(div, productName);
        append(div, productClassification);

        if (`${product.attributes.thc_percentage}` !== '-.-') { //span if thc percentage isn't -.-
        thc.innerHTML = ` THC ${product.attributes.thc_percentage}%`;
        thc.className = "thc";
        append(div, thc);
        }

        append(div, gramPrice);
        append(gramPrice, gram);
        append(colDiv, div);
    })
})
.catch(error => console.log(error));

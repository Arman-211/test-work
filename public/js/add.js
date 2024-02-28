// Function to open the modal
function openModal() {
    let modal = document.getElementById("myModal");
    if (modal) {
        modal.style.display = "block";
    }
}

// Function to close the modal
function closeModal() {
    let modal = document.getElementById("myModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Add event listener to the document for event delegation
document.addEventListener('click', function (event) {
    // Check if the clicked element is a span with the class "remove-button"
    if (event.target.classList.contains('remove-button')) {
        // Call removeAttribute function passing the clicked span element and the event
        removeAttribute(event.target.parentNode, event);
    }
});

function addAttribute(event) {
    event.preventDefault(); // Prevent the default behavior of the link click event
    const container = document.getElementById('attributes-container');
    const div = document.createElement('div');
    div.classList.add('attribute_container_block'); // Add class to the container div
    div.innerHTML = `
        <div class="attribute__box">
            <p class="attribute_container_block_title">Название</p>
            <input type="text" name="attributes[key][]" class="add_product_form_attribute_name">
        </div>
        <div class="attribute__box">
            <p class="attribute_container_block_title">Значение</p>
            <input type="text" name="attributes[value][]" class="add_product_form_attribute_value">
        </div>
        <div class="attribute__box">
            <i class="remove-button fa">&#xf014;</i>
        </div>
    `;
    // Insert the new attribute block at the top of the container
    container.insertBefore(div, container.firstChild);
}

function removeAttribute(element, event) {
    event.preventDefault(); // Prevent the default behavior of the span click event
    event.stopPropagation(); // Stop the event from propagating to parent elements

    const container = element.parentNode.parentNode; // Get the container of the input field
    const scrollPosition = window.scrollY; // Store the current scroll position

    element.parentNode.remove(); // Remove the parent element (the entire div) containing the attribute fields

    // Scroll back to the previous position after removing the input field
    window.scrollTo(0, scrollPosition);
}

// Close the modal when the user clicks outside of it

document.addEventListener('click', function (event) {
    // Check if the clicked element has the class "product-info"
    if (event.target.classList.contains('product-info')) {
        // Get the product ID from the data attribute
        const productId = event.target.getAttribute('data-product-id');
        // Fetch the product information using AJAX
        fetchProductInfo(productId);
    }
});


///INFOS
// Function to open the modal Info and fetch product information
function openModalInfo(productId) {
    let modal = document.getElementById("myModalInfo");
    if (modal) {
        modal.style.display = "block";
    }
}

// Function to close the modal info
function closeModalInfo() {
    let modal = document.getElementById("myModalInfo");
    if (modal) {
        modal.style.display = "none";
    }
}// Function to close the modal info
function closeModalUpdate() {
    let modal = document.getElementById("myModalUpdate");
    if (modal) {
        modal.style.display = "none";
    }
}

// Function to fetch product information using productId
function fetchProductInfo(productId) {
    fetch(`/products/get/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch product information');
            }
            return response.json(); // Parse response body as JSON
        })
        .then(product => {
            // Pass the product data to a function to populate the modal
            populateModal(product);
        })
        .catch(error => console.error('Error fetching product information:', error));
}

// Function to populate the modal with product information
function populateModal(product) {
    // Assuming you have elements in your modal to display product information
    // Replace these with your actual element IDs or classes
    const productIdElement = document.getElementById('modalProductId');
    const productArticleElement = document.getElementById('modalProductArticle');
    const productNameElement = document.getElementById('modalProductName');
    const productName2Element = document.getElementById('modalProductName2');
    const productStatusElement = document.getElementById('modalProductStatus');
    const productAttributesElement = document.getElementById('modalProductAttributes');
    const productEditIdElement = document.getElementById('modalProductEditId');
    const productDeleteIdElement = document.getElementById('modalProductDeleteId');

    // Populate the modal with product information
    if (productIdElement) productIdElement.textContent = product.id;
    if (productArticleElement) productArticleElement.textContent = product.article;
    if (productNameElement) productNameElement.textContent = product.name;
    if (productName2Element) productName2Element.textContent = product.name;
    if (productEditIdElement) productEditIdElement.id = product.id;
    if (productDeleteIdElement) productDeleteIdElement.id = product.id;
    if (productStatusElement) productStatusElement.textContent = product.status;
    if (productAttributesElement) {
        if (product.data) {
            let attributesHTML = '';
            const productData = JSON.parse(product.data);
            for (const [key, value] of Object.entries(productData)) {
                attributesHTML += `${key}: ${value}<br>`;
            }
            productAttributesElement.innerHTML = attributesHTML;
        }
    }
    //
    // productEditIdElement.addEventListener('click', function (event) {
    //     let modalInfo = document.getElementById("myModalInfo");
    //     if (modalInfo) {
    //         modalInfo.style.display = "none";
    //     }
    //     let modalUpdate = document.getElementById("myModalUpdate");
    //     modalUpdate.style.display = "block";
    //     const productUpdateIdElement = document.getElementById('modalProductUpdateId');
    //     const productUpdateArticleElement = document.getElementById('modalProductUpdateArticle');
    //     const productUpdateNameElement = document.getElementById('modalProductUpdateName');
    //     const productUpdateNameInputElement = document.getElementById('modalProductUpdateNameInput');
    //     const productUpdateStatusElement = document.getElementById('modalProductUpdateStatus');
    //
    //     if (productUpdateIdElement) productUpdateIdElement.value = product.id;
    //     if (productUpdateArticleElement) productUpdateArticleElement.value = product.article;
    //     if (productUpdateNameElement) productUpdateNameElement.textContent = product.name;
    //     if (productUpdateNameInputElement) productUpdateNameInputElement.value = product.name;
    //     if (productUpdateStatusElement) productUpdateStatusElement.value = product.status;
    //     // Clear previous attributes
    //     const container = document.getElementById('attributes-container-update');
    //
    //
    //     // Populate attributes
    //     if (product.data) {
    //         console.log(product.data);
    //         const productData = JSON.parse(product.data);
    //         for (const [key, value] of Object.entries(productData)) {
    //             const attributeDiv = document.createElement('div');
    //             attributeDiv.classList.add('attribute_container_block');
    //             attributeDiv.innerHTML = `
    //             <div class="attribute__box">
    //                 <p class="attribute_container_block_title">Название</p>
    //                 <input type="text" name="attributes[key][]" class="add_product_form_attribute_name" value="${key}">
    //             </div>
    //             <div class="attribute__box">
    //                 <p class="attribute_container_block_title">Значение</p>
    //                 <input type="text" name="attributes[value][]" class="add_product_form_attribute_value" value="${value}">
    //             </div>
    //             <div class="attribute__box">
    //                 <i class="remove-button fa">&#xf014;</i>
    //             </div>
    //         `;
    //             container.appendChild(attributeDiv, attributeDiv.lastChild);
    //         }
    //     }
    // });
    productEditIdElement.addEventListener('click', function (product) {
        return function (event) {
            let modalInfo = document.getElementById("myModalInfo");
            if (modalInfo) {
                modalInfo.style.display = "none";
            }
            let modalUpdate = document.getElementById("myModalUpdate");
            modalUpdate.style.display = "block";
            const productUpdateIdElement = document.getElementById('modalProductUpdateId');
            const productUpdateArticleElement = document.getElementById('modalProductUpdateArticle');
            const productUpdateNameElement = document.getElementById('modalProductUpdateName');
            const productUpdateNameInputElement = document.getElementById('modalProductUpdateNameInput');
            const productUpdateStatusElement = document.getElementById('modalProductUpdateStatus');
            const productEditIdElement = document.getElementById('productEditIdElement');
            const container = document.getElementById('attributes-container-update');

            if (productUpdateIdElement) productUpdateIdElement.value = product.id;
            if (productUpdateArticleElement) productUpdateArticleElement.value = product.article;
            if (productUpdateNameElement) productUpdateNameElement.textContent = product.name;
            if (productUpdateNameInputElement) productUpdateNameInputElement.value = product.name;
            if (productUpdateStatusElement) productUpdateStatusElement.value = product.status;
            if (productEditIdElement) productEditIdElement.value = product.id;
            // Clear previous attributes
            container.innerHTML = '';

            // Populate attributes
            if (product.data) {
                const productData = JSON.parse(product.data);
                for (const [key, value] of Object.entries(productData)) {
                    const attributeDiv = document.createElement('div');
                    attributeDiv.classList.add('attribute_container_block');
                    attributeDiv.innerHTML = `
                <div class="attribute__box">
                    <p class="attribute_container_block_title">Название</p>
                    <input type="text" name="attributes[key][]" class="add_product_form_attribute_name" value="${key}">
                </div>
                <div class="attribute__box">
                    <p class="attribute_container_block_title">Значение</p>
                    <input type="text" name="attributes[value][]" class="add_product_form_attribute_value" value="${value}">
                </div>
                <div class="attribute__box">
                    <i class="remove-button fa">&#xf014;</i>
                </div>
            `;
                    container.appendChild(attributeDiv);
                }
            }
        };
    }(product));
    productDeleteIdElement.addEventListener('click', function (event) {
        fetch(`api/products/delete/${this.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete product');
                }
                console.log('Product deleted successfully');
                // Optionally, you can perform further actions here after successful deletion
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                // Handle errors, such as displaying an error message to the user
            });
        location.reload();
    });
}

function addAttributeUpdate(event) {
    event.preventDefault(); // Prevent the default behavior of the link click event
    const container = document.getElementById('attributes-container-update');
    const div = document.createElement('div');
    div.classList.add('attribute_container_block'); // Add class to the container div
    div.innerHTML = `
            <div class="attribute__box">
                <p class="attribute_container_block_title">Название атрибута</p>
                <input type="text" name="newAttributes[key][]" class="add_product_form_attribute_name">
            </div>
            <div class="attribute__box">
                <p class="attribute_container_block_title">Значение атрибута</p>
                <input type="text" name="newAttributes[value][]" class="add_product_form_attribute_value">
            </div>
            <div class="attribute__box">
                <i class="remove-button fa">&#xf014;</i>
            </div>
        `;
    // Insert the new attribute block at the end of the container
    container.appendChild(div, container.firstChild);
}

window.onclick = function (event) {
    let modal = document.getElementById("myModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }

    let modalInfo = document.getElementById("myModalInfo");
    if (event.target === modalInfo) {
        modalInfo.style.display = "none";
    }

    let modalUpdate = document.getElementById("myModalUpdate");
    if (event.target === modalUpdate) {
        modalUpdate.style.display = "none";
    }
}


function submitUpdatedProduct(event) {
    event.preventDefault(); // Prevent default form submission

    let form = event.target;
    let formData = new FormData(form); // Get form data

    let productId = document.getElementById("modalProductEditId").id; // Get the product ID

    fetch(`/products/update/${productId}`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            console.log('Product updated successfully');
            closeModal(); // Close the modal after successful update
            // Optionally, you can perform further actions here after successful update
        })
        .catch(error => {
            console.error('Error updating product:', error);
            // Handle errors, such as displaying an error message to the user
        });
}

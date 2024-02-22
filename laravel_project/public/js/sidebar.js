<!-- Add a script to load products asynchronously -->
document.getElementById('products-link').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior
    // Fetch the products page and replace the content of a specific element with the response
    fetch('/products')
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
        });
});

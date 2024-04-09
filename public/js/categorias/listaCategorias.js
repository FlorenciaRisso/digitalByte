fetch('/api/cat/list')
    .then(response => response.json())
    .then(categorias => {
        const dropdown = document.getElementById('categorias-dropdown');
        categorias.Categories.forEach(categoria => {
            const option = document.createElement('option');
            option.value = `/productos/categoria?cat=${categoria.id}`;
            option.textContent = categoria.nombre;
            dropdown.appendChild(option);
        });
    })
    .catch(error => console.error('Error al obtener las categorías:', error));

document.getElementById('categorias-dropdown').addEventListener('change', function () {
    const selectedCategory = this.value;
    window.location.href = selectedCategory;
});
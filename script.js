document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results');

    const fetchData = async () => {
        try {
            const response = await fetch('/data');
            return await response.json();
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const displayResults = (data) => {
        resultsContainer.innerHTML = '';
        data.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <h3>No. De Referencia: ${item['No. De Referencia']}</h3>
                <p><strong>Descripción:</strong> ${item.Descripción}</p>
                <p><strong>Características:</strong> ${item.Caracteristicas}</p>
                <p><strong>Rango:</strong> ${item.Rango}</p>
                <p><strong>Precio referencia antes de IVA:</strong> ${item['Precio referencia antes de IVA']}</p>
            `;
            resultsContainer.appendChild(resultItem);
        });
    };

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.toLowerCase();
        const data = await fetchData();

        const filteredData = data.filter(item => 
            item.Descripción.toLowerCase().includes(query) ||
            item['No. De Referencia'].toLowerCase().includes(query)
        );

        displayResults(filteredData);
    });
});

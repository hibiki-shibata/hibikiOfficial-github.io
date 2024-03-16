document.addEventListener('DOMContentLoaded', () => {
    const keywordForm = document.getElementById('keywordForm');
    const keywordInput = document.getElementById('keyword');
    const keywordList = document.getElementById('keywordList');

    // Function to fetch keywords from the backend and render them in the UI
    const fetchKeywords = async () => {
        keywordList.innerHTML = '';
        const response = await fetch('https://5c16-153-150-176-69.ngrok-free.app/api/keywords');
        const keywords = await response.json();
        keywords.forEach(keyword => {
            const li = document.createElement('li');
            li.textContent = keyword.keyword;
            keywordList.appendChild(li);
        });
    };

    // Fetch initial keywords when the page loads
    fetchKeywords();

    // Event listener for form submission to add a new keyword
    keywordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const keyword = keywordInput.value.trim();
        if (keyword) {
            await fetch('https://5c16-153-150-176-69.ngrok-free.app/api/keywords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ keyword })
            });
            keywordInput.value = '';
            fetchKeywords();
        }
    });
});

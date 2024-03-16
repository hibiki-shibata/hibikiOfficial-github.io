document.addEventListener('DOMContentLoaded', () => {
    const keywordForm = document.getElementById('keywordForm');
    const keywordInput = document.getElementById('keyword');
    const keywordList = document.getElementById('keywordList');

    // Function to fetch keywords from the backend and render them in the UI
    const fetchKeywords = async () => {
        try{
            keywordList.innerHTML = '';
            const response = await fetch('https://5c16-153-150-176-69.ngrok-free.app');
            const keywords = await response.json();
            keywords.forEach(keyword => {
                const li = document.createElement('li');
                li.textContent = keyword.keyword;
                keywordList.appendChild(li);
            });
        }catch(e){
            console.log("heyhibiki", e)

        }
     
    };

    // // Fetch initial keywords when the page loads
    // fetchKeywords();

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


    // document.addEventListener('DOMContentLoaded', async () => {
    //     try {
    //         // Fetch keywords from the backend API
    //         const response = await fetch('https://5c16-153-150-176-69.ngrok-free.app');
            
    //         if (response.ok) {
    //             // Parse the response as JSON
    //             const keywords = await response.json();
                
    //             // Process the keywords (e.g., display them in the UI)
    //             const keywordList = document.getElementById('keywordList');
    //             keywords.forEach(keyword => {
    //                 const li = document.createElement('li');
    //                 li.textContent = keyword.keyword;
    //                 keywordList.appendChild(li);
    //             });
    //         } else {
    //             console.error('Failed to fetch keywords:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching keywords:', error.message);
    //     }
    // });
    
});

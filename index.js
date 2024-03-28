  
        // Fetch data list when the page loaded
        fetch('https://b9c5-221-248-80-202.ngrok-free.app/yuhoweb', {
                method: "get",
                headers: new Headers({
                    "ngrok-skip-browser-warning": "23423423",
                }),
                })
            .then(response => response.json())
            .then(data => {
                // Update the DOM with the received data
                const dataList = document.getElementById('dataList');
                console.log(data)
                data.keywords.forEach(keyword => {
                    const listItem = document.createElement('li');
                    listItem.textContent = keyword;
                    dataList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error:', error));



        // Add keyword
        function addKeyword(){
            const keywordInput = document.getElementById('inputKeyword');            
            const hibikikeyword = keywordInput.value.trim();
                if (hibikikeyword) {
                    fetch('https://b9c5-221-248-80-202.ngrok-free.app/add/keywords',  {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ hibikikeyword })
                    });
                    keywordInput.value = '';
                    // fetchKeywords();
                }
        }
       

        // delete keyword
        function deleteKeyword() {
            const deleteKeywordInput = document.getElementById('deleteKeywordInput');
            const hibikikeyword = deleteKeywordInput.value.trim();
            if (hibikikeyword) {
                fetch(`https://b9c5-221-248-80-202.ngrok-free.app/delete/keywords`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ hibikikeyword })
                });
                deleteKeywordInput.value = '';
            }
        }
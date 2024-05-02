  
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


        // Display custome stored data
        const data = [
            { keywords: ["stfu", "shutit", "yum"], Answer: "seagull" },
            { keywords: ["bird", "funny", "pink"], Answer: "flamingo" },
            // You can add more data objects here following the same format
          ];
        const answersContainer = document.getElementById('customeList');

        data.forEach(item => {
            const answerElement = document.createElement('p');
            answerElement.textContent = `Keywords: ${item.keywords.join(', ')} - Answer: ${item.Answer}`;
            answersContainer.appendChild(answerElement);})



        // Add keyword
        const finalKeywords = [];
        function addKeyword(){
            const keywordInput = document.getElementById('inputKeyword');  
            const hibikikeyword = keywordInput.value.trim();
            if(hibikikeyword){
                finalKeywords.push(hibikikeyword);

                // for listing in screen
                const dataList = document.getElementById('tempKeywordsList');
                const listItem = document.createElement('li');
                    listItem.textContent = hibikikeyword;
                    dataList.appendChild(listItem);
                keywordInput.value = '';

            }           
            // const keywordInput = document.getElementById('inputKeyword');  
            
        }
       

        // Add answer
        let finalAnswer = ""
        function addAnswer(){
            const keywordInput = document.getElementById('inputAnswer'); 
            const hibikikeyword = keywordInput.value.trim();
            finalAnswer = hibikikeyword
             
            // update answer
            const answerText = document.getElementById('answerText');
            answerText.textContent = hibikikeyword;
        
            keywordInput.value = '';
        }


        const submitButton = document.getElementById("addCustomeSubmit");
        submitButton.addEventListener("click", addCustomeSubmit);
        function addCustomeSubmit(){
            submitButton.addEventListener("click", addCustomeSubmit);

                if (finalKeywords && finalAnswer) {
                    const data = {
                        keywords: finalKeywords,
                        answer: finalAnswer,
                      };

                    // fetch('https://b9c5-221-248-80-202.ngrok-free.ap/add/keywords',  {
                    fetch('https://b9c5-221-248-80-202.ngrok-free.app/add/keywords',  {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ data })
                    });

                    setTimeout(function() {
                        window.location.reload();
                        }, 300);
                }else{
                    alert("something went wrong :kissing:")
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
                setTimeout(function() {
                    window.location.reload();
                    }, 300);
            }
        }




        // function addKeyword(){
        //     const keywordInput = document.getElementById('inputKeyword');            
        //     const hibikikeyword = keywordInput.value.trim();
        //         if (hibikikeyword) {
        //             fetch('https://b9c5-221-248-80-202.ngrok-free.app/add/keywords',  {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json'
        //                 },
        //                 body: JSON.stringify({ hibikikeyword })
        //             });
        //             keywordInput.value = '';
        //             setTimeout(function() {
        //                 window.location.reload();
        //                 }, 300);
        //         }
            
        // }
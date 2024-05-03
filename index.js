
// Fetch Database data
const answersContainer = document.getElementById('customeList');
async function fetchData () {
    const request = await fetch('http://localhost:4000/', {
        method: "get",
        headers: new Headers({
            "ngrok-skip-browser-warning": "23423423",
        }),
    });

    const json = await request.json();
    const jsonFinal = json.responseData

    return jsonFinal;
}

// Display Database data
function printCustomList (items) {
    const anchor = document.getElementById("dataList")
    const listElement = document.createElement("ul");

    items.forEach(item => {
        const listItemElement = document.createElement('li');

        listItemElement.textContent = `KEYWORDS: ${item.keywords.join(', ')} => ANSWERS: ${item.answer}\n`;

        const deleteButtonElement = document.createElement("button");
        deleteButtonElement.textContent = "Delete"
        deleteButtonElement.addEventListener("click", () => {
            deleteKeyword(item.answer);
            setTimeout(function() {
                window.location.reload();
                }, 200);
        })

        listElement.appendChild(listItemElement);
        listItemElement.appendChild(deleteButtonElement);
    });

    console.log(items)
    anchor.appendChild(listElement)
}


async function customListLoader () {
    const items = await fetchData();
    printCustomList(items)
}

customListLoader()



// delete keyword
function deleteKeyword(answer) {
    fetch(`http://localhost:4000/delete/keywords`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer })
    });
}



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
    if(hibikikeyword){
        finalAnswer = hibikikeyword
        
        // update answer
        const answerText = document.getElementById('answerText');
        answerText.textContent = hibikikeyword;
    
        keywordInput.value = '';

    }
}


// Send new custome to Server
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
            fetch('http://localhost:4000/add/keywords',  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data })
            });

            setTimeout(function() {
                window.location.reload();
                }, 200);
        }else{
            alert("something went wrong😗\nPlease make sure Keywords or Answer field is not blank bitch😘")
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
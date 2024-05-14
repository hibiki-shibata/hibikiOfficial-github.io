const resetDraftButton = document.getElementById("resetDraftButton");
const newCustomSubmitButton = document.getElementById("addCustomeSubmit");
resetDraftButton.style.display = "none";
newCustomSubmitButton.style.display = "none";


// import{ backendRequestToken }from '../signin';
// Fetch Database data
// const answersContainer = document.getElementById('customeList');
async function fetchData() {
    try {
        const accessToken = localStorage.getItem("secretToken");

        // const request = await fetch('https://8baa-153-150-176-69.ngrok-free.app/yuhoweb', {
        const request = await fetch('https://9d72-221-248-80-202.ngrok-free.app/yuhoweb', {
            method: "get",
            headers: new Headers({
                "ngrok-skip-browser-warning": "23423423",
                "Authorization": `${accessToken}`
            }),
        });

        if(request.status == 500) throw Error

        const json = await request.json();
        const jsonFinal = json.responseData

        return jsonFinal;

    } catch {
        alert("Refreshing custom list data failed😗\nYour access token might be expired. Please reload the page and login again:)")
    }
}


// Display Database data
async function printCustomList(items) {
    const anchor = document.getElementById("dataList")
    const listElement = document.createElement("ul");
    
    
    if(anchor.firstChild){
    while (anchor.firstChild) {
        anchor.removeChild(anchor.firstChild);
    }}

    
    await items.forEach(item => {
        const listItemElement = document.createElement('li');

        // listItemElement.textContent = `KEYWORDS: ${item.keywords.join(', ')} => ANSWERS: ${item.answer}\n`;
        listItemElement.innerHTML = `KEYWORDS► ${item.keywords.join(', ')} <br> ANSWER► ${item.answer}`;

        const deleteButtonElement = document.createElement("button");
        deleteButtonElement.textContent = "Delete"
        deleteButtonElement.addEventListener("click", async () => {
            await deleteKeyword(item.answer);

            // delete custome list
            const anchor = document.getElementById("dataList")
             while (anchor.firstChild) {
                anchor.removeChild(anchor.firstChild);
            }

            // Re-fetch the database data
            await customListLoader()

        })

        const butoonNewLineElement = document.createElement('br');
        const listNewLineElement = document.createElement('p2');

        listNewLineElement.innerHTML = "<br><br>"

        listElement.appendChild(listItemElement);
        listItemElement.appendChild(butoonNewLineElement);
        listItemElement.appendChild(deleteButtonElement);
        listItemElement.appendChild(listNewLineElement)
        
    });

    // console.log(items)
    anchor.appendChild(listElement)
}


async function customListLoader() {
    const items = await fetchData();
    printCustomList(items)
}

// customListLoader()



// delete keyword
async function deleteKeyword(answer) {
    try {
        const accessToken = localStorage.getItem("secretToken");

       await fetch(`https://9d72-221-248-80-202.ngrok-free.app/delete/keywords`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({ answer })
        });

    } catch {
        alert("Failed to delete😗")

    }
}


// Add keyword
let finalKeywords = [];
function addKeyword() {
    const keywordInput = document.getElementById('inputKeyword');
    const hibikikeyword = keywordInput.value.trim();

    if (hibikikeyword) {
        finalKeywords.push(hibikikeyword.toLowerCase());

        // for listing in screen
        const dataList = document.getElementById('tempKeywordsList');
        const listItem = document.createElement('li');
        listItem.textContent = hibikikeyword;
        dataList.appendChild(listItem);
        keywordInput.value = '';

        resetDraftButton.style.display = "inline-block";
        newCustomSubmitButton.style.display = "inline-block";

    }
    // const keywordInput = document.getElementById('inputKeyword');  

}


// Add answer
let finalAnswer = ""
function addAnswer() {
    const answerInput = document.getElementById('inputAnswer');
    const hibikikeyword = answerInput.value.trim();
    if (hibikikeyword) {
        finalAnswer = hibikikeyword

        // update answer
        const answerText = document.getElementById('answerText');
        answerText.textContent = "▼Answer text▼ \n" + hibikikeyword;

        answerInput.value = '';

        resetDraftButton.style.display = "inline-block";
        newCustomSubmitButton.style.display = "inline-block";

    }
}


function reloadWithoutRequest() {
    const deleteAnswerInput = document.getElementById('inputAnswer');
    const deleteKeywordInput = document.getElementById('inputKeyword');
    const answerText = document.getElementById('answerText');
    const dataList = document.getElementById('tempKeywordsList');

    while (dataList.firstChild) {
        dataList.removeChild(dataList.firstChild);
    }

    deleteAnswerInput.value = '';
    finalAnswer = '';
    deleteKeywordInput.value = '';
    finalKeywords = [];
    answerText.textContent = "";
    resetDraftButton.style.display = "none";
    newCustomSubmitButton.style.display = "none";
}


// Send new custome to Server
const submitButton = document.getElementById("addCustomeSubmit");
submitButton.addEventListener("click", addCustomeSubmit);
async function addCustomeSubmit() {
    try {

        if (finalKeywords[0] && finalAnswer) {
            const accessToken = localStorage.getItem("secretToken");
            const data = {
                keywords: finalKeywords,
                answer: finalAnswer,
            };

            // fetch('https://b9c5-221-248-80-202.ngrok-free.ap/add/keywords',  {
            const response = await fetch('https://9d72-221-248-80-202.ngrok-free.app/add/keywords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`
                },
                body: JSON.stringify({ data })
            });
            
            if(response.status !== 201)throw Error
        

            await reloadWithoutRequest()


            // delete custome list
            const anchor = document.getElementById("dataList")
            while (anchor.firstChild) {
                anchor.removeChild(anchor.firstChild);
            }

            // Re-fetch the database data
            customListLoader()


        } else {
            alert("Something went wrong😗\nPlease make sure Keywords or Answer field is not blank😘")
        }

    } catch {
        alert("Add new custom failed😗\nYour access token might be expired. Please reload the page and login again:)")
    }

}




const inputKeyword = document.getElementById('inputKeyword');
inputKeyword.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        event.preventDefault();
        addKeyword()
    }
    
});

const inputAnswer = document.getElementById('inputAnswer');
inputAnswer.addEventListener("keydown", function (event) {
const commandOrCtrKey = event.metaKey || event.ctrlKey

   if (event.key == "Enter" && commandOrCtrKey) {
            event.preventDefault();
            addAnswer()
         
    } 

});

// const inputAnswerSubmit = document.getElementById('inputAnswer');
// inputAnswerSubmit.addEventListener("keypress", function (event) {

//     if (event.key === "Enter") {
//         event.preventDefault();
//         addAnswer()
//     }
// }
// );

// const commandCustomSubmit = document.getElementById('addCustomeSubmit');
// commandCustomSubmit.addEventListener("keypress", function (event) {


//     if (event.key === "Enter" && event.metaKey) {
//         event.preventDefault();
//         addCustomeSubmit()
//     }

    
// });
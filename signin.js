
async function falseToTrue(){

    let getPassward = document.getElementById('inputPassword').value;
    
    if(!getPassward) {
        alert("Please enter password nerd😘") 
        throw Error
    }

    const fetchedToken = await fetchAuthToken(getPassward)   
    getPassward = ""
    
    if (fetchedToken != 13232){
        alert("Authorization failed")
        throw Error
    }else{
        showIndexHtml();
    }
    
}


async function fetchAuthToken (inputPassword) {
    const request = await fetch('http://localhost:3000/yuhoAuth', {
        method: "POST",
        headers: new Headers({
            "ngrok-skip-browser-warning": "23423423",
        }),
        body: JSON.stringify({ inputPassword })
    });

    if (request.status == 400){
     alert ("Your password is incorrect😗") 
     throw Error
    } else if (request.status !== 200){
     alert("Internal server error")  
     throw Error
    }

    const json = await request.json();
    token = json.authToken
     
    return token
}



function showIndexHtml() {
    document.getElementById('indexFrame').style.display = 'block';        
    document.getElementById('signin').style.display = 'none'
}




const inputPassward = document.getElementById('inputPassword');
inputPassward.addEventListener("keypress", function(event) {

    if (event.key == "Enter") {        
      event.preventDefault();
      document.getElementById('signinButton').click();

    }
  });
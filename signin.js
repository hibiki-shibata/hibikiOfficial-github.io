localStorage.removeItem("secretToken");
let backendRequestToken = ""

async function falseToTrue() {

    let getPassward = document.getElementById('inputPassword').value;

    if (!getPassward) {
        alert("Please enter password😘")
        throw Error
    }

    const fetchAuthTokens = await fetchAuthToken(getPassward)
    // fetchAuthTokens.backendRequestToken
    getPassward = ""

    if (fetchAuthTokens.token != 13232) {
        alert("Authorization failed")
        throw Error
    } else {

        showIndexHtml();
        
        localStorage.setItem("secretToken", fetchAuthTokens.backendRequestToken);
        let footerTokenDisplay = document.getElementById("footerAcessToken")

    
        footerTokenDisplay.innerHTML = `You're logged in`
        
        
    }

}


async function fetchAuthToken(inputPassword) {
    try {
        const request = await fetch('https://9d72-221-248-80-202.ngrok-free.app/yuhoAuth', {
        // const request = await fetch('https://d551-153-150-176-69.ngrok-free.app/yuhoAuth', {
            method: "POST",
            headers: new Headers({
                "ngrok-skip-browser-warning": "23423423",
            }),
            body: JSON.stringify({ inputPassword })
        });

        const json = await request.json();
        token = json.authToken
        backendRequestToken = json.backendRequestToken

        return { token, backendRequestToken };


    } catch (error) {
        alert("Internal server error:)\nYour password might be incorrect😗😘\nOtherwise, the server is not running🏃")
    }
}



async function showIndexHtml() {
     document.getElementById('signin').style.display = 'none'
     document.getElementById('indexFrame').style.display = 'block';
}




const inputPassward = document.getElementById('inputPassword');
inputPassward.addEventListener("keypress", function (event) {

    if (event.key == "Enter") {
        event.preventDefault();
        falseToTrue();

    }
});



async function fetchData () {
    const request = await fetch('http://localhost:4000/', {
        method: "get",
        headers: new Headers({
            "ngrok-skip-browser-warning": "23423423",
        }),
    });

    const json = await request.json();
    const jsonFinal = json.responseData

    console.log(jsonFinal)

    return jsonFinal;
}

fetchData()


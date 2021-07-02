function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSucceed, locationError);
    }
    else {
        alert("your browser does not support locaton")
    }
}

function displayWeather(res) {
    var p = document.getElementById('result');
    p.innerHTML = `the temperature is: ${res.current.temp}https://www.google.com/url?sa=i&url=https%3A%2F%2Ffavpng.com%2Fpng_view%2Fsymbol-fahrenheit-degree-symbol-celsius-png%2FHfxuvtZe&psig=AOvVaw3RZbqqMtG9RHRYYpxCnFC0&ust=1625113944979000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCODrs8HDvvECFQAAAAAdAAAAABAJ
    current skies: ${res.current.weather[0].description}`;

}

function locationSucceed(position) {
    console.log("current location", position);

    let data = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };




    $.ajax({
        url: '/api/weather',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            console.log("Server says: ", res);
            displayWeather(res)
            console.log("current temp: ", res.current.temp);
            console.log("current desc: ", res.current.weather[0].description);

        },
        error: function (err) {
            console.error("Error getting weather", err);
        },




    });


}



function locationError() {
    console.error("error getting location");
}



function init() {
    console.log("weather page!")

    getLocation();
}




window.onload = init;

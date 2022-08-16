var selectedEvent;

giphy_api_key = "zKsrL3sONOeU92wG57qelrE2JHo6YYuq"

function getDetails () {
    fetch ("https://app.ticketmaster.com/discovery/v2/events.json?keyword=sport&apikey=L1f0qVkObKA2D1lhYQU448E7zden8lo0")
    .then(function (eventdata) {
        return eventdata.json();
    })
    .then(function (eventList) {
        console.log(eventList)
        listEvents(eventList)
        getGiphy();
    });
}

getDetails();
// getGiphy();

// for (i in eventList) 
function listEvents (eventList){
    var createList = $("ul");
    // console.log(Object.keys(eventList))
    // console.log(eventList._embedded.events[0].name)
    var listLenght = (eventList._embedded.events).lenght;
    console.log(listLenght)
    for (i=0; i<20; i++) {
        // console.log(i)
        var listContent = eventList._embedded.events[i].name;
        // console.log(listContent)
        var listItem = $("<li>")
        listItem.text(listContent)
        createList.append(listItem)
    }
    
}

var firstChildUl = document.getElementById("first-child-ul");

function getGiphy () {
    fetch ("https://api.giphy.com/v1/gifs/search?q=BostonRedSox&apikey=zKsrL3sONOeU92wG57qelrE2JHo6YYuq")
    .then(function (giphydata) {
        return giphydata.json();
    })
    .then(function (gif) {
        console.log(gif)
        getGifURL(gif)
    });
    // getdetails();
}

function getGifURL (gif) {
    // var imageURL = "null"
    var imageURL = gif.data[0].images.original.url;
    showGif(imageURL)

}
function showGif (imageURL) {
    var image = document.getElementById("#first-image");
    console.log(imageURL)
    console.log(typeof(imageURL))
    // image.setAttribute("src", imageURL)
    $("#first-image").attr("src", imageURL)
}
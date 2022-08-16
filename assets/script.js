var inputField = $("#searchContent");
var selectedEvent = "";

function getDetails (selectedEvent) {
    console.log(selectedEvent)
    fetch ("https://app.ticketmaster.com/discovery/v2/events.json?keyword="+selectedEvent+"&apikey=L1f0qVkObKA2D1lhYQU448E7zden8lo0")
    .then(function (eventdata) {
        return eventdata.json();
    })
    .then(function (eventList) {
        console.log(eventList)
        listEvents(eventList)
        getGiphy();
    });
}

function listEvents (eventList){
    var eventData = $("#eventData");
    for (i=0; i<20; i++) {
        if (i === 19) {
            var listContent = eventList._embedded.events[i].name;          
            var listItem = $("<li>")
            listItem.text(listContent)
            eventData.append(listItem)
        } else  if (i === 10) {
            var listContent = eventList._embedded.events[i].name;          
            var listItem = $("<li>")
            listItem.text(listContent)
            eventData.append(listItem)
        } else  if (i === 0) {
            var listContent = eventList._embedded.events[i].name;          
            var listItem = $("<li>")
            listItem.text(listContent)
            eventData.append(listItem)
        }
    }
    
}

function getGiphy () {
    fetch ("https://api.giphy.com/v1/gifs/search?q=BostonRedSox&apikey=zKsrL3sONOeU92wG57qelrE2JHo6YYuq")
    .then(function (giphydata) {
        return giphydata.json();
    })
    .then(function (gif) {
        console.log(gif)
        getGifURL(gif)
    });
}

function getGifURL (gif) {
    var imageURL = gif.data[0].images.original.url;
    showGif(imageURL)

}
function showGif (imageURL) {
    var image = document.getElementById("#first-image");
    console.log(imageURL)
    console.log(typeof(imageURL))
    $("#first-image").attr("src", imageURL)
}

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    selectedEvent = inputField.val()
    getDetails(selectedEvent);
})

$("#searchContent").on("click", function (event) {
    $("li").remove;
})
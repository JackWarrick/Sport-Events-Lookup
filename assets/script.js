var inputField = $("#searchContent");
var selectedEvent = "";
var joinName = "";
var gifList = [];
var gifURLList = [];
var giphyCall = "";

function getDetails (selectedEvent) {
    fetch ("https://app.ticketmaster.com/discovery/v2/events.json?keyword="+selectedEvent+"&apikey=L1f0qVkObKA2D1lhYQU448E7zden8lo0")
    .then(function (eventdata) {
        return eventdata.json();
    })
    .then(function (eventList) {
        listEvents(eventList)
    });
}

function listEvents (eventList){
    var eventData = $("#eventData");
    for (i=0; i<20; i++) {
        if (i === 19) {
            var listContent = eventList._embedded.events[i].name;   
            var linkContent = eventList._embedded.events[i].url;       
            var listItem = $("<li>")
            var linkToEvent = $("<a>")
            var image = $("<img>")
            listItem.addClass("event")
            linkToEvent.addClass("event")
            image.addClass("event")
            listItem.text(listContent)
            linkToEvent.html("<a href="+linkContent+" target='_blank'>Link to the event</a>")
            image.attr("id", "first-image");
            eventData.append(listItem)
            eventData.append(linkToEvent)
            eventData.append(image)
            console.log(listContent)
            var joinName = listContent.split("vs.")[0]
            var splitArray = []
            var words = joinName.split(" ")
            splitArray.push(words)
            var gifName3 = splitArray.join("-")
            gifList.push(gifName3);
        } else  if (i === 10) {
            var listContent = eventList._embedded.events[i].name;   
            var linkContent = eventList._embedded.events[i].url;       
            var listItem = $("<li>")
            var linkToEvent = $("<a>")
            var image = $("<img>")
            listItem.addClass("event")
            linkToEvent.addClass("event")
            image.addClass("event")
            listItem.text(listContent)
            linkToEvent.html("<a href="+linkContent+" target='_blank'>Link to the event</a>")
            image.attr("id", "second-image");
            eventData.append(listItem)
            eventData.append(linkToEvent)
            eventData.append(image)
            var joinName = listContent.split("vs.")[0]
            var splitArray = []
            var words = joinName.split(" ")
            splitArray.push(words)
            var gifName2 = splitArray.join("-")
            gifList.push(gifName2);
        } else  if (i === 0) {
            var listContent = eventList._embedded.events[i].name;   
            var linkContent = eventList._embedded.events[i].url;       
            var listItem = $("<li>")
            var linkToEvent = $("<a>")
            var image = $("<img>")
            listItem.addClass("event")
            linkToEvent.addClass("event")
            image.addClass("event")
            listItem.text(listContent)
            linkToEvent.html("<a href="+linkContent+" target='_blank'>Link to the event</a>")
            image.attr("id", "third-image");
            eventData.append(listItem)
            eventData.append(linkToEvent)
            eventData.append(image)
            var joinName = listContent.split("vs.")[0]
            var splitArray = []
            var words = joinName.split(" ")
            splitArray.push(words)
            var gifName = splitArray.join("-")
            gifList.push(gifName)
        }
    }
    callGiphy();
    
}

function callGiphy () {
    console.log(gifList)
    for (a=0; a<3; a++) {
        giphyCall = gifList[a];
        getGiphy(giphyCall)
    }
}

function getGiphy (giphyCall) {
    console.log("call " + giphyCall)
    fetch ("https://api.giphy.com/v1/gifs/search?q="+giphyCall+"&apikey=zKsrL3sONOeU92wG57qelrE2JHo6YYuq")
    .then(function (giphydata) {
        return giphydata.json();
    })
    .then(function (gif) {
        getGifURL(gif)
    });
}

function getGifURL (gif) {
    var imageURL = gif.data[0].images.original.url;
    gifURLList.push(imageURL)
    console.log(gifURLList)
    showGif()

}

function showGif () {
    $("#first-image").attr("src", gifURLList[0])
    $("#second-image").attr("src", gifURLList[1])
    $("#third-image").attr("src", gifURLList[2])
}

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    selectedEvent = inputField.val()
    getDetails(selectedEvent);
})

// $("#searchContent").on("click", function () {
//     $(".event").remove();
// })
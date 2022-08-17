var myAPIKey = "SAXntyHmrGZmWaUuGDNAikMs0GesRqm7";
var attilaKey = "L1f0qVkObKA2D1lhYQU448E7zden8lo0";
var inputField = $("#searchContent");
var selectedEvent = "";
var searchedEvents = [];//List of events currently displayed
var savedLinks = [];//List of links the user saved

//This function runs on startup and populates page with saved links from local storage
function initialize(){
    if(!JSON.parse(localStorage.getItem("saved-events"))){
        return;
    }
    var locEvents = JSON.parse(localStorage.getItem("saved-events"));
    savedLinks = locEvents;
    for(var i = 0; i < savedLinks.length; i++){
        var eventObject = savedLinks[i];
        var eventName = eventObject.name;
        var $newLink = $("<a>");
        $newLink.attr("href", eventObject.url);
        $newLink.attr("target", "_blank");//opens the link in a new browser tab when user clicks on it
        $newLink.text(eventName);
        $("#savedLinks").append($newLink);
    }
}

function getDetails (selectedEvent) {
    console.log(selectedEvent)
    fetch ("https://app.ticketmaster.com/discovery/v2/events.json?keyword="+selectedEvent+"&apikey=" + myAPIKey)
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
            var saveBtn = $("<button>");
            saveBtn.addClass("save-event ml-2 my-2 p-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded");
            saveBtn.attr("data-index", searchedEvents.length);
            saveBtn.text("Save");
            listItem.append(saveBtn);
            eventData.append(listItem)
            searchedEvents.push(eventList._embedded.events[i]);
        } else  if (i === 10) {
            var listContent = eventList._embedded.events[i].name;          
            var listItem = $("<li>")
            listItem.text(listContent)
            var saveBtn = $("<button>");
            saveBtn.addClass("save-event ml-2 my-2 p-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded");
            saveBtn.attr("data-index", searchedEvents.length);
            saveBtn.text("Save");
            listItem.append(saveBtn);
            eventData.append(listItem)
            searchedEvents.push(eventList._embedded.events[i]);
        } else  if (i === 0) {
            var listContent = eventList._embedded.events[i].name;          
            var listItem = $("<li>")
            listItem.text(listContent)
            var saveBtn = $("<button>");
            saveBtn.attr("class", "save-event ml-2 my-2 p-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded");
            saveBtn.attr("data-index", searchedEvents.length);
            saveBtn.text("Save");
            listItem.append(saveBtn);
            eventData.append(listItem)
            searchedEvents.push(eventList._embedded.events[i]);
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

//Saves the event to local storage and append event to saved links
$("#eventData").on("click", ".save-event", function (event) {
    var eventObject = searchedEvents[event.target.getAttribute("data-index")];//searchedEvents = [{eventObject}, {eventObject}, ....]
    var eventName = eventObject.name;

    //Checks if event already exists
    if(JSON.parse(localStorage.getItem("saved-events"))){
        for(var i = 0; i < savedLinks.length; i++){//locStore = [{object1}, {object2}, {object3}....]
            if(eventObject.id == savedLinks[i].id){
                console.log("This item already exists");
                return;
            }
        }
    }

    //Creates a new link here
    var $newLink = $("<a>");
    $newLink.attr("href", eventObject.url);
    $newLink.attr("target", "_blank");
    $newLink.text(eventName);
    $("#savedLinks").append($newLink);
    savedLinks.push(eventObject);
    localStorage.setItem("saved-events", JSON.stringify(savedLinks));
})

initialize();
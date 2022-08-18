var myAPIKey = "SAXntyHmrGZmWaUuGDNAikMs0GesRqm7";
var attilaKey = "L1f0qVkObKA2D1lhYQU448E7zden8lo0";
var inputField = $("#searchContent");
var selectedEvent = "";
var joinName = "";
var gifList = [];
var gifURLList = [];
var giphyCall = "";

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
        $newLink.addClass("underline underline-offset-1")
        $("#savedLinks").append($newLink);
    }
}

//Call ticketmaster API for the netered event type i.e.:football, baseball
function getDetails (selectedEvent) {
    fetch ("https://app.ticketmaster.com/discovery/v2/events.json?keyword="+selectedEvent+"&apikey=" + myAPIKey)
    .then(function (eventdata) {
        return eventdata.json();
    })
    .then(function (eventList) {
        console.log(eventList)
        listEvents(eventList)
    });
}

// Dispalys event and link to event on screen, creats image element for gif
function listEvents (eventList){
    gifList.length = [];
    gifURLList = [];
    var eventData = $("#innerData");
    var eventData2 = $("#innerData2");
    var eventData3 = $("#innerData3");
    for (i=0; i<20; i++) {
        if (i === 19) {
            var listContent = eventList._embedded.events[i].name;   
            var linkContent = eventList._embedded.events[i].url;       
            var listItem = $("<li>");
            var linkToEvent = $("<a>");
            var image = $("<img>");
            listItem.addClass("event");
            linkToEvent.addClass("event");
            image.addClass("event");
            listItem.text(listContent);
            linkToEvent.html("<a href="+linkContent+" target='_blank'>Click here for ticket info and seat map</a>");
            image.attr("id", "first-image");
            eventData3.append(listItem);
            eventData3.append(linkToEvent);
            eventData3.append(image);
            var joinName = listContent.split("vs.")[0];
            var splitArray = [];
            var words = joinName.split(" ");
            splitArray.push(words);
            var gifName3 = splitArray.join("-");
            gifList.push(gifName3);
            var saveBtn = $("<button>");
            saveBtn.addClass("save-event ml-2 my-2 p-1 bg-red-500 hover:bg-red-700 text-white font-bold rounded");
            saveBtn.attr("data-index", searchedEvents.length);
            saveBtn.text("Save");
            listItem.append(saveBtn);
            searchedEvents.push(eventList._embedded.events[i]);
            eventData3.attr("class", "inner_container border-solid border-4 border-red-500 rounded m-8 p-4");
        } else  if (i === 10) {
            var listContent = eventList._embedded.events[i].name;   
            var linkContent = eventList._embedded.events[i].url;       
            var listItem = $("<li>");
            var linkToEvent = $("<a>");
            var image = $("<img>");
            listItem.addClass("event");
            linkToEvent.addClass("event");
            image.addClass("event");
            listItem.text(listContent);
            linkToEvent.html("<a href="+linkContent+" target='_blank'>Click here for ticket info and seat map</a>");
            image.attr("id", "second-image");
            eventData2.append(listItem);
            eventData2.append(linkToEvent);
            eventData2.append(image);
            var joinName = listContent.split("vs.")[0];
            var splitArray = [];
            var words = joinName.split(" ");
            splitArray.push(words);
            var gifName2 = splitArray.join("-");
            gifList.push(gifName2);
            var saveBtn = $("<button>");
            saveBtn.addClass("save-event ml-2 my-2 p-1 bg-red-500 hover:bg-red-700 text-white font-bold rounded");
            saveBtn.attr("data-index", searchedEvents.length);
            saveBtn.text("Save");
            listItem.append(saveBtn);
            searchedEvents.push(eventList._embedded.events[i]);
            eventData2.attr("class", "inner_container border-solid border-4 border-red-500 rounded m-8 p-4");
        } else  if (i === 0) {
            var listContent = eventList._embedded.events[i].name;   
            var linkContent = eventList._embedded.events[i].url;       
            var listItem = $("<li>");
            var linkToEvent = $("<a>");
            var image = $("<img>");
            listItem.addClass("event");
            linkToEvent.addClass("event");
            image.addClass("event");
            listItem.text(listContent);
            linkToEvent.html("<a href="+linkContent+" target='_blank'>Click here for ticket info and seat map</a>");
            image.attr("id", "third-image");
            eventData.append(listItem);
            eventData.append(linkToEvent);
            eventData.append(image);
            var joinName = listContent.split("vs.")[0];
            var splitArray = [];
            var words = joinName.split(" ");
            splitArray.push(joinName);
            var gifName = splitArray.join("-");
            gifList.push(gifName);
            var saveBtn = $("<button>");
            saveBtn.attr("class", "save-event ml-2 my-2 p-1 bg-red-500 hover:bg-red-700 text-white font-bold rounded");
            saveBtn.attr("data-index", searchedEvents.length);
            saveBtn.text("Save");
            listItem.append(saveBtn);
            searchedEvents.push(eventList._embedded.events[i]);
            eventData.attr("class", "inner_container border-solid border-4 border-red-500 rounded m-8 p-4");

        }
    }
    callGiphy();    
}

// Calls giphy API for the 3 displayed events
function callGiphy () {
    for (a=0; a<3; a++) {
        giphyCall = gifList[a];
        getGiphy(giphyCall);
    }
}

// Giphy API call
function getGiphy (giphyCall) {
    fetch ("https://api.giphy.com/v1/gifs/search?q="+giphyCall+"&apikey=zKsrL3sONOeU92wG57qelrE2JHo6YYuq")
    .then(function (giphydata) {
        return giphydata.json();
    })
    .then(function (gif) {
        getGifURL(gif);
    });
}

// Gets url for gifs to dispaly
function getGifURL (gif) {
    var imageURL = gif.data[0].images.original.url;
    gifURLList.push(imageURL);
    showGif();
}

// Adds content to image elements
function showGif () {
    $("#first-image").attr("src", gifURLList[0]);
    $("#second-image").attr("src", gifURLList[1]);
    $("#third-image").attr("src", gifURLList[2]);
}

// Event listener for search button
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    selectedEvent = inputField.val();
    getDetails(selectedEvent);
})

//Event listener for clear history
$("#resetBtn").on("click", function () {
    localStorage.clear();
    location.reload();
})

//Event listener for enter key
$("#searchContent").keypress(function (enter) {
    if (enter.which === 13) {
        selectedEvent = inputField.val();
        getDetails(selectedEvent);
    }
})

//Remove previus search content
$("#searchContent").on("click", function (event) {
    gifList = [];
    gifURLList = [];
    $("li").remove();
    $("img").remove();
    $("a.event").remove();
    $(".inner_container").attr("class", "inner_container");

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
    $newLink.addClass("underline underline-offset-1")
    $newLink.text(eventName);
    $("#savedLinks").append($newLink);
    savedLinks.push(eventObject);
    localStorage.setItem("saved-events", JSON.stringify(savedLinks));
})

initialize();


$(document).ready(function() {

    //These are our topics for Gifs to choose from
        var topics = ["Happy", "Fun", "Sad", "Celebrate"];
    
    //This is the function to create the bottons for the topice.
        function renderButtons() {
    
                $("#topicButtons").empty();
    
                for (var i = 0; i < topics.length; i++) {
                  var a = $("<button>");
                  a.addClass("gifs");
    
                  a.attr("data-name", topics[i]);
                  a.text(topics[i]);
                  $("#topicButtons").append(a);
                }
              }
    
           $("#add-gif").on("click", function(event) {
    
            event.preventDefault();
    
            var gif = $("#gif-input").val().trim();
    
            topics.push(gif);
    
            renderButtons();
          });
    
    //Calling the function button
            renderButtons();
    
    //This is the function that is pulling the gifs from the giffy webpage.
        function GifSearch(){
          $("#gifsDiv").html(" ")
          //console.log(this);
          var name = $(this).attr('data-name');
          var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=";
          var APIkey = "dc6zaTOxFJmzC&limit=10";
          $.ajax({
            url: queryURL+APIkey,
            method: "GET"
          }).done(function(response){
            //console.log(this);
              for (i=0; i<response.data.length; i++) {
              var g = $("<img>");
              var t = $("<div>");
              var br = $("<br>");
    
              //this creates an image
                g.attr("src", response.data[i].images.original_still.url);
                g.attr("data-still", response.data[i].images.original_still.url);
                g.attr("data-animated", response.data[i].images.original.url);
                g.attr("data-isstill","true");
                g.addClass('giffy');
                t.text("Rating: " + response.data[i].rating);
                t.addClass('ratingDiv');
    
                t.append(br);
                t.append(g);
                $("#gifsDiv").append(t);
    
              // $("#gifsDiv").append(g);
              // $("#gifsDiv").append(t);
    
              console.log(response.data[i].rating);
              }
          })
        }
    
    //These are the click commands to search for the gifs.
    $(document).on("click", ".gifs", GifSearch);
    
    //These are the click commands to start and stop the gifs.
    $(document).on("click", ".giffy", activateGIF);
    
    
    //This is the function to start and stop the gifs when clicking
    //by switching out the still image with the animated image
    function activateGIF (){
      var ourButton = this;
      var animatedLink = $(ourButton).attr('data-animated');
      var stillLink = $(ourButton).attr('data-still');
    
      console.log(this);
    
      var gifIsStill = $(ourButton).attr('data-isstill');
    
      console.log(gifIsStill);
    
      if(gifIsStill === 'true'){
        // we want to show our animations
        
        $(ourButton).attr('src', animatedLink);
        $(ourButton).attr('data-isstill', 'false');
      }
      else{
        //this will show when the pic is animated
        $(ourButton).attr('src', stillLink);
        $(ourButton).attr('data-isstill', 'true');
      }
    
    }
    
    });
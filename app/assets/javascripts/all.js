computed_latitude = 150.644;
computed_longitude = -34.397;

map = null;
function initMap() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            computed_latitude = pos.lat;
            computed_longitude = pos.lng;

            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: computed_latitude, lng: computed_longitude},
                zoom: 11
            });


            // fetch tweets
            console.log('Fetching tweets now...');
            $.ajax({
                url: "http://localhost:3000/api/map/show", // Route to the Script Controller method
                type: "GET",
                dataType: "json",
                data: {lat: computed_latitude, lng: computed_longitude}, // This goes to Controller in params hash, i.e. params[:file_name]
                complete: function () {
                },
                success: function (data, textStatus, xhr) {
                    console.log('Got the tweets... Drawing marker.');
              
                    for (var i = 0; i < data.length; i++) {
                        if (!($.isEmptyObject(data[i].geo))) {
                            var computed_latitude = data[i].geo.coordinates[0];
                            var computed_longitude = data[i].geo.coordinates[1];
                            myLatlng = {lat: computed_latitude, lng: computed_longitude};
                            marker = new google.maps.Marker({
                                position: myLatlng,
                                map: map,
                                title: "Click to view tweet",
                            });
                           hook_event_listener(marker, data[i].user.screen_name, data[i].id_str, data[i].user.profile_image_url, data[i].created_at, data[i].text);

                        }else {
                       console.log("TweeteEpmtyLat-Long: " + data[i].id_str + "  User: " + data[i].user.screen_name);
                        }

                    }
                },

                error: function () {
                    alert("Ajax error!")
                }
            });
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    


}
// open tweet in new tab
function open_url(name, id) {
window.open('https://twitter.com/'+ name  + '/status/' + id, '_blank');
}

// open tweet in new tab and display profile picture on mousehover

function hook_event_listener(marker, name, id, img, date, des) {
  
  marker.addListener('click', function() {
    open_url(name, id); // click to open url
  });

  
  marker.addListener('mouseout', function() {
    infowindow.close(map, marker);
  });
  marker.addListener('mouseover', function() {
    
    //html thumb image display string              
    var contentString = '<div>'+
                        '<img class="thumbnail popup-th-img" src="'+img+'" alt="'+name+'">'+
                      '<h3>'+name+'</h3>'+des+
                      '</p>'+
                    '</div>';

    //create new object infowindow
    infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 400
    });
    //invoke infowindow Object
    infowindow.open(map, marker);
          
              });
} // End of hook_event_listener function


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

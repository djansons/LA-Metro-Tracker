var urlPredictions = "http://api.metro.net/agencies/lametro-rail/routes/802/stops/80209/predictions/"

function getArrivalPredicitons(){

    $(document).ready(function(){
        $.getJSON(urlPredictions, function(result){
         for (var i = 0; i < result.items.length; i++) {
           var seconds = result.items[i].seconds; 
           var minutes = result.items[i].minutes; 
           var runID = result.items[i].run_id;
           
           var stopPosition = new google.maps.LatLng(stopLat, stopLong);
           stopMarkers[i] = new google.maps.Marker({
             lat: stopLat, 
             lng: stopLong, 
             map: map,
             icon: markerIcon,
             position: stopPosition,
             label: {
              text: result.items[i].display_name,
              fontSize: "10px",
              fontWeight: "bold"
              }});
             
           //stopMarkers[i].setPosition( new google.maps.LatLng(stopLat, stopLong) );
           }
        });
     });

}
/* https://vimeo.com/144162102
JSON source (5:05) https://github.com/dariusk/corpora/blob/master/data/animals/routes_antarctica.json
Video referenced (9:05)"createP from DOM" https://vimeo.com/142698165 */








var map;
var centre;

var redLineStopsUrl = 'http://api.metro.net/agencies/lametro-rail/routes/802/stops/?callback=?';

var marker = new Array();
var stopMarkers = new Array();

var xmlTxt;

var xmlVehicles;

var vehicleLat, vehicleLon;



const xhr = new XMLHttpRequest();

function initMap() {
  centre = {lat: 33.942281, lng:  -118.137163};
  map = new google.maps.Map( document.getElementById('map'), {zoom: 11, center: centre});
  setupMarkers();
  setInterval(updateMarkers, 5000);
  drawLine();

    /* Change markers on zoom */
  google.maps.event.addListener(map, 'zoom_changed', function() {
  var zoom = map.getZoom();
  // iterate over markers and call setVisible
  console.log('Hello');
  for (i = 0; i < stopMarkers.length; i++) {
      stopMarkers[i].setVisible(false);
  }
  });

  }



  
  

function setupMarkers() {
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4){
      if (xhr.status == 200){
        xmlTxt = xhr.responseXML;
        xmlVehicles = xmlTxt.getElementsByTagName('vehicle');
        for(i=0; i<xmlVehicles.length; i++){
          vehicleLat = xmlVehicles[i].getAttribute('lat');
          vehicleLon = xmlVehicles[i].getAttribute('lon');
          marker[i] = new google.maps.Marker({lat: vehicleLat, lng:  vehicleLon, map: map, icon: 'redTrain0.png'});
          marker[i].setPosition( new google.maps.LatLng(vehicleLat, vehicleLon) );
        }
        
        document.getElementById("latVal").innerHTML = vehicleLat;
        document.getElementById("longVal").innerHTML = vehicleLon;


        var markerIcon = {
          url: 'Station.png',
          scaledSize: new google.maps.Size(20, 20),
          //origin: new google.maps.Point(0, 0),
          //anchor: new google.maps.Point(32,65),
          labelOrigin: new google.maps.Point(40,33)
        };


        $(document).ready(function(){
          $.getJSON(redLineStopsUrl, function(result){
           for (var i = 0; i < result.items.length; i++) {
             var stopLat = result.items[i].latitude; 
             var stopLong = result.items[i].longitude; 
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
  
      if(xhr.status == 404){
        console.log('File or resourse not found');
      }
    }
  };
  
  xhr.open('get', 'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=lametro-rail&r=802&t=1000', true);
  xhr.send();
  
}


function drawLine(){

  var stopCoordinates = [
    {lat: 34.1684999, lng: -118.37681},//North Hollywood
    {lat: 34.1399999, lng: -118.3627},//Universal
    {lat: 34.1015499, lng: -118.33855},//Highland
    {lat: 34.1016299, lng: -118.32518},//vine
    {lat: 34.1017399, lng: -118.30812},//western
    {lat: 34.0977099, lng: -118.29176},//sunset
    {lat: 34.0899099, lng: -118.29173},//santa monica
    {lat: 34.0765299, lng: -118.29169},//beverly
    {lat: 34.0626999, lng: -118.29008},//wilshire
    {lat: 34.0563699, lng: -118.27488},//westlake
    {lat: 34.0486299, lng: -118.25868},//7th street
    {lat: 34.0493199, lng: -118.25126},//pershing
    {lat: 34.0548999, lng: -118.24606},//civic center
    {lat: 34.0561999, lng: -118.23425},//union
  ]; 

    var flightPath = new google.maps.Polyline({
      path: stopCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
     flightPath.setMap(map);
  }
  
function gotData(data){  
   console.log(data);
 }



function updateMarkers(){
    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4){
        if (xhr.status == 200){
          xmlTxt = xhr.responseXML;
          console.log(xmlTxt);
          xmlVehicles = xmlTxt.getElementsByTagName('vehicle');
          for(i=0; i<xmlVehicles.length; i++){
            vehicleLat = xmlVehicles[i].getAttribute('lat');
            vehicleLon = xmlVehicles[i].getAttribute('lon');
            var markerAngle = xmlVehicles[i].getAttribute('heading');
            marker[i].setPosition( new google.maps.LatLng(vehicleLat, vehicleLon) );
            switch (xmlVehicles[i].getAttribute('heading')){
              
              case '0':
              marker[i].setIcon('redTrain0.png');
              break;

              case '90':
              marker[i].setIcon('redTrain90.png');
              break;

              case '180':
              marker[i].setIcon('redTrain180.png');
              break;

              case '270':
              marker[i].setIcon('redTrain270.png');
              break;

            }
            
            
          }
          
          document.getElementById("latVal").innerHTML = vehicleLat;
          document.getElementById("longVal").innerHTML = vehicleLon;
          
          
    
        }
    
        if(xhr.status == 404){
          console.log('File or resourse not found');
        }
      }
    };
    
    xhr.open('get', 'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=lametro-rail&r=802&t=1000', true);
    xhr.send();
    

}









function draw() {



	
	/*if (routeData){
		for (var i = 0; i < routeData.items.length; i++) {
			createElement('h1', routeData.items[i].id);
			createDiv(routeData.items[i].display_name);
			}
	}*/


  
}


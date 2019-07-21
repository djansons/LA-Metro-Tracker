/* https://vimeo.com/144162102
JSON source (5:05) https://github.com/dariusk/corpora/blob/master/data/animals/routes_antarctica.json
Video referenced (9:05)"createP from DOM" https://vimeo.com/142698165 */



var routeData;

var x;

var map;

var centre;

var url = "http://api.metro.net/agencies/lametro/routes/4/vehicles/";

var redLineStopsUrl = 'http://api.metro.net/agencies/lametro-rail/routes/802/stops/?callback=?';


var lat=0;
var long=0;

var busPos; 

var marker = new Array();
var stopMarkers = new Array();

var xmlTxt;

var xmlLat, xmlLong;
var xmlLatHTML, xmlLongHTML;

var txt, txt1;

//var redLine = [new google.maps.L]

const xhr = new XMLHttpRequest();

function initMap() {
  centre = {lat: 33.942281, lng:  -118.137163};
  map = new google.maps.Map(
  document.getElementById('map'), {zoom: 11, center: centre});
  //marker[0] = new google.maps.Marker({lat: 33.942281, lng:  -118.137163, map: map});
  //marker[0].setPosition( new google.maps.LatLng(33.942281, -118.137163) );
  //setInterval(getLocations, 5000);
  
  setupMarkers();
  

  
  
  setInterval(updateMarkers, 5000);
  //setInterval(updateTime, 5000);
  drawLine();
  }


function stopsData(data){
  for (var i = 0; i < data.items.length; i++) {
    var stopLat = data.items[i].latitude; 
    var stopLong = data.items[i].longitude; 

    console.log(stopLat + stopLong)
    marker[i] = new google.maps.Marker({lat: stopLat, lng: stopLong, map: map});
    }


}


function setup() {
  
  
  
  

}


function setupMarkers() {
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4){
      if (xhr.status == 200){
        xmlTxt = xhr.responseXML;
        xmlLat = xmlTxt.getElementsByTagName('vehicle');
        for(i=0; i<xmlLat.length; i++){
          txt = xmlLat[i].getAttribute('lat');
          txt1 = xmlLat[i].getAttribute('lon');
          marker[i] = new google.maps.Marker({lat: txt, lng:  txt1, map: map, icon: 'redTrain0.png'});
          marker[i].setPosition( new google.maps.LatLng(txt, txt1) );
        }
        
        document.getElementById("latVal").innerHTML = txt;
        document.getElementById("longVal").innerHTML = txt1;


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
  
function updateTime(){

  var epochTime = new Date();
  var timestamp = epochTime.getTime()/1000 + epochTime.getTimezoneOffset() * 60
  var timeURL = 'https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=' + timestamp + '&key=AIzaSyBPVL26qvawqmHHVfNhdmbjgPcGcsErkz0';
  $.getJSON(timeURL, function(result){  
    var dstOffset = result.dstOffset;
    var rawOffset = result.rawOffset;
    var offsets = dstOffset * 1000 + rawOffset * 1000;
    var localDate = new Date(timestamp * 1000 + offsets)
    console.log(localDate);
  });
 
  
  


  //var timeData;
  //var time;
  //loadJSON(timeURL, gotData, 'jsonp');
  
  //   $.getJSON(timeURL, function(result){
      
  //     console.log(result);
  // });
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
          xmlLat = xmlTxt.getElementsByTagName('vehicle');
          for(i=0; i<xmlLat.length; i++){
            txt = xmlLat[i].getAttribute('lat');
            txt1 = xmlLat[i].getAttribute('lon');
            var markerAngle = xmlLat[i].getAttribute('heading');
            marker[i].setPosition( new google.maps.LatLng(txt, txt1) );
            switch (xmlLat[i].getAttribute('heading')){
              
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
          
          document.getElementById("latVal").innerHTML = txt;
          document.getElementById("longVal").innerHTML = txt1;
          
    
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


function createClinicsMap(){
    fetch('/clinics-data').then(function(response) {
      return response.json();
    }).then((clinics) => {
      const map = new google.maps.Map(document.getElementById('map'), {
        // Centered at this location because it was the most central 
        // to the data I was using
        center: {lat: 45.56602083, lng: -94.1503188},
        zoom:7
      });

      clinics.forEach((clinic) => {
          addLandmark(map, clinic.lat, clinic.lng, clinic.title, clinic.address, 
            clinic.phoneNum, clinic.services)
      });
    });
  }

  /** Adds a marker that shows an info window when clicked. */
  function addLandmark(map, lat, lng, title, address, phoneNum, services){

    var contentString = "<h1>" + title + "</h1>" + "<br>" + "<h4>"+ 
    address + "</h4>" + "<br>" + "<h4>" + phoneNum + "</h4>" + "<br>" 
    + "<p> <b>" + "Services" + "</b> <br>" + services + "</p>";

    const infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    const marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      title: title
    });
    
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  }
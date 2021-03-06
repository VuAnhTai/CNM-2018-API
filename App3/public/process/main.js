$(function() {
  $.get('/renewtoken', resp => {
    if(resp.error) {
        $('#manage_content').hide();
        $('#map').hide();
        $('#sign_in_container').show();
        return;
    }
    $('#sign_in_container').hide();
    $('#manage_content').show();
    $('#map').show();
});

$('#sign_in').click(e => {
    e.preventDefault();
    const username = $('#username').val() || '';
    const password = $('#password').val() || '';
    if(username == '' || password == '') return swal('WARNING','Chưa nhập username hoặc password','warning');

    $.post('/signin' , {username , password} , resp => {
        if(resp.error) return swal('FAIL','Sai tên tài khoản hoặc mật khẩu','error');
        $('#sign_in_container').hide(1000);
        $('#manage_content').show(1000);
        $('#map').show(1000);
    });
});

  const mapDiv = document.getElementById('map');
  const myLocation = new google.maps.LatLng(10.8230989, 106.6296638);
  const mapOptions = {
    center: myLocation,
    zoom: 13,
    zoomControl: false,
    streetViewControl: false,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
  };
  const wattingRiders = [];
  const selectedRiders = [];

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 41.85, lng: -87.65}
  });
  directionsDisplay.setMap(map);
  // create map
  // const map = new google.maps.Map(mapDiv, mapOptions);

  // direction maps
  // const directionsService = new google.maps.DirectionsService;
  // const directionsDisplay = new google.maps.DirectionsRenderer;

  // socket.io
  const socket = io();
  socket.on('SEND_LIST_USERS' , rider => {
    $('#watting_selected').empty();
    $('#waiting_content').empty();
    rider.forEach(element => {
      if(element.status == 1){
        createSelectedContent(element);
      }
      if(element.status == 0){
        createWaitingContent(element);
      }
    });
  });
  socket.on('CHANGE_IN_DB', ()=>{
    window.location.reload();
  });
  // handle user watting car
  function createWaitingContent(rider) {   
    const {id , username, phone , user_lat, user_lng} = rider;
    const content = `
    <a id=${id} href="#" class="list-group-item list-group-item-action list-group-item-light">
      <img src="./resources/user_profile.png" alt="" />
      <div class="wrapper_profile">
          <h6>${username}(${phone})</h6>
          <p>${user_lat}, ${user_lng}</p>
      </div>
    </a>`;
    $('#waiting_content').append(content);
    wattingRiders.push(rider);
  }

  //handle user is picked up by driver
  function createSelectedContent(rider) {
    const {id, username, phone , driver, user_lng, user_lat} = rider;
    // remove watting rider
    const index = wattingRiders.findIndex(e => e.id == id);
    if(index >= 0) { // ton tai user o trang thai watting
      $(`#${id}`).remove();
      wattingRiders.splice(index , 1);
    }
    const content = `
    <div id="${id}" class="list-group-item list-group-item-action list-group-item-warning">
      <img src="./resources/user_profile.png" alt="" />
      <div class="wrapper_profile">
        <h6>${phone}</h6>
        <p>${user_lat}, ${user_lng}</p>
      </div>
      <div class="wrapper_profile_driver">
        <img src="./resources/taxi.png" alt="" />
        <h6>${driver}</h6>
      </div>
      <div class="action-btns d-flex flex-row-reverse">
        <button id="${id}111" type="button" class="btn btn-outline-danger btn-sm" id="show_direction">Show Direction</button>
        <button id="${id}222" type="button" class="btn btn-outline-success btn-sm">Drop down user</button>
      </div>
    </div>`;
    $('#watting_selected').append(content);
    selectedRiders.push(rider);

    $(`#${id}111`).off('click');
    $(`#${id}222`).off('click');

    $(`#${id}111`).on('click', e => {
      e.preventDefault();
      // show direction on map
      showDirection(rider);
    });

    $(`#${id}222`).on('click', e => {
      e.preventDefault();
      // update cars and save history
      // B1: delete data in array
      const index = selectedRiders.findIndex(e => e.id == id);
      selectedRiders.splice(index , 1);
      
      // B2: remove element in UI
      $(`#${id}`).remove();
    });
    
  }
  function showDirection(rider) {
    const {phone , username, user_lat, user_lng, lat, driver_lng} = rider;
    const pos_driver = {lat: parseFloat(lat), lng: parseFloat(driver_lng)};
    const pos_rider = {lat: parseFloat(user_lat), lng: parseFloat(user_lng)};
    const contentRider = `
    <div class="info-box-wrap">
      <img src="./resources/user_profile.png" />
      <div class="info-box-text-wrap">
        <h6 class="address">${phone}</h6>
        <p class="price">${user_lat}, ${user_lng}</p>
      </div>
    </div>`;
    const infoRider = new google.maps.InfoWindow({content: contentRider });
    const riderMarker = new google.maps.Marker({
      position: pos_rider,
      map: map,
      icon: './resources/user_false.png',
      title: 'Rider is waiting the diver'
    });
    const contentDriver = `
    <div class="info-box-wrap">
      <img src="./resources/driver_profile.png" />
      <div class="info-box-text-wrap">
        <h6 class="address">${username}</h6>
      </div>
    </div>`;
    const infoDriver = new google.maps.InfoWindow({content: contentDriver });
    const driverMarker = new google.maps.Marker({
      position: pos_driver,
      map: map,
      icon: './resources/car_blue.png',
      title: 'This is the vehicle'
    });

    // show infowindow
    // infoRider.open(map , riderMarker);
    infoDriver.open(map , driverMarker);

    calculateAndDisplayRoute(pos_driver , pos_rider);
    map.addListener('click', () => 
      hidden(driverMarker , riderMarker , infoDriver , infoRider)
    );
  } // end handle show direction

//   // handle direction
  function calculateAndDisplayRoute(vehiclePosMarker , userPosMarker) {
    
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#16a085'
      }
    });
    directionsService.route({
      origin: vehiclePosMarker,
      destination: userPosMarker,
      travelMode: 'DRIVING'
    }, (resp, status) => {
      if (status !== 'OK') return swal("Fail","Directions request failed due to " + status,"error");
      directionsDisplay.setDirections(resp);
    });
  } // end handle direction
  
});
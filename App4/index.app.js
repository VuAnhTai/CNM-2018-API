window.onload = function () {
}
var vm = new Vue({
    el: '#content-wrapper',
    data: {
        id: '',
        userName: '',
        password: '',
        driver:  {
            status: '1',
        },
        rider: '',
        loginVisible: true,
        requestsVisible: false,
        address: '',
        data_geocoder: {
            lat: '',
            lng: '',
        },
        your_location: {
            lat: '',
            lng: '',
        }
    },
    methods: {
        login: function () {
            var self = this;

            axios.post('http://localhost:3000/api/users/login', {
                    userName: self.userName,
                    password: self.password,
                })
                .then(function (response) {
                    if (response.data.auth != false) {
                        self.token = response.data.access_token;
                        self.refToken = response.data.refresh_token;
                        self.user = response.data.user;
                        self.requestsVisible = true;
                        self.loginVisible = false;
                        self.getDriver(self.user.id);
                        self.initMap();
                    } else {
                        alert(response.data.auth);
                    }
                })
        },
        getDriver: function (id) {
            var self = this;
            axios.get('http://localhost:3000/api/driver/get-driver', {
                    headers: {
                        token: self.token,
                        id: id
                    },
                })
                .then(function (response) {
                    self.driver = response.data[0];
                })
                .catch(function (error) {
                    if (error.response.status === 401) {
                        self.refreshToken();
                        return;
                    }
                }).then(function () {});
        },
        initMap: function () {
            var self = this;
            var infoWindow = new google.maps.InfoWindow;
            var map = new google.maps.Map(
                document.getElementById('map'), {
                    zoom: 18,
                    center: self.geocoder
                });
            self.getYourLocate(map, infoWindow);
        },
        getYourLocate: function (map, infoWindow) {
            var self = this;
            var geocoder = new google.maps.Geocoder();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                        self.data_geocoder.lat = position.coords.latitude;
                        self.data_geocoder.lng = position.coords.longitude;

                        var marker = new google.maps.Marker({
                            position: self.data_geocoder,
                            map: map,
                            draggable: true,
                        });
                        map.setCenter(self.data_geocoder);
                        infoWindow.setPosition(self.data_geocoder);
                        infoWindow.open(map, marker);
                        self.getAddressByMaker(map, infoWindow, marker, geocoder);
                        self.cityCircle(map);
                        self.updateLocationDriver(map, infoWindow, marker, geocoder);
                        // Update in database
                        axios.post('http://localhost:3000/api/driver/update-location', {
                                token: self.token,
                                id: self.user.id,
                                lat: self.your_location.lat,
                                lng: self.your_location.lng
                            }).then(function (response) {})
                            .catch(function (error) {
                                alert('Lỗi');
                            })
                        // draw radius 100m when move;
                    }),
                    function () {
                        self.handleLocationError(true, infoWindow, map.getCenter());
                    }
            } else {
                self.handleLocationError(false, infoWindow, map.getCenter());
            }
        },
        cityCircle: function (map, cityCircle) {
            var self = this;
            var cityCircle = new google.maps.Circle({
                strokeOpacity: 0.3,
                strokeWeight: 1,
                fillOpacity: 0.2,
                map: map,
                center: self.data_geocoder,
                radius: 100,
            });
            self.your_location.lat = self.data_geocoder.lat;
            self.your_location.lng = self.data_geocoder.lng;
        },
        updateLocationDriver: function (map, infoWindow, marker, geocoder) {
            var self = this;
            google.maps.event.addListener(marker, "dragend", function () {
                geocoder.geocode({
                        'location': marker.getPosition()
                    },
                    function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (self.haversine(self.your_location, results[0].geometry.location) > 0.1) {
                                alert('Your just move marker in radius < 100m');
                                marker.setPosition(self.data_geocoder);
                                map.setCenter(self.data_geocoder);
                                infoWindow.setContent(self.address);
                                infoWindow.open(map, marker);
                                self.cityCircle(map, cityCircle);
                            } else {
                                self.address = results[0].formatted_address;
                                self.data_geocoder.lat = results[0].geometry.location.lat();
                                self.data_geocoder.lng = results[0].geometry.location.lng();
                                infoWindow.setContent(self.address);
                                infoWindow.open(map, marker);
                                // self.cityCircle(map);
                            }

                        }
                    });
            });
        },
        getAddressByMaker: function (map, infoWindow, marker, geocoder) {
            var self = this;
            geocoder.geocode({
                    'location': marker.getPosition()
                },
                function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        self.address = results[0].formatted_address;
                        self.data_geocoder.lat = results[0].geometry.location.lat();
                        self.data_geocoder.lng = results[0].geometry.location.lng();
                        infoWindow.setContent(self.address);
                        infoWindow.open(map, marker);
                    }
                })
        },
        handleLocationError: function (browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        },
        haversine: function (start, end) {
            function toRad(x) {
                return x * Math.PI / 180;
            }

            var lat1 = start.lat;
            var lon1 = start.lng;

            var lat2 = end.lat();
            var lon2 = end.lng();

            var R = 6371; // km

            var x1 = lat2 - lat1;
            var dLat = toRad(x1);
            var x2 = lon2 - lon1;
            var dLon = toRad(x2)
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;

            return d;
        },
        requestDriver: function () {
            var self = this;
            self.driver.status = 0;
            $('#option1').addClass('btn-success');
            $('#option2').removeClass('btn-warning');
            axios.post('http://localhost:3000/api/request/requestDriver', {
                token: self.token,
            }).then(function (response) {
                self.rider = response.data[0];
                $('#open-modal').trigger('click');
            }) .catch(function (error) {
                if (error.response.status === 401) {
                    self.refreshToken();
                    return;
                }else{
                    alert('Lỗi');
                }
            })
        },
        driverBusy: function () {
            var self = this;
            $('#option1').removeClass('btn-success');
            $('#option2').addClass('btn-warning');
            self.driver.status = 1;
        },
        start: function () {
            var self = this;
            self.driver.status = 1;
            $('#option1').removeClass('btn-success');
            $('#option2').addClass('btn-warning');
            $('#start').hide();
            $('#finish').show();
        },
        finish: function () {
            var self = this;
            $('#option1').addClass('btn-success');
            $('#option2').removeClass('btn-warning');
            $('#finish').hide();
            self.driver.status = 0;
            axios.post('http://localhost:3000/api/request/updateStatus', {
                token: self.token,
                id: self.rider.id,
                status: 2,
            }).then(function (response) {
            }) .catch(function (error) {
                if (error.response.status === 401) {
                    self.refreshToken();
                    return;
                }else{
                    alert(error);
                }
            })
        },
        updateStatus: function (id, status) {
            var self = this;
            axios.post('http://localhost:3000/api/request/updateStatus', {
                token: self.token,
                id: id,
                status: status,
            }).then(function (response) {
            }) .catch(function (error) {
                if (error.response.status === 401) {
                    self.refreshToken();
                    return;
                }else{
                    alert(error);
                }
            })
        },
        showDirect: function () {
            var self = this;
            $('#start').show();
            axios.post('http://localhost:3000/api/request/updateLocationDriver', {
                token: self.token,
                id: self.rider.id,
                driver: self.driver.name,
                lat: self.driver.lat,
                lng: self.driver.lng,
                
            }).then(function (response) {
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer;
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 18,
                    center: {lat: Number(self.driver.lat), lng: Number(self.driver.lng)}
                  });
                directionsDisplay.setMap(map);
                self.calculateAndDisplayRoute(directionsService, directionsDisplay);
            }) .catch(function (error) {
                if (error.response.status === 401) {
                    self.refreshToken();
                    return;
                }else{
                    alert(error);
                }
            })
        },
        calculateAndDisplayRoute: function(directionsService, directionsDisplay){
            var self = this;
            var x = parseFloat(self.driver.lat);
            var y = parseFloat(self.driver.lng);
            var z = parseFloat(self.rider.user_lat);
            var w = parseFloat(self.rider.user_lng);
            console.log(self.rider);
            console.log(x,y, z, w);
            
            directionsService.route({
                origin: {lat: parseFloat(self.driver.lat), lng: parseFloat(self.driver.lng)},
                destination: {lat: parseFloat(self.rider.user_lat), lng: parseFloat(self.rider.user_lng)},
                travelMode: 'DRIVING'
              }, function(response, status) {
                  console.log(x,y, z, w);
                if (status !== 'OK') {
                    window.alert('Directions request failed due to ' + status);
                } 
                directionsDisplay.setDirections(response);
              });
        },
        getAddress: function (lat, lng) {
            position = {lat: parseFloat(lat), lng: parseFloat(lng)}
            geocoder.geocode({'location': position}, function(results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        console.log(results[0].formatted_address);
                        return results[0].formatted_address;
                    }
                    else{
                        return 0;
                    }
                }
            })
        },
        updateStatusDriver: function (id, status) {
            axios.post('http://localhost:3000/api/request/updateStatus', {
                token: self.token,
                id: id,
                status: status,
            }).then(function (response) {
            }) .catch(function (error) {
                if (error.response.status === 401) {
                    self.refreshToken();
                    return;
                }else{
                    alert(error);
                }
            })
        },
        // setupSSE: function () {
        //     var self = this;
        //     if (typeof (EventSource) === 'undefined') {
        //         console.log('not support');
        //         return;
        //     }

        //     var src = new EventSource('http://localhost:3000/api/requestEventAdded');

        //     src.onerror = function (e) {
        //         console.log('error: ' + e);
        //     }

        //     var src1 = new EventSource('http://localhost:3000/api/requestEventUpdated');
        //     src1.onerror = function (e) {
        //         console.log('error: ' + e);
        //     }
        //     src1.addEventListener('REQUEST_UPDATED', function (e) {
        //         if(self.driver.status == 0 ){
        //             self.requestDriver();
        //             self.driver.status = 1;
        //             self.updateLocationDriver(self.driver.id, self.driver.status)
        //         }
        //     }, false);

            
        // },
    }
})
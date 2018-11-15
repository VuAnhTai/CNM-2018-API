window.onload = function () {
    vm.setupSSE();
    vm.initMap();
};

var vm = new Vue({
    el: '#container',
    data: {
        userName: '',
        password: '',
        loginVisible: true,
        requestsVisible: false,
        requests: [],
        token: "",
        refToken: "",
        data_geocoder: {
            lat: 10.7892047,
            lng: 106.6862193,
            address: '323 Le Van Sy Street Ho Chi Minh City District 3'
        }
    },
    methods: {
        login: function () {
            var self = this;
            axios.post('http://localhost:3000/app2/login', {
                    userName: self.userName,
                    password: self.password,
                })
                .then(function (response) {
                    self.token = response.data.access_token;
                    self.refToken = response.data.refresh_token;
                })
                .catch(function (error) {
                    alert(error);
                }).then(function () {
                    self.getAllRequest();
                })
        },
        getAllRequest: function () {
            var self = this;
            axios.get('http://localhost:3000/api/request/getAll', {
                    headers: {
                        token: self.token
                    }
                })
                .then(function (response) {
                    self.requests = response.data;
                    self.requestsVisible = true;
                    self.loginVisible = false;
                    $('#tableRequest').DataTable().destroy();
                })
                .catch(function (error) {
                    if (error.response.status === 401) {
                        self.refreshToken();
                        return;
                    }
                }).then(function () {
                    $('#tableRequest').DataTable();
                });
        },
        refreshToken: function () {
            var self = this;
            axios.post('http://localhost:3000/api/users/refreshToken', {
                    refToken: self.refToken,
                })
                .then(function (response) {
                    self.token = response.data.access_token;
                    self.getAllRequest();
                })
                .catch(function (error) {
                    if (error.response.status === 401) {
                        self.loginVisible = true;
                        self.requestsVisible = false;
                    }
                }).then(function () {

                })
        },
        setupSSE: function () {
            var self = this;
            if (typeof (EventSource) === 'undefined') {
                console.log('not support');
                return;
            }

            var src = new EventSource('http://localhost:3000/requestAddedEvent');

            src.onerror = function (e) {
                console.log('error: ' + e);
            }

            src.addEventListener('REQUEST_ADDED', function (e) {
                var data = JSON.parse(e.data);
                self.requests.push(data);
                self.refDataTable();

            }, false);
        },
        refDataTable: function () {
            new Promise(function (resolve, reject) {
                $('#tableRequest').DataTable().destroy();
                resolve();
            }).then(function () {
                $('#tableRequest').DataTable();
            })
        },
        initMap: function () {
            var self = this;
            address = self.data_geocoder.address;
            if (event.target.className) {
                address = event.target.getAttribute('data_address');
            }
            var geocoder = new google.maps.Geocoder();
            var infowindow = new google.maps.InfoWindow;
            var map = new google.maps.Map(
                document.getElementById('map'), {
                    zoom: 18,
                    center: self.geocoder
                });
            self.geocodeAddress(geocoder, infowindow, map, address, self);
        },
        geocodeAddress: function (geocoder, infowindow, resultsMap, address, self) {
            geocoder.geocode({
                'address': address,
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    resultsMap.setCenter(results[0].geometry.location);
                    self.data_geocoder.address = results[0].formatted_address;
                    self.data_geocoder.lat = results[0].geometry.location.lat();
                    self.data_geocoder.lng = results[0].geometry.location.lng();
                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: resultsMap,
                        draggable: true,
                    });
                    google.maps.event.addListener(marker, "dragend", function () {
                        geocoder.geocode({
                                'location': marker.getPosition()
                            },
                            function (results, status) {
                                if (status === google.maps.GeocoderStatus.OK) {
                                    self.data_geocoder.address = results[0].formatted_address;
                                    self.data_geocoder.lat = results[0].geometry.location.lat();
                                    self.data_geocoder.lng = results[0].geometry.location.lng();
                                    infowindow.setContent(results[0].formatted_address);
                                    infowindow.open(map, marker);
                                }
                            })
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        },
        createMaker: function (place) {
            var placeLoc = place.geometry.location;
        }
    }
});

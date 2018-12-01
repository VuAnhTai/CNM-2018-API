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
            address: 'nguyen van cu'
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
                    if(response.data.auth != false){
                        self.token = response.data.access_token;
                        self.refToken = response.data.refresh_token;
                        self.requestsVisible = true;
                        self.loginVisible = false;
                        console.log(self.data);
                    }
                    else {
                        alert(response.data.auth );
                    }
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

            var src = new EventSource('http://localhost:3000/api/requestEventAdded');

            src.onerror = function (e) {
                console.log('error: ' + e);
            }

            src.addEventListener('REQUEST_ADDED', function (e) {
                var data = JSON.parse(e.data);
                self.requests.push(data);
                self.refDataTable();

            }, false);

            var src1 = new EventSource('http://localhost:3000/api/requestEventUpdated');
            src1.onerror = function (e) {
                console.log('error: ' + e);
            }
            src1.addEventListener('REQUEST_UPDATED', function (e) {
                var data = JSON.parse(e.data);
                self.getAllRequest();
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
            id = -1;
            if (event.target.className) {
                address = event.target.getAttribute('data_address');
                id = event.target.getAttribute('data_id');
            }
            var geocoder = new google.maps.Geocoder();
            var infowindow = new google.maps.InfoWindow;
            var map = new google.maps.Map(
                document.getElementById('map'), {
                    zoom: 18,
                    center: self.geocoder
                });

            self.geocodeAddress(geocoder, infowindow, map, address, self);
            if(id != -1){
                self.updateRequest(id, 1);
            }
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
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marker);
                    google.maps.event.addListener(marker, "dragend", function () {
                        geocoder.geocode({
                                'location': marker.getPosition()
                            },
                            function (results, status) {
                                if (status === google.maps.GeocoderStatus.OK) {
                                    self.data_geocoder.address = results[0].formatted_address;
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
        updateRequest: function (id, status){
            var self = this;

            axios.post('http://localhost:3000/api/request/updateLocation', {
                    lat: self.data_geocoder.lat,
                    lng: self.data_geocoder.lng,
                    id: id,
                    status: status,
                    token: self.token
                })
                .then(function (response) {
                    self.requests = response.data;
                })
                .catch(function (error) {
                    if (error.response.status === 401) {
                        self.refreshToken();
                        return;
                    }
                });
        }
    }
});

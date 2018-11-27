window.onload = function () {
    vm;
}
var vm = new Vue({
    el: '#container',
    data: {
        userName: '',
        password: '',
        loginVisible: true,
        requestsVisible: false,
        token: "",
        refToken: "",
    },
    methods: {
        login: function () {
            var self = this;
            axios.post('http://localhost:3000/app2/login', {
                    userName: self.userName,
                    password: self.password,
                })
                .then(function (response) {
                    if(response.data.auth != false){
                        self.token = response.data.access_token;
                        self.refToken = response.data.refresh_token;
                        self.requestsVisible = true;
                        self.loginVisible = false;
                    }
                    else {
                        alert(response.data.auth );
                    }
                    
                })
                
        },
        submitRequest: function () {
            var self = this;
            var name = $('#name').val();
            var phone = $('#phone').val();
            var address = $('#address').val();
            var note = $('#note').val();
            var token = self.token;
            axios.post('http://localhost:3000/app1/request', {
                    token: token,
                    name: name,
                    phone: phone,
                    address: address,
                    note: note,
                })
                .then(function (response) {
                    alert("Thành công");
                })
                .catch(function (error) {
                    if (error.response.status === 401) {
                        self.refreshToken();
                        return;
                    }
                    alert("Lỗi");
                });
        },
        refreshToken: function () {
            var self = this;
            axios.post('http://localhost:3000/api/users/refreshToken', {
                    refToken: self.refToken,
                })
                .then(function (response) {
                    self.token = response.data.access_token;
                    self.submitRequest();
                })
                .catch(function (error) {
                    if (error.response.status === 401) {
                        self.loginVisible = true;
                        self.requestsVisible = false;
                    }
                })
        },
    },
})
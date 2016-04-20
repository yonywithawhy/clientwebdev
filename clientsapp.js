(function(){
    var app = angular.module("ClientsApp",[]);

    app.controller("ClientController",function(){
        var Clients = this;
        Clients.goTo = function(path) {
            console.log("Going to " + path);
            window.location = path;
        }
        Clients.list = [
            {
                name: "Jeanne Reis",
                directory: "jreis",
                projects: [
                    {
                        title: "ASL STEM",
                        path: "http://www.aslstem.com"
                    }
                ]
            },
            {
                name: "Jonathan Seales",
                directory: "jseales",
                projects: [
                    {
                        title: "Website Icon Animation",
                        path: "jseales/index.html"
                    }
                ]
            }
        ];
    });
})();

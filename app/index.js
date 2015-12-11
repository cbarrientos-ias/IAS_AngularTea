(function () {
    "use strict";

    var ngModule = angular.module("teaIAS", []);

    ngModule.service("sumar", function (x, y) {
        return x + y;
    });
    ngModule.constant("API_URL", "http://jsonplaceholder.typicode.com");
    ngModule.constant("API_URL_Criminal", "/criminal");
    ngModule.constant("API_URL", "localhost:3000/api");
    ngModule.value("contador", 0);
    ngModule.constant("toastr", toastr);
    ngModule.constant("moment", moment);

    





    ngModule.controller("mainController", mainController);

    function mainController(moment, API_URL, $q, $http) {
        var vm = this;
        vm.p = "b";
        vm.date = moment().format("MMMM Do YYYY, h:mm:ss a");

        function getData(){
            var deferred = $q.defer();
            $http.get(API_URL + '/posts/1')
                .then(function(data){
                    deferred.resolve(data);
                }, function(reason){
                    deferred.reject(reason);
                });
            return deferred.promise;
        }
        getData()
            .then(console.log);
    }

    mainController.$inject = ["moment", "API_URL", "$q", "$http"];


    ngModule.directive("teaHolaDirective", function (toastr, moment) {
        function linker(scope, element, attr) {
            angular.element("h1").on("click", function(e){
                var data = angular.element("h2");
                toastr.info("La hora es: " + moment(data.html(), 'MMMM Do YYYY, h:mm:ss a').format("hh:mm"));
            });
            setTimeout(function(){
                console.log(scope);
                scope.vm.date = moment();
            }, 1000);
        }

        return {
            restrict: "E",
            controller: "mainController",
            controllerAs: "vm",
            template: "<h1>Hola {{vm.p}}</h1><h2>{{vm.date}}</h2>" +
            "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/AngularJS_logo.svg/695px-AngularJS_logo.svg.png'/> ",
            link: linker
        };
    });

    ngModule.directive("src", function(){
        return {
            restrict: "A",
            link: function(scope, element, attrs){
                var e = angular.element(element).hide();
                setTimeout(function(){
                    e.show();
                }, 2000);
            }
        };
    });
}());
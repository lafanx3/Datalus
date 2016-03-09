        //Client Side routing settings
        (function () {
            "use strict";

            angular.module(APPNAME)
                .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
                    $routeProvider.when('/users', {
                        templateUrl: '/templates/users.html',
                        controller: 'userSection_UserController',
                        controllerAs: 'userController'
                    }).when('/sections', {
                        templateUrl: '/templates/sections.html',
                        controller: 'userSection_SectionController',
                        controllerAs: 'sectionController'
                    });
                    $locationProvider.html5Mode(false);
                }]);

        })();
        
        //Angular client side routing controller
        (function () {
            "use strict";

            angular.module(APPNAME)
                .controller("routeController", RouteController);

            RouteController.$inject = ["$scope", "$baseController"];

            function RouteController($scope, $baseController) {
                var vm = this;

                vm.$scope = $scope;

                vm.tabClass = _tabClass;
                vm.setSelectedTab = _setSelectedTab;


                vm.tabs = [
                        { link: "#/users", label: "Students" },
                        { link: "#/sections", label: "Sections" }
                ];

                vm.selectedTab = vm.tabs[0];

                $baseController.merge(vm, $baseController);

                function _tabClass(tab) {
                    if (vm.selectedTab == tab) {
                        return "active";
                    } else {
                        return "";
                    }
                }

                function _setSelectedTab(tab) {
                    console.log("set selected tab", tab);
                    vm.selectedTab = tab;
                }
            }
        })();

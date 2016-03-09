        //Modal User controller
        (function () {
            "use strict";

            angular.module(APPNAME)
                .controller('modalUserController', ModalUserController);

            //  $uibModalInstance is coming from the UI Bootstrap library and is a reference to the modal window itself so we can work with it
            //  items is the array passed in from the main controller above through the resolve property
            ModalUserController.$inject = ['$scope', '$baseController', '$uibModalInstance', '$userSectionService', 'items']

            function ModalUserController(
                $scope
                , $baseController
                , $uibModalInstance
                , $userSectionService
                , items) {

                var vm = this;
                vm.userData = null;
                vm.userProfileId = null;
                vm.sectionId = null;
                //validation object
                vm.mStudentRegistrationForm = null;
                vm.showFormErrors = false;

                vm.$scope = $scope;
                vm.$uibModalInstance = $uibModalInstance;
                vm.$userSectionService = $userSectionService;

                vm.userData = items;

                $baseController.merge(vm, $baseController);

                //  $uibModalInstance is used to communicate and send data back to main controller
                vm.ok = function () {
                    vm.showFormErrors = true;
                    if (vm.mStudentRegistrationForm.$valid) {
                        vm.$uibModalInstance.close(vm.mStudentRegistrationForm);
                    } else {
                        console.log("validation failed");
                    }
                };

                vm.cancel = function () {
                    vm.$uibModalInstance.dismiss('cancel');
                };

            }
        })();

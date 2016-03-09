        //Register student from student tab
        (function () {
            "use strict";

            angular.module(APPNAME)
                .controller('formStudentController', FormStudentController);

            FormStudentController.$inject = ['$scope', '$baseController', "$userProfileService", "$userSectionService", "$sectionService"];

            function FormStudentController($scope, $baseController, $userProfileService, $userSectionService, $sectionService) {
                var vm = this;
                vm.formVisibility = false;
                vm.userProfiles = null;
                vm.sections = null;
                //object sent to dB
                vm.registerNewStudent = null;
                //validation object
                vm.studentRegistrationForm = null;
                vm.showFormErrors = false;

                vm.$scope = $scope;
                vm.$userProfileService = $userProfileService;
                vm.$userSectionService = $userSectionService;
                vm.$sectionService = $sectionService;

                vm.showForm = _showForm;
                vm.resetForm = _resetForm;
                vm.receiveUsers = _receiveUsers;
                vm.receiveSections = _receiveSections;
                vm.userSectionError = _userSectionError;
                vm.onRegisterStudent = _onRegisterStudent;
                vm.registerSuccess = _registerSuccess;

                $baseController.merge(vm, $baseController);

                vm.notify = vm.$userSectionService.getNotifier($scope);

                render();

                function render() {
                    vm.$userProfileService.getAll(vm.receiveUsers, vm.userSectionError);
                    vm.$sectionService.getAll(vm.receiveSections, vm.userSectionError);
                }


                function _receiveUsers(data) {
                    vm.notify(function () {
                        vm.userProfiles = data.items;
                    })
                }

                function _receiveSections(data) {
                    vm.notify(function () {
                        vm.sections = data.items;
                    })
                }

                function _onRegisterStudent() {
                    vm.showFormErrors = true;
                    if (vm.studentRegistrationForm.$valid) {
                        vm.$userSectionService.create(vm.registerNewStudent, vm.registerSuccess, vm.userSectionError);
                    } else {
                        console.log("Not all form values provided.");
                    }
                }

                function _registerSuccess() {
                    console.log("success");

                    vm.$scope.$emit('refreshUsers', {
                        userProfileId: vm.registerNewStudent.userProfileId
                    });

                    _resetForm();
                    vm.$alertService.success("Student Registered Successfully");
                }

                function _userSectionError(jqXhr, error) {
                    vm.$alertService.error("An Error Occurred");
                    console.error(error);
                }

                function _showForm() {
                    vm.formVisibility = !vm.formVisibility;
                }

                function _resetForm() {
                    vm.formVisibility = false;
                    vm.showFormErrors = false;
                    vm.registerNewStudent = null;
                    vm.studentRegistrationForm.$setPristine();
                    vm.studentRegistrationForm.$setUntouched()
                }
            }
        })();

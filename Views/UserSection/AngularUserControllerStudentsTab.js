       //Angular User Controller for students tab
        (function () {
            "use strict";

            angular.module(APPNAME)
                .controller("userSection_UserController", UserSection_UserController);

            UserSection_UserController.$inject = ["$scope", "$baseController", "$userSectionService", "$sectionService", "$userProfileService", "$uibModal"];

            function UserSection_UserController($scope, $baseController, $userSectionService, $sectionService, $userProfileService, $uibModal) {
                var vm = this;
                vm.sections = null;
                vm.userProfiles = null;
                vm.modalItems = null;
                vm.selectedItem = {};

                vm.$sectionService = $sectionService;
                vm.$userProfileService = $userProfileService;
                vm.$userSectionService = $userSectionService;
                vm.$scope = $scope;
                vm.$uibModal = $uibModal;

                vm.receiveSections = _receiveSections;
                vm.receiveUsers = _receiveUsers;
                vm.selectedUser = _selectedUser;
                vm.userSectionError = _userSectionError;
                vm.openModal = _openModal;
                vm.onEdit = _onEdit;
                vm.onSuccess = _onSuccess;
                vm.updateRecord = _updateRecord;
                vm.successUpdate = _successUpdate;

                $baseController.merge(vm, $baseController);

                vm.notify = vm.$userSectionService.getNotifier($scope);

                render();

                function render() {
                    vm.$userProfileService.getAll(vm.receiveUsers, vm.userSectionError);
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

                $scope.onSelect = function ($item, $model, $label) {
                    $scope.$selection_made = $item;
                };

                function _userSectionError(jqXhr, error) {
                    vm.$alertService.error("An Error Occurred");
                    console.error(error);
                }

                function _selectedUser(item) {
                    vm.$userSectionService.getSectionsByUserProfileId(item, vm.receiveSections, vm.sectionError);
                }

                function _onEdit(userProfileId, sectionId) {
                    //make ajax call
                    vm.$userSectionService.getSpecificUser(userProfileId, sectionId, vm.onSuccess, vm.userSectionError);
                }

                function _onSuccess(data) {
                    vm.selectedItem = data.item;
                    vm.selectedItem.isForCredit = vm.selectedItem.isForCredit.toString();

                    _openModal(vm.selectedItem);

                }

                function _updateRecord() {
                    vm.$userSectionService.update(vm.selectedItem, vm.selectedItem.userProfileId, vm.selectedItem.sectionId, vm.successUpdate, vm.userSectionError);
                }

                function _successUpdate() {
                    _selectedUser(vm.selectedItem.userProfileId);
                    console.log("successful update");
                    vm.$alertService.success("Record Updated Successfully");
                }


                function _openModal(data) {
                    var modalInstance = vm.$uibModal.open({
                        animation: true,
                        templateUrl: 'modalUserContent.html',       //  this tells it what html template to use. it must exist in a script tag OR external file
                        controller: 'modalUserController as mUserEdit',    //  this controller must exist and be registered with angular for this to work
                        size: 'sm',
                        resolve: {  //  anything passed to resolve can be injected into the modal controller as shown below
                            items: function () {
                                //pass as an object contains userProfileId and sectionId, return that vm object; accessible within the modal controller

                                return data;

                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        _updateRecord();
                    })
                }

                vm.$scope.$on('refreshUsers', function (event, obj) {
                    _selectedUser(obj.userProfileId);
                })
            }
        })();

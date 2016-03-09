        //Angular Section Controller for sections tab
        (function () {
            "use strict";

            angular.module(APPNAME)
                .controller('userSection_SectionController', UserSection_SectionController);

            UserSection_SectionController.$inject = ["$scope", "$baseController", "$userSectionService", "$sectionService", "$userProfileService", "$uibModal"];

            function UserSection_SectionController($scope, $baseController, $userSectionService, $sectionService, $userProfileService, $uibModal) {
                var vm = this;
                vm.sections = null;
                vm.userProfiles = null;
                vm.capacity = null;
                vm.availableSeats = null;

                vm.$sectionService = $sectionService;
                vm.$userProfileService = $userProfileService;
                vm.$userSectionService = $userSectionService;
                vm.$scope = $scope;
                vm.$uibModal = $uibModal;

                vm.receiveSections = _receiveSections;
                vm.receiveUsers = _receiveUsers;
                vm.selectedSection = _selectedSection;
                vm.userSectionError = _userSectionError;
                vm.onEdit = _onEdit;
                vm.onSuccess = _onSuccess;
                vm.openModal = _openModal;
                vm.updateRecord = _updateRecord;
                vm.successUpdate = _successUpdate;
                vm.capacityInfo = _capacityInfo;

                $baseController.merge(vm, $baseController);

                vm.notify = vm.$userSectionService.getNotifier($scope);

                render();

                function render() {
                    vm.$sectionService.getAll(vm.receiveSections, vm.sectionError);
                }

                function _receiveSections(data) {
                    vm.notify(function () {
                        vm.sections = data.items;
                    })
                }

                function _selectedSection(item) {
                    vm.$userSectionService.getUsersBySectionId(item, vm.receiveUsers, vm.userSectionError);
                    vm.$userSectionService.getCapacityBySectionId(item, vm.capacityInfo, vm.userSectionError);
                }

                function _receiveUsers(data) {
                    vm.notify(function () {
                        vm.userProfiles = data.items;
                    })
                }

                function _capacityInfo(data) {
                    vm.notify(function () {
                        vm.capacity = data.item.section.capacity;
                        vm.totalEnrolled = data.item.totalEnrolled;
                        vm.availableSeats = vm.capacity - vm.totalEnrolled;
                    })
                }

                function _userSectionError(jqXhr, error) {
                    vm.$alertService.error("An error Occurred");
                    console.error(error);
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
                    _selectedSection(vm.selectedItem.sectionId);
                    console.log("successful update");
                    vm.$alertService.success("Record Updated Successfully");
                }

                function _openModal(data) {
                    var modalInstance = vm.$uibModal.open({
                        animation: true,
                        templateUrl: 'modalSectionContent.html',       //  this tells it what html template to use. it must exist in a script tag OR external file
                        controller: 'modalSectionController as mSectionEdit',    //  this controller must exist and be registered with angular for this to work
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

                vm.$scope.$on('refreshSections', function (event, obj) {
                    _selectedSection(obj.sectionId);
                })
            }
        })();

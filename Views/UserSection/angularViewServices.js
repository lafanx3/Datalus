        //Angular usersection service
        (function () {
            "use strict";

            angular.module(APPNAME)
                .factory("$userSectionService", UserSectionServiceFactory);

            UserSectionServiceFactory.$inject = ["$baseService", "$datalus"];

            function UserSectionServiceFactory($baseService, $datalus) {
                var aDatalusServiceObject = datalus.services.userSection;

                var newService = $baseService.merge(true, {}, aDatalusServiceObject, $baseService);

                console.log("section registration service", aDatalusServiceObject);

                return newService;
            }
        })();

        //Angular section service
        (function () {
            "use strict";

            angular.module(APPNAME)
                .factory('$sectionService', SectionServiceFactory);

            SectionServiceFactory.$inject = ['$baseService', '$datalus'];

            function SectionServiceFactory($baseService, $datalus) {
                var sectionServiceObject = datalus.services.sections;

                var newService = $baseService.merge(true, {}, sectionServiceObject, $baseService);

                console.log("Section Service", sectionServiceObject);

                return newService;
            }

        })();

        //Angular userprofile service
        (function () {
            "use strict";

            angular.module(APPNAME)
                .factory('$userProfileService', UserProfileServiceFactory);

            UserProfileServiceFactory.$inject = ['$baseService', '$datalus'];

            function UserProfileServiceFactory($baseService, $datalus) {
                var userProfileServiceObject = datalus.services.userProfile;
                var newService = $baseService.merge(true, {}, userProfileServiceObject, $baseService);

                return newService;
            }

        })();

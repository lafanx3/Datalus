if (!datalus.services.userProfile) {
    datalus.services.userProfile = {};
}

//datalus.services.userProfile.getAll = function (onSuccess, onError) {
//    var url = "/api/Profile";
//    var settings = {
//        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
//        type: "GET",
//        dataType: "json",
//        success: onSuccess,
//        error: onError,

//    };

//    $.ajax(url, settings)
//}

datalus.services.userProfile.create = function (myData, onCreateSuccess, onCreateError) {
    var url = "/api/Profiles";
    
    var settings = {
        cache: false
        , contentType: "application/json; charset=UTF-8"
        , data: JSON.stringify(myData)
        , dataType: "json"
        , success: onCreateSuccess
        , error: onCreateError
        , type: "POST"
    };

    $.ajax(url, settings);
}

datalus.services.userProfile.edit = function (id, myData, onEditSuccess, onEditError) {
    var url = "/api/Profiles/" + id;   
    var settings = {
        cache: false
        , contentType: "application/json; charset=UTF-8"
        , data: JSON.stringify(myData)
        , dataType: "json"
        , success: onEditSuccess
        , error: onEditError
        , type: "PUT"
    };
    $.ajax(url, settings);

}

datalus.services.userProfile.getById = function (id, onSuccess, onError) {
    var url = "/api/Profiles/" + id;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}


datalus.services.userProfile.getAll = function (onSuccess, onError) {
    var url = "/api/Profiles";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

datalus.services.userProfile.studentsNearBy = function (latitude, longitude, onSuccess, onError) {
    var paramObject = { latitude: latitude, longitude: longitude };
    var paramObject2 = decodeURIComponent($.param(paramObject));
    var url = "/api/Profiles?" + paramObject2
    var settings = {
        cache: false
        , contentType: "application/json"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

datalus.services.userProfile.getCountries = function (onSuccess, onError) {
    var url = "/api/Profiles/countries";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

datalus.services.userProfile.getStatesForCountry = function (countryId, onSuccess, onError) {
    var url = "/api/Profiles/StateProvinces/country/" + countryId;
    var settings = {
        cache: false
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

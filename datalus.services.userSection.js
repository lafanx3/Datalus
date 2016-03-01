if (!datalus.services.userSection) {
    datalus.services.userSection = {};
}

datalus.services.userSection.create = function (data, onSuccess, onError) {
    console.log(data);
    var url = "/api/usersection/";
    var myData = JSON.stringify(data);
    console.log(myData);
    var settings = {
        cache: false
		, contentType: "application/json"
		, data: myData
		, dataType: "json"
		, success: onSuccess
		, onError: onError
		, type: "POST"
    };
    $.ajax(url, settings);
}

datalus.services.userSection.getSectionsByUserProfileId = function (data, onSuccess, onError) {
    console.log(data);
    var url = "/api/usersection/" + data;
    var myData = data;
    console.log(myData);
    var settings = {
        cache: false
        , contentType: "application/json"
		, data: myData
		, dataType: "json"
		, success: onSuccess
		, onError: onError
		, type: "GET"
    };
    $.ajax(url, settings);
}

datalus.services.userSection.getUsersBySectionId = function (data, onSuccess, onError) {
    var url = "/api/usersection/section/" + data;
    var myData = data;
    var settings = {
        cache: false
        , contentType: "application/json"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , onError: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

datalus.services.userSection.getSpecificUser = function (userProfileId, sectionId, onSuccess, onError) {
    var url = "/api/usersection/getUser/" + userProfileId + '/' + sectionId;
    var settings = {
        cache: false
        , contentType: "application/json"
        , dataType: "json"
        , success: onSuccess
        , onError: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

datalus.services.userSection.update = function (data, userProfileId, sectionId, onSuccess, onError) {
    var url = "/api/usersection/update/" + userProfileId + '/' + sectionId;
    var myData = data;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
		, data: myData
		, dataType: "json"
		, success: onSuccess
		, error: onError
		, type: "PUT"
    };
    $.ajax(url, settings);
}

datalus.services.userSection.getCapacityBySectionId = function (data, onSuccess, onError) {
    var url = "/api/usersection/sectionCapacity/" + data;
    var myData = data;
    var settings = {
        cache: false
        , contentType: "application/json"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , onError: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

if (!datalus.services.sections) {
    datalus.services.sections = {};
}

datalus.services.sections.create = function (formData, onSuccess, onError) {
    var url = "/api/sections/";
    var settings = {
        cache: false
        , contentType: "application/json; charset=UTF-8"
        , data: JSON.stringify(formData)
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
}

datalus.services.sections.edit = function (id, formData, onSuccess, onError) {
    var url = "/api/sections/" + id;
    var settings = {
        cache: false
    , contentType: "application/json; charset=UTF-8"
    , data: JSON.stringify(formData)
    , dataType: "json"
    , success: onSuccess
    , error: onError
    , type: "PUT"
    };
    $.ajax(url, settings);
}

datalus.services.sections.getAll = function (onSuccess, onError) {
    var url = "/api/sections";
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

datalus.services.sections.getById = function (id, onSuccess, onError) {
    var url = "/api/sections/" + id;
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

datalus.services.sections.getByInstructorId = function (instructorId, onSuccess, onError) {
    var url = "/api/sections/instructorHome/" + instructorId;
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

datalus.services.sections.delete = function (id, onSuccess, onError) {
    var url = "/api/sections/" + id;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "DELETE"
    };
    $.ajax(url, settings);
}

datalus.services.sections.getSectionsByUserProfileId = function (id, onSuccess, onError) {
    var url = "/api/sections/userprofile/" + id
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

datalus.services.sections.getByCourseId = function (id, onSuccess, onError) {
    var url = "/api/sections/course/" + id
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

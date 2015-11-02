var Montage = require("montage/core/core").Montage;

exports.ChatAppDelegate = Montage.specialize({
    willFinishLoading: {value: function (app) {
        app.config = {
            BOSH_SERVICE: "http://192.168.1.238:7070/http-bind/",
            SERVICE_DOMAIN:"conference.toms-mbp"
        };
    }}
});
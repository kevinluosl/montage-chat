var Montage = require("montage/core/core").Montage;

exports.ChatAppDelegate = Montage.specialize({
    willFinishLoading: {value: function (app) {
        app.config = {
            BOSH_SERVICE: "http://115.28.165.154:7070/http-bind/",
            SERVICE_DOMAIN:"conference.contour"
        };
    }}
});
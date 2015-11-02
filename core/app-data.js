var Montage = require("montage").Montage;
exports.AppData = Montage.specialize({
    constructor: {
        value: function () {

        },
        currentRoom:{
            value:null
        },
        userInfo:{
            value:null
        }
    }
});
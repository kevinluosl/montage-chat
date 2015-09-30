/**
 * @module ui/main.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;
/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {
    constructor: {
        value: function Main() {
            this.super();
        }
    },
    enterDocument: {
        value: function(isFirsTtime) {

        }
    },
    username: {
        get: function () {
            return this.randomChar(5);
        }
    },
    randomChar:{
        value:function(len){
            var x="123456789poiuytrewqasdfghjklmnbvcxzQWERTYUIPLKJHGFDSAZXCVBNM";
            var tmp="";
            for(var i=0;i< len;i++) {
                tmp += x.charAt(Math.ceil(Math.random()*100000000)%x.length);
            }
            return tmp;
        }
    },

    templateDidLoad: {
        value: function (firstTime) {
            if ( firstTime ){
                this.templateObjects.chatRoom.init();
            }

        }
    }
});

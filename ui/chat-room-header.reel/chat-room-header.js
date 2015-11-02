/**
 * @module ui/chat-room-header.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class ChatRoomHeader
 * @extends Component
 */
exports.ChatRoomHeader = Component.specialize(/** @lends ChatRoomHeader# */ {
    constructor: {
        value: function ChatRoomHeader() {
            this.super();
        }
    },

    handleAction:{
        value:function(){
            this.dispatchEventNamed("openRoomListAction", true, true,null);
        }
    }
});
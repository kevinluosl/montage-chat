/**
 * @module ui/room-list.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class RoomLIst
 * @extends Component
 */
exports.RoomList = Component.specialize(/** @lends RoomList# */ {
    constructor: {
        value: function RoomList() {
            this.super();
        }
    },

    chatService:{
        value:null
    },

    _roomList:{
        value:null
    },

    roomList: {
        get:function(){
            if ( this._roomList ){
                return this._roomList;
            }else{
                if ( this.chatService )
                {
                    var self = this;
                    this.chatService.listRooms(function(data){
                        self._roomList = data;
                        self.dispatchOwnPropertyChange("roomList", self._roomList);
                    },function(error){

                    });
                }
            }
        }
    },

    refreshData:{
        value:function(){
            this.dispatchOwnPropertyChange("roomList", this.roomList);
        }
    },

    templateDidLoad: {
        value: function() {

        }
    }
});
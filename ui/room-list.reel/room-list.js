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
               this._refreshRoomListData();
            }
        }
    },

    _refreshRoomListData:{
        value:function(){
            if ( this.chatService && this.chatService.connectionStatus == Strophe.Status.CONNECTED)
            {
                var self = this;
                this.chatService.listRooms(function(data){
                    self._roomList = data;
                    self.dispatchOwnPropertyChange("roomList", self._roomList);
                },function(error){

                });
            }
        }
    },

    refreshData:{
        value:function(){
            this.dispatchOwnPropertyChange("roomList", this.roomList);
        }
    },

    templateDidLoad: {
        value: function () {

        }
    },

    handleAddAction:{
        value:function(){
            var self = this;
            self.chatService.createRoom("abc",function () {
                self._refreshRoomListData();
                self.chatService.joinRoom("abc","tom",function(){})
            }, function (errorMsg) {

            });
        }
    }
});
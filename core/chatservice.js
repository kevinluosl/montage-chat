/**
 * Created by Jashon on 2014/12/19.
 */
var Montage = require("montage").Montage;
require("core/strophe");

exports.chatService = Montage.specialize({
    constructor: {
        value: function () {
            this.init();
        }
    },
    log: {
        value: function (txt) {
            console.log(txt);
        }
    },
    rawInput: {
        value: function (data) {
            console.log('RECV: ' + data);
        }
    },
    rawOutput: {
        value: function (data) {
            console.log('SENT: ' + data);
        }
    },
    BOSH_SERVICE: {
        value: 'http://JW:7070/http-bind/'
    },
    connection: {
        value: null
    },
    userJID: {
        value: null
    },
    roomID: {
        value: null
    },
    roomSuffix: {
        value: "room.jw"
    },
    msgFrom: {
        value: null
    },
    msgTo: {
        value: null
    },
    msgContent: {
        value: null
    },
    init: {
        value: function () {
            var self=this;
            connection = new Strophe.Connection(this.BOSH_SERVICE);
            connection.rawInput = this.rawInput;
            connection.rawOutput = this.rawOutput;
            connection.addHandler(function(msgXML){
                var to = msgXML.getAttribute('to');
                var from = msgXML.getAttribute('from');
                var fromBareJid = Strophe.getBareJidFromJid(from);
                var type = msgXML.getAttribute('type');
                var elems = msgXML.getElementsByTagName('body');
                var text = Strophe.getText(elems[0]);
                self.msgFrom = from;
                self.msgTo = to;
                self.msgContent = text;
                self.log("========From:" + from + ":    " + text);
                return true;
            }, null, "message");
            connection.muc.init(connection);
        }
    },
    connectionStatus: {
        value: null
    },
    connect: {
        value: function () {
            var self = this;
            connection.connect(this.userJID, "welcome", function (status) {
                self.connectionStatus = status;
                if (status == Strophe.Status.CONNECTING) {
                    self.log('Strophe is connecting.');
                } else if (status == Strophe.Status.CONNFAIL) {
                    self.log('Strophe failed to connect.');
                } else if (status == Strophe.Status.DISCONNECTING) {
                    self.log('Strophe is disconnecting.');
                } else if (status == Strophe.Status.DISCONNECTED) {
                    self.log('Strophe is disconnected.');
                } else if (status == Strophe.Status.CONNECTED) {
                    self.log('Strophe is connected.');
                }
            });
        }
    },
    joinRoom: {
        value: function (room, nick, rosterfn) {
            connection.muc.join(room, nick, function () {
            }, function () {
            }, rosterfn, "welcome", null);
        }
    },
    createRoom: {
        value: function () {
            var self = this;
            if (this.connectionStatus != Strophe.Status.CONNECTED) {
                this.connect();
                return;
            }

            var roominfo = this.roomID + "@" + this.roomSuffix;
            var d =
                $pres({
                    "from": self.userJID,
                    "to": roominfo + "/" + this.userJID.replace('@', '_')
                })
                    .c("x", {"xmlns": "http://jabber.org/protocol/muc"});

            connection.send(d.tree());

            var roomrel = connection.muc.createInstantRoom(roominfo, function () {
                self.log("Create " + roominfo + " successfully.");
            }, function (err) {
                self.log("Create chat room failed. Err:" + err);
                self.joinRoom(roominfo,self.userJID.replace('@', '_'),function(){
                    self.log("Join "+roominfo+" room successfully.");
                });
            });
            self.log("After create room, return :" + roomrel);
        }
    },
    sendMessage: {
        value: function (msg) {
            var self = this;
            if (connection)
                connection.muc.groupchat(this.roomID + "@" + this.roomSuffix, msg, "<p>" + msg + "</p>");
            else
                self.log("You didn't connect to server yet.");
        }
    }
});
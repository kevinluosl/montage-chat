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
            this.log('RECV: ' + data);
        }
    },
    rawOutput: {
        value: function (data) {
            this.log('SENT: ' + data);
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
            debugger
            connection = new Strophe.Connection(this.BOSH_SERVICE);
            connection.rawInput = this.rawInput;
            connection.rawOutput = this.rawOutput;
            connection.addHandler(this.handleMessage, null, "message");
            connection.muc.init(connection);
        }
    },
    handleMessage: {
        value: function (msxXML) {
            var to = msgXML.getAttribute('to');
            var from = msgXML.getAttribute('from');
            var fromBareJid = Strophe.getBareJidFromJid(from);
            var type = msgXML.getAttribute('type');
            var elems = msgXML.getElementsByTagName('body');
            var text = Strophe.getText(elems[0]);
            this.msgFrom = from;
            this.msgTo = to;
            this.msgContent = text;
            this.log("========From:" + from + ":    " + text);
        }
    },
    connectionStatus: {
        value: null
    },
    connect: {
        value: function () {
            this.connection.connect(this.userJID, "welcome", function (status) {
                this.connectionStatus = status;
                if (status == Strophe.Status.CONNECTING) {
                    this.log('Strophe is connecting.');
                } else if (status == Strophe.Status.CONNFAIL) {
                    this.log('Strophe failed to connect.');
                } else if (status == Strophe.Status.DISCONNECTING) {
                    this.log('Strophe is disconnecting.');
                } else if (status == Strophe.Status.DISCONNECTED) {
                    this.log('Strophe is disconnected.');
                } else if (status == Strophe.Status.CONNECTED) {
                    this.log('Strophe is connected.');
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
            if (this.connectionStatus != Strophe.Status.CONNECTED) {
                this.connect();
                return;
            }

            var roominfo = this.roomID + "@" + this.roomSuffix;
            var d =
                $pres({
                    "from": this.userJID,
                    "to": roominfo + "/" + this.userJID.replace('@', '_')
                })
                    .c("x", {"xmlns": "http://jabber.org/protocol/muc"});

            connection.send(d.tree());

            var roomrel = connection.muc.createInstantRoom(roominfo, function () {
                this.log("Create " + roominfo + " successfully.");
            }, function (err) {
                this.log("Create chat room failed. Err:" + err);
            });
            this.log("After create room, return :" + roomrel);
        }
    },
    sendMessage: {
        value: function (msg) {
            if (connection)
                connection.muc.groupchat(this.roomID, msg, "<p>" + msg + "</p>");
            else
                this.log("You didn't connect to server yet.");
        }
    }
});
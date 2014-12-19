/*
 Created by Jashon Wan
 */
var BOSH_SERVICE = 'http://JW:7070/http-bind/'; //'http://bosh.metajack.im:5280/xmpp-httpbind'
var connection = null;

function log(msg) {
    $('#log').append('<div></div>').append(document.createTextNode(msg));
}

function rawInput(data) {
    log('RECV: ' + data);
}

function rawOutput(data) {
    log('SENT: ' + data);
}

function xmlInput(data) {
    log('XML RECV: ' + data);
}

function xmlOutput(data) {
    log('XML SENT: ' + data);
}

function onConnect(status) {
    debugger
    if (status == Strophe.Status.CONNECTING) {
        log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
        log('Strophe failed to connect.');
        $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.DISCONNECTING) {
        log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
        log('Strophe is disconnected.');
        $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.CONNECTED) {
        log('Strophe is connected.');
        //connection.disconnect();
        connection.addHandler(handleMessage, null, "message");
        connection.muc.init(connection);
    }
}

function handleMessage(msgXML) {
    var to = msgXML.getAttribute('to');
    var from = msgXML.getAttribute('from');
    var fromBareJid = Strophe.getBareJidFromJid(from);
    var type = msgXML.getAttribute('type');
    var elems = msgXML.getElementsByTagName('body');
    var text = Strophe.getText(elems[0]);
    log("========From:" + from + ":    " + text);
    return true;
}

function createRoom() {
    var roomid = $('#roomid').get(0).value;
    var d =
        $pres({
            "from": "jashon@JW",
            "to": roomid + "/" + Strophe.getBareJidFromJid($('#jid').get(0).value).replace('@', '_')
        })
            .c("x", {"xmlns": "http://jabber.org/protocol/muc"});

    connection.send(d.tree());

    var roomrel = connection.muc.createInstantRoom(roomid, function () {
        //debugger
        log("Create " + roomid + " successfully.");
        $('#createroom').get(0).value = "Created";
        $('#createroom').attr('disabled', 'disabled');
    }, function (err) {
        log("Create chat room failed. Err:" + err);
    });
    log("After create room, return :" + roomrel);
}

function listRoom() {
    connection.muc.listRooms("JW", function (data) {
        var xml2js = new X2JS();
        var roomlist = xml2js.xml2json(data);
        //debugger
        for (var i = 0, len = roomlist.query.item.length; i < len; i++) {
            log("Room " + (i + 1) + " jid:" + roomlist.query.item[i]._jid + ", name:" + roomlist.query.item[i]._name);
        }
    }, function () {
        log("Getting room list failed.");
    });
}

function joinRoom() {
    connection.muc.join($('#joinJid').get(0).value, $('#jid').get(0).value.replace('@', '_'), function (msg, opt) {
        //debugger
        log("Got new msg:" + msg);
    }, function (data, pre) {
        //debugger
        log("Presence function was called.");
    }, function (data, opt) {
        //debugger
        $('#joinroom').get(0).value = "Joined";
        $('#joinroom').attr('disabled', 'disabled');
        log("Roster function was called.");
    }, $('#pass').get(0).value, null);
}

function sendMsg(data) {
    var roominfo;
    if ($('#joinJid').get(0).value.length > 0)
        roominfo = $('#joinJid').get(0).value;
    else
        roominfo = $('#roomid').get(0).value;

    var msg = $('#msgcontent').get(0).value;

    if (data == 1)
        connection.muc.groupchat(roominfo, msg, "<p>" + msg + "</p>");
    else {
        connection.muc.message(roominfo, $('#msgreceiver').get(0).value, msg, "<p>" + msg + "</p>");
    }
}

var regcallback = function (status) {
    debugger
    if (status === Strophe.Status.REGISTER) {
        connection.regusr.submit();
    } else if (status === Strophe.Status.REGISTERED) {
        log("Registered user successfully.");
        connection.authenticate();
    } else if (status === Strophe.Status.CONNECTED) {
        log("After Registered user, connected to server.");
    } else {
        // every other status a connection.connect would receive
    }
};

function registerUser() {
    connection.regusr.init(connection);
    connection.regusr.fields.username = $('#regjid').get(0).value();
    connection.regusr.fields.password = $('#regpass').get(0).value();
    connection.regusr.connect("JW",regcallback);
}

$(document).ready(function () {
    connection = new Strophe.Connection(BOSH_SERVICE);
    connection.rawInput = rawInput;
    connection.rawOutput = rawOutput;
    //connection.xmlInput = xmlInput;
    //connection.xmlOutput = xmlOutput;

    $('#connect').bind('click', function () {
        var button = $('#connect').get(0);
        if (button.value == 'connect') {
            button.value = 'disconnect';

            connection.connect($('#jid').get(0).value,
                $('#pass').get(0).value,
                onConnect);
        } else {
            button.value = 'connect';
            connection.disconnect();
        }
    });
});
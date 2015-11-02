
Chatroom Component with XMPP server
============

Will build a montagejs chatroom compoennt with a XMPP server.

Start Openfire server on Mac
============================
sudo su
export JAVA_HOME=`/usr/libexec/java_home`
/usr/local/openfire/bin/openfire.sh

Openfire Web administrator
=========================
http://192.168.1.238:9090  admin 123456

Client Configuration
===================
Open core/chat-app-delegate.js
BOSH_SERVICE: "http://192.168.1.238:7070/http-bind/",
SERVICE_DOMAIN:"conference.toms-mbp" (In the above Openfire Web administrator control panel Group Chat page eg. conference.toms-mbp)





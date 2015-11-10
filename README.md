
Chatroom Component with XMPP server
============

Will build a montagejs chatroom compoennt with a XMPP server.

##### Install Openfire server on linux(centos)v
. Download the latest Openfire rpm package from http://www.igniterealtime.org/downloads/index.jsp#openfire
. rpm -ivh openfire-3.10.2-1.i386.rpm


. sudo su
. export JAVA_HOME=`/usr/libexec/java_home`
. /usr/local/openfire/bin/openfire.sh

Openfire Web administrator
=========================
. http://localhost:9090  admin 123456

Client Configuration
===================
. Open core/chat-app-delegate.js
. BOSH_SERVICE: "http://localhost:7070/http-bind/",
. SERVICE_DOMAIN:"conference.toms-mbp" (In the above Openfire Web administrator control panel Group Chat page eg. conference.toms-mbp)






Chatroom Component with XMPP server
============

Will build a montagejs chatroom compoennt with a XMPP server.

##### Install & Config Openfire server on linux(centos) #####
1. Download the latest Openfire tar package from http://www.igniterealtime.org/downloads/index.jsp#openfire
2. tar -xf openfire_3_10_2.tar.gz
3. cd openfire/bin
4. ./openfire start
5. In browser open  http://localhost:9090/ (* Change ip address to host address *) to setup Openfire
6. At the second setup page  input *contour* as Domain  then click bottom-right 'continue' button
7. At the third setup page (Database Settings)  choose "Embedded Database" option

> Note: Openfire depend on JAVA,  if there is not JAVA on host, please install JAVA

> If on host there is firewall please open port 9090  and 9091


##### Openfire console admin #####

1. Open http://localhost:9090
2. User name is *admin*  not email address, then password is setup in the above last step

> Openfire demo server on Siloon Aly port number is 9070

Client Configuration
===================
. Open core/chat-app-delegate.js
. BOSH_SERVICE: "http://localhost:7070/http-bind/",
. SERVICE_DOMAIN:"conference.contour" (In the above Openfire Web administrator control panel Group Chat page eg. conference.contour)





"use strict";

//
// 1. create key
// 2. set up OTR
// 3. peer server -- publish our key + ask for our buddy's fingerprint
// 4. connect directly to our peer with OTR
// 
// # persistence of key across app restarts?
// # on server -- when "registering" a new key, ask them to sign with the DSA key.
//


// TODO:
// manage multiple sessions
localStorage.SESSIONS = {};
localStorage.SESSIONS[buddy.their_priv_pk.fingerprint()] = {

};



/* This code is used to run as soon as Intel activates */

var onDeviceReady=function(){
    console.log('AAAA');
    //hide splash screen
    intel.xdk.device.hideSplashScreen();
    console.log('Generating Key');
    

    var buddy;

    // 1. create key + 2. set up OTR
    if (localStorage.privkey == null) {
        DSA.createInWebWorker(null, function (key) {
                buddy = new OTR({
                    priv: key,
                    // setting `smw` to a truthy value will perform the socialist
                    // millionaire protocol in a webworker.
                    smw: {}
                });
                buddy.REQUIRE_ENCRYPTION = true;
        })
    }

    buddy.on('ui', function(msg, isEncrypted) {
        alert(msg);
    })




    localStorage.user.OTR = new OTR({priv: user.DSA});
    console.log(localStorage.user.DSA.fingerprint());
    
    var user = localStorage.user;



    // 3. peer server -- publish our key + ask for our buddy's fingerprint  
    var peer = new Peer({key: 'yourkeyhere'}); // peerjs API key

    // ?? or: var peer = new Peer({key: user.DSA.fingerprint()});


    peer.on('open', function(id) {
      localStorage.myPeerID = id;
    });

    peer.on('data', function() {
        // do stuff like receive messages
    })

    // when a friend contacts us directly -- connection OPEN?
    peer.on('connection', function(conn) {
      conn.on('data', function(data){
        buddy.receiveMessage(data);
      });
    });

    // connect to our buddy, once we've found him/her
    var dataConnection = remotePeer.connect(id, {
        reliable: true,
        metadata: {
            fingerprint: user.DSA.fingerprint(),
            pubkey: user.DSA.packPublic()
        }
    });

    
};



// Say hello to server

node.put('Fingerprint', JSON.stringify({
    key: "full public key",
    ip: "current IP address"
}));




document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);

var MINI = require('minified');
var _=MINI._, $=MINI.$, $$=MINI.$$, EE=MINI.EE, HTML=MINI.HTML;
$(function(){
    $('#bleh').add('boo');
    $('#bleh').on('click', function(){
        console.log('Clicked');
        $('#bleh').set({$left: '100px', $top: '10px'}).animate({$left: '100px', $top: '200px'}, 1000);   
    });
});

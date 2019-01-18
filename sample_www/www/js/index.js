var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() 
    {
        app.receivedEvent('deviceready');

        var pushNotification;

        $("#app-status-ul").append('<li>deviceready event received</li>');

        try 
        { 
            pushNotification = window.plugins.pushNotification;

            $("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
            
            if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos' ) 
            {
                pushNotification.register(app.successHandler, app.errorHandler, {"senderID":"661780372179", "ecb":"app.onNotification"});		// required!
            } 
            else 
            {
                alert("Device not supported");
            }
        }
        catch(err) 
        { 
            txt="There was an error on this page.\n\n"; 
            txt+="Error description: " + err.message + "\n\n"; 
            alert(txt); 
        }

    },
    
    successHandler : function (result) {
        $("#app-status-ul").append('<li>success:'+ result +'</li>');
    },
    
    errorHandler : function (error) {
        $("#app-status-ul").append('<li>error:'+ error +'</li>');
    },

    // handle GCM notifications for Android
    onNotification : function (e) 
    {
        $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
        
        switch( e.event )
        {
            case 'registered':
            if ( e.regid.length > 0 )
            {
                $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                console.log("regID = " + e.regid);
            }
            break;
            
            case 'message':
                // if this flag is set, this notification happened while we were in the foreground.
                // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                if (e.foreground)
                {
                    $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
                }
                else
                {	// otherwise we were launched because the user touched a notification in the notification tray.
                    if (e.coldstart)
                        $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                    else
                    $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                }
                    
                $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
                //android only
                $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                //amazon-fireos only
                $("#app-status-ul").append('<li>MESSAGE -> TIMESTAMP: ' + e.payload.timeStamp + '</li>');
            break;
            
            case 'error':
                $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
            break;
            
            default:
                $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

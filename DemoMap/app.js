
Ext.Loader.setPath({
    'Ext': '../../src',
    'Ext.plugin': 'lib/plugin'
});
var longitude=0;
var latitude=0;



Ext.application({
    startupImage: {
        '320x460': 'resources/startup/Default.jpg',
        '640x920': 'resources/startup/640x920.png', 
        '640x1096': 'resources/startup/640x1096.png', 
        '768x1004': 'resources/startup/768x1004.png', 
        '748x1024': 'resources/startup/748x1024.png', 
        '1536x2008': 'resources/startup/1536x2008.png', 
        '1496x2048': 'resources/startup/1496x2048.png' 
    },

    isIconPrecomposed: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@144.png'
    },

    name:'MyMap',
    models: [ 'GreetingModel' ],
    stores: [ 'GreetingStore' ],

    requires: [
        'Ext.Map',
        'Ext.Button',
        'Ext.SegmentedButton',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.plugin.google.Traffic',
        'Ext.plugin.google.Tracker'
    ],

    launch: function() {
        


        Ext.create('MyMap.store.GreetingStore', {
            autoLoad: true,
            listeners: {
                load: function (self, records) {
                    
                    
                    console.log(records);
                    longitude=28.6100; 
                    latitude=77.2300;  

                    console.log(latitude+" "+longitude+ "ty");
        
        var position = new google.maps.LatLng(longitude, latitude),  


            infowindow = new google.maps.InfoWindow({
                content: 'My home'
                 
            }),

           
            image = new google.maps.MarkerImage(
                'resources/images/point.png',
                new google.maps.Size(32, 31),
                new google.maps.Point(0, 0),
                new google.maps.Point(16, 31)
            ),

            shadow = new google.maps.MarkerImage(
                'resources/images/shadow.png',
                new google.maps.Size(64, 52),
                new google.maps.Point(0, 0),
                new google.maps.Point(-5, 42)
            ),

            trackingButton = Ext.create('Ext.Button', {
                iconCls: 'locate'
            }),

            trafficButton = Ext.create('Ext.Button', {
                pressed: true,
                iconCls: 'maps'
            }),

            toolbar = Ext.create('Ext.Toolbar', {
                docked: 'top',
                ui: 'light',
                items: [
                    {
                        iconCls: 'home',
                        handler: function() {
                            alert("handler");
                           
                            var segmented = Ext.getCmp('segmented'),
                                pressedButtons = segmented.getPressedButtons(),
                                trafficIndex = pressedButtons.indexOf(trafficButton),
                                newPressed = (trafficIndex != -1) ? [trafficButton] : [];
                            segmented.setPressedButtons(newPressed);

                            mapdemo.getMap().panTo(position);
                        }
                    },
                    {
                        id: 'segmented',
                        xtype: 'segmentedbutton',
                        allowMultiple: true,
                        listeners: {
                            toggle: function(buttons, button, active) {
                                if (button == trafficButton) {
                                    mapdemo.getPlugins()[1].setHidden(!active);
                                }
                                else if (button == trackingButton) {
                                    var tracker = mapdemo.getPlugins()[0],
                                        marker = tracker.getMarker();
                                    marker.setVisible(active);
                                    tracker.setTrackSuspended(!active);
                                }
                            }
                        },
                        items: [
                            trackingButton, trafficButton
                        ]
                    }
                ]
            });

        var mapdemo = Ext.create('Ext.Map', {
            mapOptions : {
                center : new google.maps.LatLng(longitude, latitude),  
                zoom : 12,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },

            plugins : [
                new Ext.plugin.google.Tracker({
                    trackSuspended: true,  
                    allowHighAccuracy: false,
                    marker: new google.maps.Marker({
                        position: position,
                        title: 'My Current Location',
                        shadow: shadow,
                        icon: image
                    })
                }),
                new Ext.plugin.google.Traffic()
            ],
            mapListeners: {
                dragstart: function() {
                    var segmented = Ext.getCmp('segmented'),
                        pressedButtons = segmented.getPressedButtons().slice(),
                        trackingIndex = pressedButtons.indexOf(trackingButton);
                    if (trackingIndex != -1) {
                        pressedButtons.splice(trackingIndex, 1);
                        segmented.setPressedButtons(pressedButtons);
                    }
                }
            },

            listeners: {
                maprender: function(comp, map) {
                    var marker = new google.maps.Marker({
                        position: position,
                        title : 'My Home',
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });

                    setTimeout(function() {
                        map.panTo(position);
                    }, 1000);
                }

            }
        });

        Ext.create('Ext.Panel', {
            fullscreen: true,
            layout: 'fit',
            items: [toolbar, mapdemo]
        });

                
                }
            }
        });
        
    }
});

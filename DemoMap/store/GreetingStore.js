Ext.define('DemoMap.store.GreetingStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'DemoMap.model.GreetingModel',
        proxy: {
            
            type: 'rest',
            url: 'http://localhost:8081/openmrs-standalone/ws/rest/v1/location?v=full',

            reader: {
                         type: 'json',
                         rootProperty: 'results'
                    }
        },

        listeners: {
            beforeload: function () {
                alert('beforeload');
               
            }
        }
    }
});
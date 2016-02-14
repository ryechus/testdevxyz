define([
    'jquery',
    'backbone',
    ], function($, Backbone){
        var FieldModel = Backbone.Model.extend({
            defaults: {
                'label': 'Label',
                'placeholder': 'Placeholder'
            }
        });
        return FieldModel;
});
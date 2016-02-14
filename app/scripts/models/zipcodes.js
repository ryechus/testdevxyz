define([
    'jquery',
    'backbone',
    ], function($, Backbone){
        var ZipCodeModel = Backbone.Model.extend({
            urlRoot: 'http://ZiptasticAPI.com/'
        });
        return ZipCodeModel;
});
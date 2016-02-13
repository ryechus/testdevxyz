define([
    'backbone',
    'hbs!templates/form',
], function(Backbone, FormTemp) {
  var App = Backbone.View.extend({

    el: 'body',

    events: {
        'click #nextForm': 'getNextForm',
    },

    initialize: function() {
      console.log( 'Wahoo!' );
    },

    getNextForm: function(){
        var el = $('.form-box-inputs');
        $('.back').show();
        el.empty();
        el.html(FormTemp());

    }
  });

  return App;
});
require.config({
  paths: {
    'jquery': 'vendor/jquery/dist/jquery',
    'underscore': 'vendor/underscore-amd/underscore',
    'backbone': 'vendor/backbone-amd/backbone',
    hbs: 'vendor/require-handlebars-plugin/hbs',
    'jqueryValidate': 'vendor/jquery-validate/dist/jquery.validate',
  },

  hbs: {
      templateExtension: 'html',
  },
});

require(['views/app'], function(AppView) {
  new AppView;
});
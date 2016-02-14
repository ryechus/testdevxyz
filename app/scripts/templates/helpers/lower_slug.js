define('templates/helpers/lower_slug', ['hbs/handlebars'], function ( Handlebars ) {
    function lower_slug(input) {
        return input.toLowerCase().replace(' ', '_');
    }
  Handlebars.registerHelper( 'lower_slug', lower_slug );
  return lower_slug;
});
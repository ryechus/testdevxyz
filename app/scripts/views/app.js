define([
    'backbone',
    'models/zipcodes',
    'models/states',
    'hbs!templates/form2',
], function(Backbone, ZipCodeModel, States, FormTemp) {
  var App = Backbone.View.extend({

    el: '.form-box',

    events: {
        // 'click #nextForm': 'getNextForm',
        // 'click #prevForm': 'getPrevForm',
        'click button': 'submit',
        'click .icon-down-open': 'activateDropdown',
    },

    initialize: function() {
        var form1 = new Backbone.Collection(),
            form2 = new Backbone.Collection(),
            form3 = new Backbone.Collection();
        this.form_data = [];
        this.page = 0;

        form1.add([
            {
                'label': 'First Name',
                'default_input': true
            },
            {
                'label': 'Last Name',
                'default_input': true
            },
            {
                'label': 'Email',
                'placeholder': 'name@mail.com',
                'default_input': true
            },
            {
                'label': 'Zip Code',
                'placeholder': '12345',
                'default_input': true
            }
        ]);
        form2.add([
            {
                'label': 'City',
                'placeholder': 'Chicago',
                'default_input': true
            },
            {
                'label': 'State',
                'state_dropdown': true
            },
            {
                'label': 'Birthdate',
                'placeholder': 'MM/DD/YYYY',
                'default_input': true,
            },
            {
                'label': 'Phone Number',
                'placeholder': '123-456-7890',
                'default_input': true
            }
        ]);
        form3.add([
            {
                'label': 'Pay Date 1',
                'placeholder': 'MM/DD/YYYY',
                'default_input': true,
            },
            {
                'label': 'Pay Date 2',
                'placeholder': 'MM/DD/YYYY',
                'default_input': true,
            },
            {
                'label': 'Employment Type',
                'default_input': true,
            },
            {
                'label': 'Employer Name',
                'placeholder': 'e.g. XYZ',
                'default_input': true
            }
        ]);
        this.form_data.push(form1);
        this.form_data.push(form2);
        this.form_data.push(form3);

        this.states = States;

        this.$el.find('.form-box-inputs').html(FormTemp(this.form_data[0]));
    },

    activateDropdown: function(e){
        var target = $(e.currentTarget);

        console.log(e.currentTarget.previousSibling)
    },

    validate: function(inputs){
        var invalid = false;
        $.each(inputs, function(index, input) {
            var el = $(input);
            if (el.hasClass('required')) {
                if (el.val() === ''){
                    el.addClass('error');
                    invalid = true;
                }else {
                    el.removeClass('error');
                }
            }
        });
        if (invalid) {
            return false;
        }else{
            return true;
        }
    },

    submit: function(e){
        e.preventDefault();
        var el = this.$el.find('.form-box-inputs').eq(0),
            target = $(e.currentTarget),
            next = target.hasClass('next');

        var inputs = el.find('input');
        if (next) {
            if (!this.validate(inputs)) {
                return false;
            }
        }

        if (this.page === 0){

            var zip_input = el.find('input[name="zip_code"]'),
                city_by_zip = new ZipCodeModel({'id': zip_input.val()}),
                that = this;

            city_by_zip.fetch({
                success: function(model, response, options){
                    that.zip_data = response;
                    if (next){
                        that.getNextForm();
                    }else{
                        that.getPrevForm();
                    }
                },
                error: function(model, response, options){
                    alert(response);
                }
            });
        }else{
            if (next){
                this.getNextForm();
            }else{
                this.getPrevForm();
            }
        }
    },

    getNextForm: function(){
        var el = this.$el.find('.form-box-inputs').eq(0);

        $('.back').show();
        if (this.page < this.form_data.length - 1){
            var _form_data = this.form_data[++this.page]
            if (typeof this.zip_data !== 'undefined'){
                    _form_data['states'] = this.states;
                    _form_data.findWhere({'label': 'City'})
                    .set('value', this.zip_data.city)

                    this.state = this.zip_data.state;
                    delete this.zip_data;
            }

            el.empty();
            el.html(FormTemp(_form_data));
            $('select option[value="'+this.state+'"]').prop('selected', true);
        }
    },

    getPrevForm: function(e){
        var el = this.$el.find('.form-box-inputs');
        if (this.page > 0){
            el.empty();
            el.html(FormTemp(this.form_data[--this.page]));
            if (this.page == 0){
                $('.back').hide();
            }
        }
    }
  });

  return App;
});
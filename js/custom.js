/* =========================================
 * full screen intro 
 *  =======================================*/

function fullScreenContainer() {

    var screenWidth = $(window).width() + "px";
    // var screenHeight = '';
    
    var $windowHeight = $(window).height() // should return a number and not a string of a number
    var newHeight = $windowHeight*.80  // displays height at 80% of window height
    var screenHeight = newHeight + "px"

 //    if ($(window).height() > 500) {
	// screenHeight = $(window).height() + "px";
 //    }
 //    else {
	// screenHeight = "500px";
 //    }


    $("#intro, #intro .item").css({
	width: screenWidth,
	height: screenHeight
    });
}

$.ajax({
   type: 'GET',
   url: 'scripts/cda_courses.json',
   dataType: 'json',
   success: function( data ) {
      

      //This is the initial thumbnail view build
      var thumbnailSource = $('#course_listing_template').html();
      var thumbnailTemplate = Handlebars.compile(thumbnailSource);
      var thumbnailHTML = thumbnailTemplate(data);
      $('#Container').append(thumbnailHTML);


      // Initializes MixItUp functionality after the AJAX call is successful
      // and after the Handlebars templates are built
      $('#Container').mixItUp({
         callbacks: {
            onMixFail: function(state){
               console.log('this is failing');
          },
            onMixEnd: function(state){
              console.log(state.activeFilter)
              $filterResults = $('.filter_results');
              
              $filterResults.html(state.activeFilter);


            }
         },
         layout: {
            display: 'block'
         },
         controls: {
            toggleFilterButtons: true,
            toggleLogic: 'and'
         }
      });
     
    var today = new Date();

    var date = $('.class_date').html()

    console.log(today);
    console.log('this is the date ' + date); 
    console.log(date > today) // this makes it true, older dates are greater than
   }
});

Handlebars.registerHelper('date', function (lvalue, operator, options) {

    var operators, result;
    var today = new Date();
    var comparison = new Date(lvalue);
    
    operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };
    
    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }
    
    result = operators[operator](comparison, today);
    
    if (result) {

        return options.fn(this);
    } 
    else {

        return options.inverse(this);
    }

});


Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

    var operators, result;
    
    if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }
    
    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }
    
    operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };
    
    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }
    
    result = operators[operator](lvalue, rvalue);
    
    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});
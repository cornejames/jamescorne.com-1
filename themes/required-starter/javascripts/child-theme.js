/**
 * Here goes all the JS Code you need in your child theme buddy!
 */
(function($) {
    //Init stuff and helper functions
    var screenRes = $(window).width();
    var state     = $.cookie('viewingContent');
    //If viewing content, always hide office at first.
    if(state == 1) {
        $('#zoom-wrap').hide();
    }
    //Setup Screen Context variables
    if(screenRes > 1024) {
        $.cookie('deviceContext', 'desktop');
    } else if( screenRes < 1025 && screenRes >480 ) {
        $.cookie('deviceContext', 'tablet');
    } else {
        $.cookie('deviceContext', 'mobile');
    }
    //Helper to calculate the margins around the office image
    function positionOffice() {
      var vh = $(window).height();
      var ih = $('.office-bg').outerHeight();
      var zm = ( vh - ih ) / 2;
      $('.office-bg').css({ 'margin-top' : zm, 'margin-bottom' : zm });
    }
    
    /**
     * Position the office elements
     */
    
    $(window).load(function() {
      positionOffice();    
    });
        
    $(window).resize(function() { 
        positionOffice();
        if($(window).width()  < 1024 ) {
       		$('#zoom-wrap').fadeOut('fast');
       		$('.office-toggle').fadeOut('fast');
       		$.cookie('viewingContent', 1);
        }
        if( $(window).width() > 1023 ) {
        	$('.office-toggle').fadeIn('fast');
        }
    });
    
    
    /**
     * Toggle the Office
     */
    
   $('.office-toggle a').click(function(){
      //Is the user closing the office space?
      var c = $(this).parent('li').hasClass('close');
      //If so, set a cookie so that it doesn't reappear on the next page
      if(c) {
          $.cookie('viewingContent', 1);
      } else {
          //Else remove the cookie
          $.removeCookie('viewingContent');
      }
      //Fade office in/out and reposition it
      $('#zoom-wrap').fadeToggle( 'fast', 'swing', positionOffice() );
      return false;
   });
   
   
}(jQuery));
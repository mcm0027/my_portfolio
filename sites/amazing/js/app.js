//var $overlay = $('<div id="overlay"></div>');

//var $image = $("<img>");

//var $caption = $("<p></p>");

 //$overlay.append($image);
 //$overlay.append($caption);
 //$("body").append($overlay);

//$("#gallery a").click(function(event) {
 //   event.preventDefault();
 //   var imageLocation = $(this).attr("href");


  //  $image.attr("src", imageLocation);
 //  	$overlay.show();
  // 	var captionText = $(this).children("img").attr("alt");
 // 	$caption.text(captionText);
  
  



//});

 //$overlay.click(function() {
  //  $(this).hide();
  //  });

/// Home page stylings


//$("#wrapper").hide().show(2000);

//$("#frontFoot").hide().show(2000);

//$(document).ready(function() {

  // var docHeight = $(window).height();
 //  var footerHeight = $('#footer').height();
 //  var footerTop = $('#footer').position().top + footerHeight;

//   if (footerTop < docHeight) {
  //  $('#footer').css('margin-top', 10+ (docHeight - footerTop) + 'px');
 //  }
  //});


$(".animsition").animsition({
  inClass: "fade-in",
  outClass: "fade-out",
  inDuration: 1500,
  outDuration: 1500


});

$("header").sticky();




$(function () {
 
  // pc
  if ($(document.body).width() > 768) {
    $(".stair").hover(function () {
      $(this).find('dl').stop().slideDown(); 

    }, function () {
      $(this).find('dl').stop().slideUp(); 
    }),
      $(".s-menu .hasdrop").hover(function () {
        $(this).children('.t-menu').stop().show();

      }, function () {
        $(this).children('.t-menu').stop().hide();
      });
  }
 

  $(".navbtn").click(function () {
    $(this).toggleClass('open');
    if ($(this).is('.open')) {
      $('.navBar').stop().slideDown();
    } else {
      $('.navBar').stop().slideUp();
    }
  })
 

  // $(document).on("click", ".mobile-navbtn", function (e) {
  //   if ($(this).is('.open')) {
  //     $(this).removeClass("open").parents("a").next(".drop-menu").slideUp();
  //   } else {
  //     $(this).parents("li").siblings().find('.mobile-navbtn').removeClass('open').parents("li").find(".drop-menu").slideUp();
 
  //     $(this).addClass("open").parents("a").next(".drop-menu").slideDown();
  //   }
  //   // $(this).addClass("open").parents("li").find(".sub").slideDown();
  //   e.preventDefault();
  // })
 

  function scrollbody(){
    if ($(window).scrollTop() >= 2) {
      $(".site-nav").addClass("scrollHead")
    }
    else {
      $(".site-nav").removeClass("scrollHead")
    }
  }
  $(window).scroll(function () {
    scrollbody()
  });
	$(window).trigger('scroll');

  if ($(document.body).width() > 768) {
    $(".start_search").click(function () {
      $(".site-nav").attr("id", "showopen")
    })
    $(".js-search-btn-close").click(function () {
      $(".site-nav").removeAttr("id", "showopen")
    })
  }
  if ($(document.body).width() < 768) {
    $(".start_search").click(function () {
      $("#js-search-overlay").show();
      $(".M_search").fadeIn();
    })
    $("#js-search-overlay").click(function () {
      $("#js-search-overlay").hide();
      $(".M_search").hide();
    })
  }
  $(window).resize(function () {
    if ($(document.body).width() > 768) {
      $(".start_search").click(function () {
        $(".site-nav").attr("id", "showopen")
      })
      $(".js-search-btn-close").click(function () {
        $(".site-nav").removeAttr("id", "showopen")
      })
    }
    if ($(document.body).width() < 768) {
      $(".start_search").click(function () {
        $("#js-search-overlay").show();
        $(".M_search").fadeIn();
      });
      $("#js-search-overlay").click(function () {
        $("#js-search-overlay").hide();
        $(".M_search").hide();
      }); 
    }
  
  });

 
  $(".link_box").click(function () {
    $(".Friendlink").fadeToggle();
  })

  $(window).scroll(function(){
    var srctop = $(window).scrollTop();
    if(srctop > 140){
      $('body').addClass('SmallHeader');
    }else{
      $('body').removeClass('SmallHeader');
    }
  });
})


// function goTop(){ $('html, body').animate({   scrollTop: 0}, 500); return false;}

  
              
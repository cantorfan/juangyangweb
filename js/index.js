(function ($) {
  console.log($('nav').height());
  $(window).scroll(function () {
    var items = $(".animate-item");
    items.each(function () {
      var top = $(this).offset().top;
      var className = $(this).attr('animated') + ' animated';
      var scrollTop=$(window).scrollTop();
      if (top >= scrollTop && top < (scrollTop + $(window).height())) {
        $(this).addClass(className);
      } else {
        $(this).removeClass(className);
      }
      if(scrollTop>=$(".header").height()){
        $(".header").css("borderBottom","1px solid rgba(242, 242, 242, .2)");
      }else{
        $(".header").css("border","none");
      }
    });
    //document.getElementById("eq").offsetTop;
  });
  $('#button-bar button').hover(function(){
    var index=$(this).parent().index()
    $(this).addClass('active').parent().siblings().find('button').removeClass('active')
    $('.text-case>p').eq(index).fadeIn().siblings().fadeOut()
  })
  // 根据屏幕改变背景图的大小
  function imgHeight(){
    let pc=navigator.userAgent.toLowerCase().match(/windows/i) == "windows";
    if(pc){
      $('#background-img').css("height",$(window).height());
    }else{
      $('#background-img').css("height","");
    }
  }
  imgHeight();
  $(window).resize(function(){
    imgHeight();
  })
})($)

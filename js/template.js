(function ($) {
  $.get("templates/header.html", function (data) { //初始將a.html include div#iframe
    $("#header").html(data);
  });
  $.get("templates/footer.html", function (data) { //初始將a.html include div#iframe
    $("#footer").html(data);
  });
  var hashIndex = location.hash.substring(1)
    var $tabBar = $('#tab-bar button'),
        $tabsContent = $("#tab-box .tab");
    $tabBar.eq(hashIndex).addClass('active').parent().siblings().find('button').removeClass('active')
    $tabsContent.eq(hashIndex).show().siblings().hide()
    $tabBar.click(function () {
      var index = $(this).parent().index()
      $(this).addClass('active').parent().siblings().find('button').removeClass('active')
      $tabsContent.eq(index).show().siblings().hide()
    })
})($)

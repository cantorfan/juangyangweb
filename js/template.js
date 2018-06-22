(function ($) {
  $.get("templates/header.html", function (data) { //初始將a.html include div#iframe
    $("#header").html(data);
  });
  $.get("templates/footer.html", function (data) { //初始將a.html include div#iframe
    $("#footer").html(data);
  });
})($)

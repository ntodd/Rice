$(document).ready(function () {
  
  $("form").submit(function() {
    return false;
  });

  $("#signup_button").click(function () { 
    if ($("#signup").validate().form()) {
      $.post("/signup", $("#signup").serialize(),
        function(data){
          $("#success").slideDown();
        }
      );
    };
    return false;
  });

});
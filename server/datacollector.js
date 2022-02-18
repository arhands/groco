var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.kroger.com/v1/connect/oauth2/token",
    "method": "POST",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic {{base64(“CLIENT_ID:CLIENT_SECRET”)}}"
    },
    "data": {
      "grant_type": "client_credentials",
      "scope": "{{product.compact}}"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=tacos&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/
function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}


//This variable is my api that stores the information I want to display
var whiskeyURL = "https://api.etsy.com/v2/listings/active.js?api_key=r7gmr7yml4qg7ihxmuwzn5xn&keywords=whiskey&includes=Images,Shop";

      fetchJSONP(whiskeyURL, function(data) {
        console.log(data)
        //this variable grabs the results for each item in my api URL
        var whiskey = data.results;
        whiskey.forEach(displaywhiskey);
      });
//This function is a template that makes data I have defined repeat
function displaywhiskey(whiskey) {
  var source = document.querySelector('#whiskey-template').innerHTML;

  var template = Handlebars.compile(source);
  var outputHTML = template(whiskey);

  var whiskeyUl = document.querySelector('.js-whiskey');
  whiskeyUl.insertAdjacentHTML('beforeend', outputHTML);
      }

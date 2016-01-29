##FCC API Basejump: URL shortener microservice

Prepared for FreeCodeCamp's [URL shortener microservice basejump](http://www.freecodecamp.com/challenges/url-shortener-microservice)

###User stories:

1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3. When I visit that shortened URL, it will redirect me to my original link.

###Website:

[https://url-shortener-ktakats.herokuapp.com](https://url-shortener-ktakats.herokuapp.com)

###Examples:

`https://url-shortener-ktakats.herokuapp.com/www.google.com`
            
returns

`{"original": "www.google.com", "shortened": "https://url-shortener-ktakats.herokuapp.com/1"}`
            
and

`https://url-shortener-ktakats.herokuapp.com/1`

redirects to 

`www.google.com`
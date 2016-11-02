# A4M33VIA
Simple NodeJS Server and Javascript client

# Server
- Written in NodeJS using simple packages and Express.JS framework
- Server runs default on port 8088

HTTP REQUESTS:
  /date/ - Returns date in JSON format {date : dd:mm:yyyy}
  /time/ - Returns time in JSON format {time : HH:MM:ss}
  /datetime/ - Returns datetime in JSON format {date : dd:mm:yyyy, time : HH:MM:ss}
  / - Root returns message "Hello World!"
  
WEBSOCKET
  - Websocket sends every 1000ms current time in JSON format to the clients
  - On message "date" returns current date in JSON format
  
- Server is written for HTTP only, for HTTPS you need to change httpServer to "https" package.

#Client
  - jQuery example: sends GET request to the server using HTTP (jQuery AJAX)
  - XMLHTTPRequest example: sends GET request to the server using HTTP (AJAX)
  - Connects to server via Websocket
      - sends message via websocket to get "date"
      - receives current time from websocket
  - Displays nearest pubs (< 500m) in the area on Google Map

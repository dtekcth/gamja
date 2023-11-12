# Setting up gamja

An HTTP server must be configured to serve the gamja static files. Usually,
the same HTTP server is used as a reverse proxy for the IRC WebSocket.

## [soju]

Add a WebSocket listener to soju, e.g. `listen wss://127.0.0.1:8080`. Then
configure your reverse proxy to serve gamja files and proxy `/socket` to soju.

## [webircgateway]

Setup webircgateway to serve gamja files:

```ini
[fileserving]
enabled = true
webroot = /path/to/gamja
```

Then configure gamja to connect to `/webirc/websocket/` (either by setting
`server.url` in the [configuration file], or by appending
`?server=/webirc/websocket/` to the URL).

## nginx

If you use nginx as a reverse HTTP proxy, make sure to bump the default read
timeout to a value higher than the IRC server PING interval. Example:

```
location / {
	root /path/to/gamja;
}

location /socket {
	proxy_pass http://127.0.0.1:8080;
	proxy_read_timeout 600s;
	proxy_http_version 1.1;
	proxy_set_header Upgrade $http_upgrade;
	proxy_set_header Connection "Upgrade";
	proxy_set_header X-Forwarded-For $remote_addr;
	proxy_set_header X-Forwarded-Proto $scheme;
}
```

If you are unable to configure the proxy timeout accordingly, or if your IRC
server doesn't send PINGs, you can set the `server.ping` option in
`config.json` (see below).

## [kimchi]

Setup kimchi to serve gamja files and proxy the WebSocket connection:

```
site irc.example.org {
	file_server /path/to/gamja
}
site irc.example.org/socket {
	reverse_proxy http://127.0.0.1:8080
}
```

[soju]: https://soju.im
[webircgateway]: https://github.com/kiwiirc/webircgateway
[kimchi]: https://sr.ht/~emersion/kimchi/
[configuration file]: config-file.md

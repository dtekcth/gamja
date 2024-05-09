# URL parameters

gamja settings can be overridden using URL query parameters:

- `server`: path or URL to the WebSocket server
- `nick`: nickname (if the character `*` appears in the string, it will be
  replaced with a randomly generated value)
- `channels`: comma-separated list of channels to join (`#` needs to be escaped)
- `open`: [IRC URL] to open
- `debug`: if set to 1, debug mode is enabled

Alternatively, the channels can be set with the URL fragment (ie, by just
appending the channel name to the gamja URL).

[IRC URL]: https://datatracker.ietf.org/doc/html/draft-butcher-irc-url-04

# Configuration file

gamja can be configured using a `config.json` file at the root. Example:

```json
{
	"server": {
		"url": "wss://irc.example.org",
		"autojoin": "#gamja"
	},
	"oauth2": {
		"url": "https://auth.example.org",
		"client_id": "asdf"
	}
}
```

Errors while parsing the configuration file are logged in the
[browser's web console].

## IRC server

The `server` object configures the IRC server.

- `url` (string): WebSocket URL or path to connect to. Defaults to `/socket`.
- `autojoin` (string or array of strings): Channel(s) to automatically join
  after connecting.
- `auth` (string): configure how the password UI is presented to the user. Set
  to `mandatory` to require a password, `optional` to accept one but not
  require it, `disabled` to never ask for a password, `external` to use SASL
  EXTERNAL, `oauth2` to use SASL OAUTHBEARER. Defaults to `optional`.
- `nick` (string): default nickname. If it contains a `*` character, it will be
  replaced with a random string.
- `autoconnect` (boolean): don't display the login UI, immediately connect to
  the server
- `ping` (number): interval in seconds to send PING commands. Set to 0 to
  disable, this is the default. Enabling PINGs can have an impact on client
  power usage and should only be enabled if necessary.

## OAuth 2.0

The `oauth2` object configures OAuth 2.0 authentication.

- `url` (string): OAuth 2.0 server URL. The server must support OAuth 2.0
  Authorization Server Metadata (RFC 8414) or OpenID Connect Discovery.
- `client_id` (string): OAuth 2.0 client ID.
- `client_secret` (string): OAuth 2.0 client secret.
- `scope` (string): OAuth 2.0 scope.

[browser's web console]: https://firefox-source-docs.mozilla.org/devtools-user/web_console/index.html

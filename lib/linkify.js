import { linkifyjs, html } from "./index.js";

linkifyjs.options.defaults.defaultProtocol = "https";

linkifyjs.registerCustomProtocol("irc");
linkifyjs.registerCustomProtocol("ircs");
linkifyjs.registerCustomProtocol("geo", true);

const IRCChannelToken = linkifyjs.createTokenClass("ircChannel", {
	isLink: true,
	toHref() {
		return "irc:///" + this.v;
	},
});

linkifyjs.registerPlugin("ircChannel", ({ scanner, parser }) => {
	const { POUND, UNDERSCORE, DOT, HYPHEN } = scanner.tokens;
	const { alphanumeric } = scanner.tokens.groups;

	const Prefix = parser.start.tt(POUND);
	const Channel = new linkifyjs.State(IRCChannelToken);
	const Divider = Channel.tt(DOT);

	Prefix.ta(alphanumeric, Channel);
	Prefix.tt(POUND, Channel);
	Prefix.tt(UNDERSCORE, Channel);
	Prefix.tt(DOT, Divider);
	Prefix.tt(HYPHEN, Channel);
	Channel.ta(alphanumeric, Channel);
	Channel.tt(POUND, Channel);
	Channel.tt(UNDERSCORE, Channel);
	Channel.tt(HYPHEN, Channel);
	Divider.ta(alphanumeric, Channel);
});

export default function linkify(text, onClick) {
	let links = linkifyjs.find(text);

	let children = [];
	let last = 0;
	links.forEach((match) => {
		if (!match.isLink) {
			return;
		}

		const prefix = text.substring(last, match.start);
		children.push(prefix);

		children.push(html`
			<a
				href=${match.href}
				target="_blank"
				rel="noreferrer noopener"
				onClick=${onClick}
			>${match.value}</a>
		`);

		last = match.end;
	});

	const suffix = text.substring(last);
	children.push(suffix);

	return children;
}

import { html, Component } from "/lib/index.js";
import linkify from "/lib/linkify.js";
import * as irc from "/lib/irc.js";

function djb2(s) {
	var hash = 5381;
	for (var i = 0; i < s.length; i++) {
		hash = (hash << 5) + hash + s.charCodeAt(i);
		hash = hash >>> 0; // convert to uint32
	}
	return hash;
}

function Nick(props) {
	function handleClick(event) {
		event.preventDefault();
		props.onClick();
	}

	var colorIndex = djb2(props.nick) % 16 + 1;
	var url = "irc:///" + encodeURIComponent(props.nick) + ",isnick";
	return html`
		<a href=${url} class="nick nick-${colorIndex}" onClick=${handleClick}>${props.nick}</a>
	`;
}

function LogLine(props) {
	var msg = props.message;

	function createNick(nick) {
		return html`
			<${Nick} nick=${nick} onClick=${() => props.onNickClick(nick)}/>
		`;
	}

	var date = new Date(msg.tags["time"]);
	var timestamp = date.toLocaleTimeString(undefined, {
		timeStyle: "short",
		hour12: false,
	});
	var timestampLink = html`
		<a href="#" class="timestamp" onClick=${(event) => event.preventDefault()}>${timestamp}</a>
	`;

	var lineClass = "";
	var content;
	switch (msg.command) {
	case "NOTICE":
	case "PRIVMSG":
		var text = msg.params[1];

		var actionPrefix = "\x01ACTION ";
		if (text.startsWith(actionPrefix) && text.endsWith("\x01")) {
			var action = text.slice(actionPrefix.length, -1);

			lineClass = "me-tell";
			content = html`* ${createNick(msg.prefix.name)} ${linkify(action)}`;
		} else {
			lineClass = "talk";
			content = html`${"<"}${createNick(msg.prefix.name)}${">"} ${linkify(text)}`;
		}
		break;
	case "JOIN":
		content = html`
			${createNick(msg.prefix.name)} has joined
		`;
		break;
	case "PART":
		content = html`
			${createNick(msg.prefix.name)} has left
		`;
		break;
	case "NICK":
		var newNick = msg.params[0];
		content = html`
			${createNick(msg.prefix.name)} is now known as ${createNick(newNick)}
		`;
		break;
	case "TOPIC":
		var topic = msg.params[1];
		content = html`
			${createNick(msg.prefix.name)} changed the topic to: ${linkify(topic)}
		`;
		break;
	default:
		if (irc.isError(msg.command) && msg.command != irc.ERR_NOMOTD) {
			lineClass = "error";
		}
		content = html`${msg.command} ${msg.params.join(" ")}`;
	}

	return html`
		<div class="logline ${lineClass}">${timestampLink} ${content}</div>
	`;
}

class NotificationNagger extends Component {
	state = { nag: false };

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state.nag = this.shouldNag();
	}

	shouldNag() {
		return window.Notification && Notification.permission !== "granted" && Notification.permission !== "denied";
	}

	handleClick(event) {
		event.preventDefault();

		Notification.requestPermission((permission) => {
			this.setState({ nag: this.shouldNag() });
		});
	}

	render() {
		if (!this.state.nag) {
			return null;
		}

		return html`
			<div class="logline">
				<span class="timestamp">--:--:--</span>
				${" "}
				<a href="#" onClick=${this.handleClick}>Turn on desktop notifications</a> to get notified about new messages
			</div>
		`;
	}
}

export default function Buffer(props) {
	if (!props.buffer) {
		return null;
	}

	return html`
		<div class="logline-list">
			<${NotificationNagger}/>
			${props.buffer.messages.map((msg) => html`
				<${LogLine} key=${msg.key} message=${msg} onNickClick=${props.onNickClick}/>
			`)}
		</div>
	`;
}

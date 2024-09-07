import { html, Component } from "../lib/index.js";
import * as irc from "../lib/irc.js";

export default function Membership(props) {
	if (!this.props.value) {
		return null;
	}

	// XXX: If we were feeling creative we could generate unique colors for
	// each item in ISUPPORT CHANMODES. But I am not feeling creative.
	const name = irc.STD_MEMBERSHIP_NAMES[this.props.value[0]] || "";
	return html`
		<span class="membership ${name}" title=${name}>
			${this.props.value}
		</span>
	`;
}

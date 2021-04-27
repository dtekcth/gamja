import { html, Component } from "../lib/index.js";

export default class VerifyForm extends Component {
	state = {
		code: "",
	};

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		var target = event.target;
		this.setState({ [target.name]: target.value });
	}

	handleSubmit(event) {
		event.preventDefault();

		this.props.onSubmit({ code: this.state.code });
	}

	render() {
		return html`
			<form onChange=${this.handleChange} onSubmit=${this.handleSubmit}>
				<label>
					Code:<br/>
					<input type="text" name="code" value=${this.state.code} autofocus required/>
				</label>
				<br/>

				<br/>
				${this.props.error ? html`
					<p class="error-text">${this.props.error}</p>
				` : null}
				<button>Verify</button>
			</form>
		`;
	}
}

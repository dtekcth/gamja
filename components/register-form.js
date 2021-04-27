import { html, Component } from "../lib/index.js";

export default class RegisterForm extends Component {
	state = {
		email: "",
		password: "",
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
		this.props.onSubmit({
			email: this.state.email,
			password: this.state.password,
		});
	}

	render() {
		return html`
			<form onChange=${this.handleChange} onSubmit=${this.handleSubmit}>
				<label>
					Email:<br/>
					<input type="email" name="email" value=${this.state.email} autofocus/>
				</label>
				<br/>

				<label>
					Password:<br/>
					<input type="password" name="password" value=${this.state.password} required/>
				</label>
				<br/>

				<br/>
				${this.props.error ? html`
					<p class="error-text">${this.props.error}</p>
				` : null}
				<button>Register</button>
			</form>
		`;
	}
}

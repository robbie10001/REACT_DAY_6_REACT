import React, {Component} from "react";
import { connect } from "react-redux";
import { setAuthToken } from "./../../actions";
import axios from "axios";

class RegisterForm extends Component {
    state = { 
        email: "", 
        password: "",
        error: null
    }

    componentDidMount() {
        console.log(this.props);
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const { history, setAuthToken } = this.props;
        const { email, password } = this.state;

        axios.post("http://localhost:3000/auth/register", { email, password })
            .then(response => {
                setAuthToken(response.data.token);
                history.push("/bookmarks");
            })
            .catch(error => {
                console.log(error);
                this.setState({ error });
            });
    }

    onInputChange = (name, event) => {
        this.setState({ [name]: event.target.value });
    }

    render() {
        const { email, password } = this.state;

        return (
            <form onSubmit={this.onFormSubmit}>
                <p>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(event) => this.onInputChange("email", event)} />
                </p>
                <p>
                    <label htmlFor="email">Password</label>
                    <input type="password" value={password} onChange={(event) => this.onInputChange("password", event)} />
                </p>
                <p>
                    <input type="submit" value="Register New User" />
                </p>
            </form>
        );
    }
}

export default connect(null, { setAuthToken })(RegisterForm);
import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUserAPI } from "../../../config/redux/action";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    const { history } = this.props;
    const res = await this.props
      .loginAPI({ email, password })
      .catch((err) => err);
    if (res) {
      this.setState({
        email: "",
        password: "",
      });
      console.log("Login Success: ", res);
      history.push("/");
    } else {
      console.log("Login Failed");
    }
  };
  render() {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="flex-col justify-center hero-content lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-5xl font-bold">
              Login Page {this.props.userProps}
            </h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  id="email"
                  className="input input-bordered"
                  onChange={this.handleChangeText}
                  value={this.state.email}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  id="password"
                  className="input input-bordered"
                  onChange={this.handleChangeText}
                  value={this.state.password}
                />
                <label className="label">
                  <a href="#" className="label-text-alt">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                {this.props.isLoading ? (
                  <button className="btn btn-primary loading"></button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={this.handleLoginSubmit}
                    loading={this.props.isLoading}
                  >
                    Login
                  </button>
                )}
              </div>
              <label className="label">
                <a href="/register" className="label-text-alt">
                  Register Account
                </a>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const reduxState = (state) => ({
  isLoading: state.isLoading,
});
const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});
export default connect(reduxState, reduxDispatch)(Login);

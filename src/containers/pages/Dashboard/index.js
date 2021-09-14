import React, { Component } from "react";
import { connect } from "react-redux";
import { addDataToAPI } from "../../../config/redux/action";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
  };
  handleSaveNotes = async () => {
    const { title, content } = this.state;
    const { saveNotes } = this.props;
    const res = await this.props;
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: this.props.userData.uid,
    };

    saveNotes(data);
    if (res) {
      this.setState({
        title: "",
        content: "",
        date: "",
      });
      console.log("Push Data Success: ", data);
    } else {
      console.log("Push Data Failed");
    }
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { title, content, date } = this.state;

    return (
      <div className="container">
        <div className="flex flex-col justify-center">
          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100 mx-auto my-20">
            <div className="card-body">
              <h2 className="card-title">Notes </h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="title"
                  className="input input-bordered"
                  value={title}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="textarea h-24 textarea-bordered textarea-info"
                  id="content"
                  placeholder="Content"
                  value={content}
                  onChange={this.handleInputChange}
                ></textarea>
              </div>
              {this.props.isLoading ? (
                <button className="btn btn-primary loading"></button>
              ) : (
                <button
                  className="btn btn-primary mt-10"
                  onClick={this.handleSaveNotes}
                >
                  Simpan
                </button>
              )}
            </div>
          </div>
          <div className="divider mx-20">CONTENT</div>
          <div className="card shadow-lg mx-auto bg-primary text-white w-full max-w-xl">
            <div className="card-body">
              <h2 className="card-title mb-0">Tittle</h2>
              <p className="text-gray-300 mb-3">14 September 2021</p>
              <p>Rerum reiciendis beatae tenetur excepturi</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  isLoading: state.isLoading,
});
const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
});
export default connect(reduxState, reduxDispatch)(Dashboard);

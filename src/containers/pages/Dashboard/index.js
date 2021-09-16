import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addDataToAPI, getDataFormAPI } from "../../../config/redux/action";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.uid);
  }

  handleSaveNotes = async () => {
    const { title, content } = this.state;
    const { saveNotes } = this.props;
    const res = await this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
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
    const { notes } = this.props;

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

          {notes.length > 0 ? (
            <Fragment>
              {notes.map((note) => {
                return (
                  <div
                    className="card shadow-lg mx-auto bg-primary text-white w-full max-w-xl my-2"
                    key={note.id}
                  >
                    <div className="card-body">
                      <h2 className="card-title mb-0">{note.data.title}</h2>
                      <p className="text-gray-300 mb-3">{note.data.date}</p>
                      <p>{note.data.content}</p>
                    </div>
                  </div>
                );
              })}
            </Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  isLoading: state.isLoading,
  notes: state.notes,
});
const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFormAPI(data)),
});
export default connect(reduxState, reduxDispatch)(Dashboard);

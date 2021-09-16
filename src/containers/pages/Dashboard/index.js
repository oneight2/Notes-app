import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  addDataToAPI,
  deleteDataFormAPI,
  getDataFromAPI,
  updateDataFormAPI,
} from "../../../config/redux/action";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "Simpan",
    noteId: "",
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.uid);
  }

  handleSaveNotes = async () => {
    const { title, content, textButton, noteId } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const res = await this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    };

    if (textButton === "Simpan") {
      saveNotes(data);
    } else {
      data.noteId = noteId;
      updateNotes(data);
    }

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

  updateNotesData = (note) => {
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: "Update",
      noteId: note.id,
    });
  };

  cancelButton = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "Simpan",
      noteId: "",
    });
  };

  deleteNotesData = (e, note) => {
    // fungsi agar ketika klik card data tidak muncul di input
    e.stopPropagation();
    const { deleteNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      noteId: note.id,
    };
    deleteNotes(data);
    console.log(data);
  };

  render() {
    const { title, content, date, textButton } = this.state;
    const { notes } = this.props;

    return (
      <div className="container mx-auto">
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
              {textButton === "Update" ? (
                <button
                  className="btn btn-warning mt-10"
                  onClick={this.cancelButton}
                >
                  {" "}
                  Cancel
                </button>
              ) : null}
              <button
                className="btn btn-primary mt-3"
                onClick={this.handleSaveNotes}
              >
                {textButton}
              </button>
            </div>
          </div>
          <div className="divider mx-20">CONTENT</div>

          {notes.length > 0 ? (
            <Fragment>
              {notes.map((note) => {
                return (
                  <div
                    className="card shadow-lg mx-auto bg-primary flex text-white w-full max-w-xl my-2 hover:bg-primary-focus"
                    key={note.id}
                    onClick={() => {
                      this.updateNotesData(note);
                    }}
                  >
                    <div className="card-body">
                      <h2 className="card-title mb-0">{note.data.title}</h2>
                      <p className="text-gray-300 mb-3">{note.data.date}</p>
                      <p>{note.data.content}</p>
                      <button
                        className="btn btn-error mt-5 btn-sm"
                        onClick={(e) => {
                          this.deleteNotesData(e, note);
                        }}
                      >
                        Delete
                      </button>
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
  getNotes: (data) => dispatch(getDataFromAPI(data)),
  updateNotes: (data) => dispatch(updateDataFormAPI(data)),
  deleteNotes: (data) => dispatch(deleteDataFormAPI(data)),
});
export default connect(reduxState, reduxDispatch)(Dashboard);

import React, { Component } from "react";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="flex justify-center">
          <div className="flex-1">
            <div class="card lg:card-side bordered shadow-lg my-10">
              <div class="card-body">
                <h2 class="card-title">Notes </h2>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="title"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">info</span>
                  </label>
                  <textarea
                    className="textarea h-24 textarea-bordered textarea-info"
                    placeholder="Bio"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex1">
            <div className="divider">OR</div>
          </div>
          <div className="flex1">
            <div className="card shadow-lg mx-5">
              <div className="card-body">
                <h2 className="card-title">no border with shadow</h2>
                <p>Rerum reiciendis beatae tenetur excepturi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

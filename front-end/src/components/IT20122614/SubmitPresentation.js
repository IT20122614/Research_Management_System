import React, { useState } from "react";
import { submitPresantation } from "../../services/StudentService";

export default function SubmitPresentation() {
  const [file, setFile] = useState([]);
  const groupid = "SE3030_GRP_28";

  function sendData(e) {
    const formData = new FormData();
    var form = document.getElementById("form");
    formData.append("image", file);
    formData.append("groupid", groupid);
    e.preventDefault();

    // axios
    //   .put("http://localhost:8081/api/students/presentation", formData)
    //   .then((res) => {
    //     console.log(res);
    //     alert("added");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    try {
      const response = submitPresantation(formData);

      console.log(response);
      setFile([0]);
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div>
        <br />
        <br />
        <center>
          <h3>Submit Presentation</h3>
        </center>
      </div>
      <div
        style={{
          backgroundColor: "#f2efd9",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={sendData} encType="multipart/form-data" id="form">
          <div className="row">
            <label className="col-sm-2 col-form-label">Attachment</label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control form-control-sm"
                name="image"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <center>
            <button type="submit" className="btn btn-warning">
              Add submission
            </button>
            <div id="snackbar">Presentation added</div>
          </center>
        </form>
      </div>
    </div>
  );
}

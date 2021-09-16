import firebase, { database } from "../../firebase";

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        dispatch({ type: "CHANGE_LOADING", value: false });
        resolve(true);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({ type: "CHANGE_LOADING", value: false });
        reject(false);
        // ..
      });
  });
};

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        const userData = {
          email: user.email,
          uid: user.uid,
          emailVerified: user.emailVerified,
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        console.log("successLogin:", userData);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: userData });
        resolve(true);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        console.log("errorLogin:", errorMessage);
        reject(true);

        // ..
      });
  });
};

export const addDataToAPI = (data) => (dispatch) => {
  database.ref("notes/" + data.userId).push({
    title: data.title,
    content: data.content,
    date: data.date,
  });
};

export const getDataFromAPI = (userId) => (dispatch) => {
  const urlNotes = database.ref("notes/" + userId);
  return new Promise((resolve, reject) => {
    urlNotes.on("value", function (snapshot) {
      // UBAH OBJECT KE ARRAY PAKE OBJECT.KEYS
      // console.log("get Data", snapshot.val());
      if (snapshot.val() != null) {
        const data = [];
        Object.keys(snapshot.val()).map((key) => {
          data.push({
            id: key,
            data: snapshot.val()[key],
          });
        });
        dispatch({ type: "SET_NOTES", value: data });
        resolve(snapshot.val());
      }
    });
  });
};

export const updateDataFormAPI = (data) => (dispatch) => {
  const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.set(
      {
        title: data.title,
        content: data.content,
        date: data.date,
      },
      (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

export const deleteDataFormAPI = (data) => (dispatch) => {
  const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
  console.log("action:", data);
  console.log("url:", urlNotes);
  return new Promise((resolve, reject) => {
    urlNotes.remove();
  });
};

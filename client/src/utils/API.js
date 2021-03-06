//-----   Using Axios for getting/posting to routes ---//
import axios from "axios";
//----------------------------------------------------//

export default {
  // -------- Use the following to get/post ------------//

  // For using the "routes/api" directory (using express and
  // actions on the front end that require database data), the format will look like:

  addUserToEmailList: function(userInfo) {
    return axios.post("/api/mailingList/", userInfo);
  },
  grabFoundersInfo: function() {
    return axios.get("/api/employee/");
  },
  searchMaterial: function(material) {
    return axios.post("/api/material/", material);
  },
  sendTrashTalksAnEmail: function(contactForm) {
    return axios.post("/api/emailing/contactUs/", contactForm);
  },
  grabUpdates: function() {
    return axios.get("/api/updates/");
  },
  grabBinInfo: function() {
    return axios.get("/api/bin/");
  }
};

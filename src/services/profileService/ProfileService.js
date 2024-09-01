import axios from "../api";

const ProfileService = {
  getProfile(){
    return axios.get(`/account/profile`);
  },

};

export default ProfileService;


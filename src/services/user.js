
import axios from "axios";

export const getUser = async () => {
  return axios.get("http://localhost:8080/api/user/1")
    .then((response) => {
      return response.data
    }).catch((err) => {
      console.log(err)
    });
}
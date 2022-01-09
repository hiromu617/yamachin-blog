import axios from "axios";

export const axiosClient = axios.create({
  baseURL:
    "https://translation.googleapis.com/language/translate/v2",
});

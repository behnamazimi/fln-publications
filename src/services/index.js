import axios from "axios";
import {config} from "../consts/config";

export function getJwtToken() {
  return axios.post(config.serviceEndpoint + "/oauth", {
    "grant_type": "client_credentials",
    "client_id": config.clientId,
    "client_secret": config.clientSecret
  })
}

export function getEditions(params, token) {
  return axios.get(config.serviceEndpoint + "/v2/magazine/edition?" + params, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
}
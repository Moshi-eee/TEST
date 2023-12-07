import request from "@/utils/request";

import axios from "axios";

export function userdashboard() {
  return request({
    url: "/user/dashboard",
    method: "get",
  });
}

export function bookingdashboard() {
  return request({
    url: "/booking/dashboard",
    method: "get",
  });
}

export function createUser() {
  return request({
    url: "/data/create_user",
    method: "get",
  });
}
export function createVSched() {
  return request({
    url: "/data/createVSched",
    method: "get",
  });
}

export function permissionlist() {
  return request({
    url: "/data/permissionlist",
    method: "get",
  });
}

export function roleslist() {
  return request({
    url: "/data/roleslist",
    method: "get",
  });
}

export function generate_report(data) {
  return request({
    url: "/user/generatereport",
    method: "get",
    data: data,
  });
}

export function uploadexcel(data) {
  return request({
    url: "/setting/userupload",
    method: "post",
    data: data,
  });
}

export function changePass(data) {
  return request({
    url: "/setting/changepassword",
    method: "post",
    data: data,
  });
}

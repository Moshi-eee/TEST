import request from "@/utils/api_v2";

export function create_user() {
  return request({
    url: "/data/create_user",
    method: "get",
  });
}
export function department() {
  return request({
    url: "/data/department",
    method: "get",
  });
}
export function position() {
  return request({
    url: "/data/position",
    method: "get",
  });
}
export function business_unit() {
  return request({
    url: "/data/business_unit",
    method: "get",
  });
}
export function sub_business_units() {
  return request({
    url: "/data/sub_business_units",
    method: "get",
  });
}
export function user_list() {
  return request({
    url: "/data/user_list",
    method: "get",
  });
}

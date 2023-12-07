import request from "@/utils/request";

import axios from "axios";

export function getrating() {
  return request({
    url: "/ticketing/ratings",
    method: "get",
  });
}

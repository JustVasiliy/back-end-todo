module.exports = {
  resEnd: function (method: string) {
    let code: number;
    let objResp = { success: true };
    if (method === "PUT") {
      code = 200;
      return JSON.stringify({ status: code, result: objResp });
    } else if (method === "DELETE") {
      code = 200;
      return JSON.stringify({ status: code, result: objResp });
    } else if (method === "POST") {
      code = 201;
      return JSON.stringify({ status: code, result: objResp });
    }
  },
};

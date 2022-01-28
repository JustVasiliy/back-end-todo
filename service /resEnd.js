module.exports = {
  resEnd: function (method) {
    let code;
    let objResp = { success: true };
    if (method === "PUT") {
      code = 200;
    } else if (method === "DELETE") {
      code = 200;
    } else if (method === "POST") {
      code = 201;
    }
    return JSON.stringify({ status: code, result: objResp });
  },
};

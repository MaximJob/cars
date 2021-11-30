import Vue from "vue";

export async function postData(url, body = {}) {
  let response = {};
  await Vue.http
    .post(url, { ...body })
    .then((response) => response.json())
    .then((data) => {
      response = data.content;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}

export async function getData(url, params = {}) {
  let response = { models: [], brands: [], cars: [] };
  await Vue.http
    .get(url, { params })
    .then((response) => response.json())
    .then((data) => {
      response = data.content;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}

export function refactorTokens(content) {
  return {
    access_token: "Bearer " + content.tokens.access_token,
    refresh_token: content.tokens.refresh_token,
    id: content.user.id,
  };
}

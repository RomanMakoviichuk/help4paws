// fetchFacebookPosts.js
export const fetchFacebookPosts = (accessToken, limit = 3) => {
  return fetch(
    `https://graph.facebook.com/v21.0/me/posts?fields=id,message,created_time,attachments{subattachments}&limit=${limit}&access_token=${accessToken}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data && data.data) {
        localStorage.setItem("posts", JSON.stringify(data.data));
        localStorage.setItem("lastFetched", Date.now());
        return data.data;
      } else {
        throw new Error("No data available");
      }
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      throw err;
    });
};

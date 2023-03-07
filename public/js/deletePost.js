const formHandler = async (event) => {
  event.preventDefault();

  const postID = document.querySelector("#labelPostID").textContent.trim();

  if (postID) {
    const response = await fetch(`/api/posts/${postID}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Did not delete post.");
    }
  }
};

document
  .querySelector("#deletePostForm")
  .addEventListener("submit", formHandler);

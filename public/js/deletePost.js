const formHandler = async (event) => {
  event.preventDefault();

  const postId = document.querySelector("#labelPostId").textContent.trim();

  if (postId) {
    const response = await fetch(`/api/posts/${postId}`, {
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

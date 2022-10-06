const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#textContent").value;
  const postId = document.querySelector("#postIdNumber").value;

  if (content) {
    const response = await fetch(`/api/comments/`, {
      method: "POST",
      body: JSON.stringify({
        content,
        postId,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert("Did not create a new comment.");
    }
  }
};

document
  .querySelector("#createCommentForm")
  .addEventListener("submit", commentFormHandler);

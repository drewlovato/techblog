const formHandler = async (event) => {
  event.preventDefault();

  const postId = document.querySelector("#labelPostId").textContent.trim();
  const title = document.querySelector("#textTitle").value.trim();
  const content = document.querySelector("#textContent").value.trim();
  const dateCreated = document.querySelector("#textDateCreated").value.trim();

  if (postId && title && content && dateCreated) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        dateCreated,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Did not update post.");
    }
  }
};

document.querySelector("#editPostForm").addEventListener("submit", formHandler);

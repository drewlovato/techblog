const formHandler = async (event) => {
  event.preventDefault();

  const postId = document.querySelector("#labelPostId").textContent.trim();
  const title = document.querySelector("#textTitle").value.trim();
  const content = document.querySelector("#textContent").value.trim();

  if (postId && title && content) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
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

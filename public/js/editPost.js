const formHandler = async (event) => {
  event.preventDefault();

  const postID = document.querySelector("#labelPostID").textContent.trim();
  const title = document.querySelector("#textTitle").value.trim();
  const content = document.querySelector("#textContent").value.trim();
  const dateCreated = document.querySelector("#textDateCreated");

  if (postID && title && content && dateCreated) {
    const response = await fetch(`/api/posts/${postID}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
        dateCreated,
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

const postFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#textTitle").value.trim;
  const content = document.querySelector("#textContent").value.trim;

  if (title && content) {
    const response = await fetch(`api/posts/`, {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Did not create Post.");
    }
  }
};

document
  .querySelector("#createPostForm")
  .addEventListener("submit", postFormHandler);

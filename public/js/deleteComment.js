const formHandler = async (event) => {
  event.preventdDefault();

  const commentID = document.querySelector("labelCommentID").textContent.trim();
  const postID = document.querySelector("hiddenPostID").value.trim();

  if (commentID && postID) {
    // delete a comment function
    const response = await fetch(`/api/comments/${commentID}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace(`/editPost/${postID}`);
    } else {
      alert("Failed to delete the comment.");
    }
  }
};

document
  .querySelector("#deleteCommentForm")
  .addEventListener("submit", formHandler);

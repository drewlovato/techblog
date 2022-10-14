const formHandler = async (event) => {
  event.preventDefault();

  const presentPassword = document.querySelector("#textPresentPassword").value.trim;
  const newPassword = document.querySelector("#textNewPassword").value.trim;
  const confirmPassword = document.querySelector("#textConfirmPassword").value.trim;

  if (newPassword === confirmPassword) {
    const response = await fetch(`/api/users/password/`, {
      method: "PUT",
      body: JSON.stringify({ presentPassword, newPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Password changed");
      document.location.replace("/dashboard");
    } else {
      alert("Password was not changed.");
    }
  }
};

document
  .querySelector("#changePasswordForm")
  .addEventListener("submit", formHandler);

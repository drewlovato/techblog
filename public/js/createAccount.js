const loginFormHandler = async (event) => {
  event.preventDefault();

  const userName = document.querySelector("#textUserName").value;
  const email = document.querySelector("textEmail").value;
  const password = document.querySelector("#textPassword").value.trim;

  if (userName && email && password) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({ name: userName, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Did not create a user.");
    }
  }
};

document
  .querySelector("#createAccountForm")
  .addEventListener("submit", loginFormHandler);

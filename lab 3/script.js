
// script.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("githubForm");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    resultDiv.innerHTML = ""; // Clear previous results
    const username = document.getElementById("username").value;
    const apiUrl = `https://api.github.com/users/${username}`;

    try {
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        displayUserDetails(data);
      } else {
        displayErrorMessage("User not found.");
      }
    } catch (error) {
      displayErrorMessage("An error occurred while fetching data.");
    }
  });

  function displayUserDetails(user) {
    const userDetails = `
      <div class="card">
        <div class="card-body text-center">
          <img src="${user.avatar_url}" alt="${user.login}" class="img-fluid rounded-circle mb-3" width="100">
          <h2 class="card-title">${user.login}</h2>
          <p class="card-text"><strong>Name:</strong> ${user.name || "N/A"}</p>
          <p class="card-text"><strong>Location:</strong> ${user.location || "N/A"}</p>
          <p class="card-text"><strong>Followers:</strong> ${user.followers}</p>
          <p class="card-text"><strong>Following:</strong> ${user.following}</p>
          <p class="card-text"><strong>Public Repos:</strong> ${user.public_repos}</p>
        </div>
      </div>
    `;
    resultDiv.innerHTML = userDetails;
  }

  function displayErrorMessage(message) {
    resultDiv.innerHTML = `
      <div class="alert alert-danger mt-3">
        ${message}
      </div>
    `;
  }
});

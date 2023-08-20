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
      resultDiv.innerHTML = "User not found.";
    }
  } catch (error) {
    resultDiv.innerHTML = "An error occurred while fetching data.";
  }
});

function displayUserDetails(user) {
  const userDetails = `
    <h2>${user.login}</h2>
    <img src="${user.avatar_url}" alt="${user.login}" width="100">
    <p>Name: ${user.name || "N/A"}</p>
    <p>Location: ${user.location || "N/A"}</p>
    <p>Followers: ${user.followers}</p>
    <p>Following: ${user.following}</p>
    <p>Public Repos: ${user.public_repos}</p>
  `;
  resultDiv.innerHTML = userDetails;
}

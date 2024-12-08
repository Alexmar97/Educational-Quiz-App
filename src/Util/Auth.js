export function getTokenDuration() {
  const storedExpiration = localStorage.getItem("expiration");

  if (!storedExpiration) return -1; // Return -1 if no expiration is stored

  const expirationDate = new Date(storedExpiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function getToken() {
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!token) return null;

  if (tokenDuration < 0) return "EXPIRED";

  return token;
}

export function isAuthenticated() {
  const token = getToken();
  console.log("Token in isAuthenticated:", token); // Debugging log
  return token && token !== "EXPIRED";
}

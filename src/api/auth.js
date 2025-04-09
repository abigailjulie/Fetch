const BASE_URL = "https://frontend-take-home-service.fetch.com";

export const login = async (name, email, setAuthUser, setIsLoggedIn) => {
  const body = {
    name: name,
    email: email,
  };

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      setAuthUser(result.user);
      setIsLoggedIn(true);
      return { success: true, message: result.message || "Welcome!" };
    } else {
      const resultText = await response.text();
      setAuthUser({ name, email });
      setIsLoggedIn(true);
      return { success: true, message: resultText || "Welcome!" };
    }
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const logout = async (setAuthUser, setIsLoggedIn) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    let message = "Goodbye!";
    try {
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        message = result.message || "Goodbye!";
      }
    } catch (e) {
      console.log(e);
    }

    setAuthUser(null);
    setIsLoggedIn(false);
    return { success: true, message };
  } catch (error) {
    console.error("Error during logout:", error.message);
    return { success: false, message: `Error: ${error.message}` };
  }
};

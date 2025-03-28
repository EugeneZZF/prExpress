import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// import { jwtDecode } from "jwt-decode";
// const URL = "https://prexpress.io";
export const URL = "http://localhost:8000/api/v1";
// export const URL = "https://web:8000/api/v1";

export function getDecode() {
  const accessToken = Cookies.get("token");
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    // console.log(decoded, "decoccccc");
    // console.log(decoded);
    return decoded;
  } else {
    console.error("Токен отсутствует.");
  }
}

export async function getUserInfo(accesstoken, name, phone, email, password) {
  console.log(accesstoken);
  const accessToken = Cookies.get("token");

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };

    const response = await axios.post(
      `${URL}/Client/UpdateProfile`,
      { name, phone, email, password },
      config
    );

    console.log("Server Response:", response.data);

    if (response.data.status) {
      console.log("Profile updated successfully!");
    }
  } catch (error) {
    console.error("Registration Error:", error);
  }
}

export async function getUser(userId) {
  const accessToken = Cookies.get("token");

  if (!accessToken) {
    console.error("No access token found!");
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(`${URL}/users/${userId}`, config);

    console.log("User Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Fetching Users Error:", error);
  }
}

export async function getUsers(
  page = 1,
  size = 10,
  search = "",
  min_balance,
  max_balance,
  sort_by = "balance",
  sort_order = "desc",
  role
) {
  const accessToken = Cookies.get("token");

  if (!accessToken) {
    console.error("No access token found!");
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page,
        size,
        search,
        min_balance,
        max_balance,
        sort_by,
        sort_order,
        role,
      },
    };

    const response = await axios.get(`${URL}/users/`, config);

    console.log("Server Respdsaonse:", response.data.items);
    return response.data.items;
  } catch (error) {
    console.error("Fetching Users Error:", error);
  }
}

export async function deleteUser(user_id) {
  const accessToken = Cookies.get("token");

  if (!accessToken) {
    console.error("No access token found!");
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.delete(`${URL}/users/${user_id}`, config);
    console.log("User deleted successfully!", response);
    return response.status;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

export async function updateProfile(name, phone_number, role, user_id) {
  const accessTokens = Cookies.get("token");
  try {
    const config = {
      headers: { Authorization: `Bearer ${accessTokens}` },
    };
    const response = await axios.put(
      `${URL}/users/${user_id}`,
      {
        name: name,
        phone_number: phone_number,
        role: role,
      },
      config
    );
    console.log("Profile successfully updated!", response);
  } catch (error) {
    console.error("Update Profile Error:", error);
  }
}

export async function getAmount() {
  const accessToken = Cookies.get("token");

  if (!accessToken) {
    console.error("No access token found.");
    return;
  }

  try {
    const response = await axios.get(`${URL}/users/amount/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Server Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user amount:", error);
  }
}

export async function searchResources(
  searchQuery,
  page = 1,
  size = 10,
  sort_order = "desc"
) {
  const accesstoken = Cookies.get("token");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };

    const params = {
      page,
      size,
      sort_order,
      search: searchQuery,
    };

    const response = await axios.get(`${URL}/resources/`, {
      params,
      ...config,
    });

    console.log("Search Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error searching resources:", error);
  }
}

export async function notificationsSend(title, text, checkboxes) {
  const accesstoken = Cookies.get("token");
  if (!accesstoken) {
    console.error("Error: No access token found.");
    return null;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        "Content-Type": "application/json",
      },
    };

    const payload = {
      options: checkboxes,
      name: title.trim(),
      description: text.trim(),
    };

    const response = await axios.post(
      `${URL}/notifications/broadcast`,
      payload,
      config
    );

    console.log("Notification sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error sending notification:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
}

export async function getPost(postId) {
  const accessToken = Cookies.get("token");

  if (!accessToken) {
    console.error("No access token found!");
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(`${URL}/posts/${postId}`, config);

    console.log("Post data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Fetching Users Error:", error);
  }
}

export async function getPosts(
  page = 1,
  size = 10,
  search = "",
  user_id,
  status,
  sort_by = "date",
  sort_order = "desc"
) {
  const accessToken = Cookies.get("token");

  if (!accessToken) {
    console.error("No access token found!");
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page,
        size,
        search,
        user_id,
        status,
        sort_by,
        sort_order,
      },
    };

    const response = await axios.get(`${URL}/posts/`, config);

    console.log("Server Response:", response.data.items);
    return response.data.items;
  } catch (error) {
    console.error("Fetching Posts Error:", error);
  }
}

export async function publishPost(post_id) {
  const accessToken = Cookies.get("token");

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.post(
      `${URL}/posts/${post_id}/publish`,

      config
    );

    console.log("Server Response:", response.data);

    if (response.data.status) {
      console.log("post published! ");
    }
  } catch (error) {
    console.error("Registration Error:", error);
  }
}

export async function updatePost(
  description,
  image,
  name,
  status,
  author,
  hashtags,
  note
) {
  const accessTokens = Cookies.get("token");
  const user_id = getDecode().id;
  try {
    const config = {
      headers: { Authorization: `Bearer ${accessTokens}` },
    };
    const response = await axios.put(
      `${URL}/users/${user_id}`,
      {
        description: description,
        name: name,
        image: image,
        status: status,
        author: author,
        user_id: user_id,
        hashtags: hashtags,
        note: note,
      },
      config
    );
    console.log("Post successfully updated!", response.status);
    return response.status;
  } catch (error) {
    console.error("Update Profile Error:", error);
  }
}

export async function getImage(filename) {
  const accessToken = Cookies.get("token");

  if (!accessToken) {
    console.error("No access token found!");
    return null;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: "blob", // Указываем, что ожидаем бинарные данные
    };

    const response = await axios.get(`${URL}/image/${filename}`, config);

    const imageUrl = window.URL.createObjectURL(response.data); // Получаем URL из blob
    return imageUrl;
  } catch (error) {
    console.error("Fetching Image Error:", error);
    return null;
  }
}

export async function statsUsers() {
  const accessToken = Cookies.get("token");

  if (!accessToken) {
    console.error("No access token found!");
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      // params: {
      // },
    };

    const response = await axios.get(`${URL}/statistics/users`, config);

    console.log("Server Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Fetching Posts Error:", error);
  }
}

export async function financialsUser(user_id) {
  const accessToken = Cookies.get("token");

  if (!accessToken) {
    console.error("No access token found!");
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      // params: {
      // },
    };

    const response = await axios.get(
      `${URL}/statistics/financials/${user_id}`,
      config
    );

    console.log("Server Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Fetching Posts Error:", error);
  }
}

export async function statsUser(user_id) {
  const accessToken = Cookies.get("token");

  if (!accessToken) {
    console.error("No access token found!");
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      // params: {
      // },
    };

    const response = await axios.get(
      `${URL}/statistics/posts_resources/${user_id}`,
      config
    );

    console.log("Server Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Fetching Posts Error:", error);
  }
}

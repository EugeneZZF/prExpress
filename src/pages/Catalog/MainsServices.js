import axios from "axios";
import { getDecode } from "../../components/services";
import Cookies from "js-cookie";

const accesstoken = Cookies.get("token");
const URL = "https://prexpress.io";
// const URL = "http://localhost:8000";

export function handleCreateId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

export async function getWallets(
  page = 1,
  size = 10,
  search = "",
  sort_by = "name",
  sort_order = "asc"
) {
  const user_id = getDecode().id;
  console.log("userinfo: ", user_id);

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };

    const params = {
      page,
      size,
      search,
      sort_by,
      sort_order,
      user_id,
    };

    const response = await axios.get(`${URL}/wallets/`, {
      params,
      ...config,
    });

    console.log("Server Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching wallets:", error);
    throw error;
  }
}

export async function getResurceUser(page = 1, size = 10, sort_order = "desc") {
  const user_id = getDecode().id;
  console.log("userinfo: ", user_id);

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
      user_id,
    };

    const response = await axios.get(`${URL}/resources/`, {
      params,
      ...config,
    });

    console.log("Server Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching wallets:", error);
    // throw error;
  }
}

export async function getResourceInfo(resourceId) {
  const accesstoken = Cookies.get("token");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };

    const response = await axios.get(`${URL}/resources/${resourceId}`, config);

    console.log("Server Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching resource:", error);
    throw error;
  }
}
export async function getAllResurce(page = 1, size = 10, sort_order = "desc") {
  // const user_id = getDecode().id;
  // console.log("userinfo: ", user_id);

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
      // user_id,
    };

    const response = await axios.get(`${URL}/resources/`, {
      params,
      ...config,
    });

    console.log("Server Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching wallets:", error);
    // throw error;
  }
}

export async function deleteResource(resource_id) {
  const accessToken = Cookies.get("token");

  if (!accessToken) {
    console.error("Access token is missing.");
    return null;
  }

  try {
    const response = await axios.delete(`${URL}/resources/${resource_id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Resource deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `Error deleting resource: ${error.response.status} - ${error.response.data}`
      );
    } else if (error.request) {
      console.error("Error deleting resource: No response from server.");
    } else {
      console.error("Error deleting resource:", error.message);
    }

    return null;
  }
}

export async function verifyResource(resource_id) {
  const accessToken = Cookies.get("token");

  if (!accessToken) {
    console.error("Access token is missing.");
    return null;
  }

  try {
    const response = await axios.post(
      `${URL}/resources/${resource_id}/verify`,
      {}, // Передаём пустой объект в тело запроса
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Resource verified successfully:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `Error verifying resource: ${error.response.status} - ${error.response.data}`
      );
    } else if (error.request) {
      console.error("Error verifying resource: No response from server.");
    } else {
      console.error("Error verifying resource:", error.message);
    }

    return null;
  }
}

import axios from "axios";

const handleResponseError = (error: any) => {
  if (error?.response?.data?.error) {
    throw error.response.data.error;
  }
  throw error;
};

export const requestAddProduct = async (
  name: string,
  quality: string,
  price: number,
  owner: string,
  accessToken: string
): Promise<boolean> => {
  console.log(owner);
  const response: boolean = await axios
    .post(
      "http://localhost:4000/products/add",
      {
        name,
        quality,
        price,
        owner,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => handleResponseError(error));

  return response;
};

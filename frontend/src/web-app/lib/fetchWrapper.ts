import { auth } from "@/auth";

const baseUrl = "http://localhost:6001";

/**
 * Makes an asynchronous HTTP GET request to the provided URL.
 *
 * @param {string} url - The relative URL to which the GET request should be sent.
 * @returns {Promise<any>} A promise that resolves with the response data after it is processed.
 * @throws {Error} If the fetch operation or response handling fails.
 */
const get = async (url: string) => {
  const requestOptions = {
    method: "GET",
    headers: await getHeaders(),
  };

  const response = await fetch(baseUrl + url, requestOptions);

  return handleResponse(response);
};

/**
 * Sends an HTTP PUT request to the specified URL with the provided request body.
 *
 * @param {string} url - The endpoint relative to the base URL to which the PUT request is sent.
 * @param {unknown} body - The payload to be sent in the body of the PUT request.
 * @returns {Promise<any>} A promise that resolves with the response after the request is processed.
 * @throws {Error} If the request fails or the response cannot be handled properly.
 */
const put = async (url: string, body: unknown) => {
  const requestOptions = {
    method: "PUT",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };

  const response = await fetch(baseUrl + url, requestOptions);

  return handleResponse(response);
};

/**
 * Sends an HTTP POST request to the specified URL with the provided request body.
 *
 * @param {string} url - The relative URL to which the POST request is sent.
 * @param {unknown} body - The data to be included in the body of the POST request.
 * @returns {Promise<unknown>} A promise that resolves to the response from the server.
 *
 * The headers for the request are dynamically retrieved using the `getHeaders` function,
 * and the response is processed using the `handleResponse` function.
 */
const post = async (url: string, body: unknown) => {
  const requestOptions = {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };

  const response = await fetch(baseUrl + url, requestOptions);

  return handleResponse(response);
};

/**
 * Sends an HTTP DELETE request to the specified URL.
 *
 * This function is an asynchronous operation that constructs a DELETE request
 * with appropriate headers and sends it to the given URL. The function handles
 * the response by delegating its processing to the `handleResponse` function.
 *
 * @param {string} url - The endpoint to which the DELETE request should be sent. The URL path will be appended to a predefined base URL.
 * @returns {Promise<any>} A promise resolving to the response of the DELETE request, processed by the `handleResponse` function.
 * @throws Will throw an error if the fetch operation fails or if the response indicates an error.
 */
const del = async (url: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: await getHeaders(),
  };

  const response = await fetch(baseUrl + url, requestOptions);

  return handleResponse(response);
};

const handleResponse = async (response: Response) => {
  const text = await response.text();

  const data = text && JSON.parse(text);

  if (response.ok) {
    return data || response.statusText;
  } else {
    const error = {
      status: response.status,
      message: response.statusText,
    };
    return { error };
  }
};

/**
 * Asynchronously retrieves and constructs HTTP headers.
 *
 * This function generates an instance of the `Headers` object,
 * setting the "Content-Type" header to "application/json". If
 * a user session is available, it includes an "Authorization"
 * header with a Bearer token.
 *
 * @returns {Promise<Headers>} A promise resolving to an object representing HTTP headers.
 */
const getHeaders = async (): Promise<Headers> => {
  const session = await auth();
  const headers = new Headers();

  headers.set("Content-Type", "application/json");
  if (session) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }

  return headers;
};

/**
 * An object that provides methods for making HTTP requests.
 *
 * The `fetchWrapper` object offers convenient wrapper methods for common
 * HTTP request operations, including GET, PUT, POST, and DELETE.
 *
 * Methods:
 * - `get`: Sends an HTTP GET request to fetch data from a specified resource.
 * - `put`: Sends an HTTP PUT request to update data at a specified resource.
 * - `post`: Sends an HTTP POST request to create new data at a specified resource.
 * - `del`: Sends an HTTP DELETE request to remove data at a specified resource.
 */
export const fetchWrapper = { get, put, post, del };

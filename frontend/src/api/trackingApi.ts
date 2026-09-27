const BASE_URL = "http://localhost:8080/tracking";

export interface TrackingNumber {
  trackingNumber: string;
  sentFrom: string;
  sentTo: string;
  currentLocation: string;
  currentStatus: string;
}

export interface TrackingUpdate {
  currentLocation: string;
  currentStatus: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
}

export function getAllTrackingNumbers(): Promise<TrackingNumber[]> {
  return fetch(`${BASE_URL}/`).then((res) => handleResponse<TrackingNumber[]>(res));
}

export function getTrackingNumber(trackingNumber: string): Promise<TrackingNumber> {
  return fetch(`${BASE_URL}/${trackingNumber}`).then((res) =>
    handleResponse<TrackingNumber>(res)
  );
}

export function createTrackingNumber(data: TrackingNumber): Promise<TrackingNumber> {
  return fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => handleResponse<TrackingNumber>(res));
}

export function updateTrackingNumber(
  trackingNumber: string,
  data: TrackingUpdate
): Promise<TrackingNumber> {
  return fetch(`${BASE_URL}/${trackingNumber}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => handleResponse<TrackingNumber>(res));
}

export function deleteTrackingNumber(trackingNumber: string): Promise<void> {
  return fetch(`${BASE_URL}/${trackingNumber}`, {
    method: "DELETE",
  }).then((res) => handleResponse<void>(res));
}

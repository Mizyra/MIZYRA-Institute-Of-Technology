const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type LoginPayload = {
  email: string;
  password: string;
};

export async function loginStudent(payload: LoginPayload) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}

export async function submitApplication(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Failed to submit application");
  }

  return response.json();
}

export async function fetchCapabilityInsights() {
  return [];
}

export async function fetchCapabilityMap() {
  return [];
}

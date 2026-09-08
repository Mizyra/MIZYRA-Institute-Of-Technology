export type ApplicationPayload = {
  full_name: string;
  organization?: string;
  project_type?: string;
  email: string;
  phone?: string;
  notes?: string;
};

export async function submitApplication(payload: ApplicationPayload) {
  const response = await fetch("/api/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Failed to submit application");
  }

  return response.json();
}

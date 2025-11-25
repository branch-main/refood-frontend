import { AxiosError } from "axios";

export interface FormErrors {
  [key: string]: string;
}

interface ApiErrorResponse {
  [key: string]: string[] | string;
}

/**
 * Parses API error responses into a flat object of field errors
 * Handles Django REST Framework error format:
 * - Field errors: { "field_name": ["error1", "error2"] }
 * - Non-field errors: { "detail": "error message" } or { "non_field_errors": ["error"] }
 */
export function parseApiErrors(error: unknown): FormErrors {
  const errors: FormErrors = {};

  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data as ApiErrorResponse;

    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        errors[key] = value[0];
      } else if (typeof value === "string") {
        errors[key] = value;
      }
    }
  }

  return errors;
}

/**
 * Gets a general error message from API error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data;
    
    if (typeof data === "string") return data;
    if (data.detail) return data.detail;
    if (data.non_field_errors?.[0]) return data.non_field_errors[0];
    if (data.message) return data.message;
    
    // Return first field error if no general message
    const firstKey = Object.keys(data)[0];
    if (firstKey) {
      const value = data[firstKey];
      return Array.isArray(value) ? value[0] : value;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error inesperado";
}

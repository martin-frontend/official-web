import { getAuthToken } from '@/core/services/localStorage/authToken';

export default function checkAuthToken(): boolean {
  return !!getAuthToken();
}

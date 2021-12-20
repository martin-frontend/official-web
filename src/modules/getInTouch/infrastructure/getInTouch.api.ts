import { GetInTouch } from '../domain/getInTouch.model';
import { fetchPost } from '@/core/services/api/apiBase';

export function sendGetInTouch(getInTouch: GetInTouch): Promise<void> {
  return fetchPost('/official/v1/get-in-touch', getInTouch);
}

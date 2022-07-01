import { fetchPut } from '@/core/services/api/apiBase';

export interface NewnameDto {
  firstname: 'string';
  lastname: 'string';
}

export async function updateUserName(newname: NewnameDto) {
  console.log(newname);
  const result = await fetchPut<string>('/official/v1/player/name', newname);
  return result;
}

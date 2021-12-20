import { receiveApiBonus } from '../infrastructure/api/userEventApi';

export default async function receiveBonus(id: number): Promise<void> {
  await receiveApiBonus(id);
}

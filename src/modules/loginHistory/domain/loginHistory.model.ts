export interface LoginHistory {
  agent: string;
  country: string;
  device: string;
  ip: string;
  os: string;
  success: boolean;
  time: number;
  visitorId: string;
  day: string;
}

export interface GetLoginHistoryDto {
  startTime: Date;
  endTime: Date;
}

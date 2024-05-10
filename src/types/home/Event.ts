export type EventPublisher = {
  username: string;
  indicator: string;
  avatar: string;
};

export type EventLocation = {
  type: string;
  name: string;
};

export type Event = {
  publisher: EventPublisher;
  title: string;
  content: string;
  participantsCount: number;
  location: EventLocation;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
};

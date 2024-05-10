import { Event } from "./types/home/Event";

export const mockEvents: Event[] = [
  {
    publisher: {
      username: "user1",
      indicator: "New member",
      avatar: "https://example.com/avatar1.jpg",
    },
    title: "Event 1",
    content:
      "This is the first event. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores dicta porro neque necessitatibus voluptatum, fuga corrupti eaque. Velit, voluptatibus. Sunt odit veniam quisquam vero? Distinctio non voluptatum ipsa dolorum sed. Porro qui at quae at sunt nemo et rem quia. Illo porro et qui. Culpa ab et sit delectus eius maiores veritatis. Reprehenderit magni repellendus in et dolore odit enim. Quasi debitis voluptates sit cupiditate a. Sequi deleniti eveniet labore neque. In occaecati ex expedita eaque minima. Odit et porro magni dolor.",
    participantsCount: 100,
    location: {
      type: "venue",
      name: "Location 1",
    },
    startAt: new Date("2024-06-01T10:00:00Z"),
    endAt: new Date("2024-06-01T14:00:00Z"),
    createdAt: new Date("2024-05-01T08:00:00Z"),
  },
  {
    publisher: {
      username: "user2",
      indicator: "Moderator",
      avatar: "https://example.com/avatar2.jpg",
    },
    title: "Event 2",
    content:
      "This is the second event. Alias accusamus sit accusantium quos modi odit et. Cumque consequatur magni et saepe. Aut blanditiis distinctio architecto quam distinctio ut excepturi rerum excepturi. Et rem qui. Error sunt vel id perspiciatis atque fuga. Et occaecati accusantium nihil blanditiis omnis consequatur.",
    participantsCount: 200,
    location: {
      type: "online",
      name: "Zoom",
    },
    startAt: new Date("2024-07-01T12:00:00Z"),
    endAt: new Date("2024-07-01T16:00:00Z"),
    createdAt: new Date("2024-05-02T09:00:00Z"),
  },
  {
    publisher: {
      username: "user3",
      indicator: "Manager",
      avatar: "https://example.com/avatar3.jpg",
    },
    title: "Event 3",
    content: "This is the third event.",
    participantsCount: 150,
    location: {
      type: "outdoor",
      name: "Park",
    },
    startAt: new Date("2024-08-01T14:00:00Z"),
    endAt: new Date("2024-08-01T18:00:00Z"),
    createdAt: new Date("2024-05-09T10:00:00Z"),
  },
];

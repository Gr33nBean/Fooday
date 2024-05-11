import dayjs from "dayjs";
import { mockBlogImage, mockUserAvatar } from "./assets/images/home";
import { Event } from "./types/home/Event";

export const mockBlogs = [
  {
    id: "f6036372-dd97-439b-9301-0651b1bd6c38",
    publisher: {
      userName: "Orin.Renner",
      avatar: mockUserAvatar,
    },
    images: [mockBlogImage, mockBlogImage, mockBlogImage],
    title: "Dynamic Tactics Planner",
    content:
      "Provident voluptatem quidem dolor rerum vitae saepe. Magni nihil illo qui molestias ut iusto. Id cum corporis saepe minus et et totam aut.",
    comment: 72,
    like: 120,
    createdAt: dayjs(
      "Mon Oct 16 2023 10:33:46 GMT+0700 (Indochina Time)"
    ).format("MMM D, YYYY"),
  },
  {
    id: "a43c93a4-7ede-4ed1-93bc-b10334ea0a19",
    publisher: {
      userName: "Bennett4",
      avatar: mockUserAvatar,
    },
    title: "Corporate Usability Associate",
    content:
      "Temporibus velit molestias qui perspiciatis officia. Similique repellendus sequi similique qui error quo. Accusamus iste in. Aut dolor est excepturi voluptatum.",
    images: [mockBlogImage, mockBlogImage, mockBlogImage],
    comment: 12,
    like: 100,
    createdAt: dayjs(
      "Mon Apr 08 2024 14:49:26 GMT+0700 (Indochina Time)"
    ).format("MMM D, YYYY"),
  },
  {
    id: "154e0f39-8cf1-4dec-8c3d-9e3aed9953c3",
    publisher: {
      userName: "Dillon_Rippin",
      avatar: mockUserAvatar,
    },
    title: "Human Creative Analyst",
    content:
      "Doloremque earum tenetur mollitia nesciunt. Sequi quam quo consequatur provident nostrum fuga. Corporis dolores recusandae adipisci quia ex voluptatem ratione aut cupiditate. Molestiae non et quam corporis dolor doloremque. Odio ex nulla et tenetur sit.",
    images: [mockBlogImage, mockBlogImage, mockBlogImage],
    comment: 12,
    like: 100,
    createdAt: dayjs(
      "Sun Sep 17 2023 23:04:19 GMT+0700 (Indochina Time)"
    ).format("MMM D, YYYY"),
  },
];

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

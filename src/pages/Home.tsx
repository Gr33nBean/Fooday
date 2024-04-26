import dayjs, { Dayjs } from "dayjs";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { BlogCarousel } from "@/components/UI/Home/Blog/BlogCarousel";
import { BlogDiet } from "@/components/UI/Home/Blog/BlogDiet";
import BlogItem from "@/components/UI/Home/Blog/BlogItem";
import { BlogLeftColumn } from "@/components/UI/Home/Blog/BlogLeftColumn";
import { BlogMetaBar } from "@/components/UI/Home/Blog/BlogMetaBar";
import { Link } from "react-router-dom";
import mockBlogImage from "../assets/mock-blog-image.jpeg";
import mockUserAvatar from "../assets/mock-user-avatar.png";

export const mockBlogs = [
  {
    blog: {
      id: "1234",
      avatar: mockUserAvatar,
      userName: "<NAME>",
      comment: 12,
      like: 100,
      cloned: 2,
      createdAt: dayjs(Date.now()).format("MMM D, YYYY"),
    },
    carousel: {
      images: [mockUserAvatar, mockBlogImage, mockBlogImage],
    },
    diet: {
      planLength: 30,
      mealsPerDay: 3,
      caloriesPerDay: 1200,
    },
  },
  {
    blog: {
      id: "12345",
      avatar: mockUserAvatar,
      userName: "A famous one",
      comment: 150,
      like: 3000,
      cloned: 64,
      createdAt: dayjs(Date.now()).format("MMM D, YYYY"),
    },
    carousel: {
      images: [mockUserAvatar, mockBlogImage, mockBlogImage],
    },
    diet: {
      planLength: 15,
      mealsPerDay: 2,
      caloriesPerDay: 1000,
    },
  },
  {
    blog: {
      id: "12u62",
      avatar: mockUserAvatar,
      userName: "ANother one",
      comment: 52,
      like: 1923,
      cloned: 12,
      createdAt: dayjs(Date.now()).format("MMM D, YYYY"),
    },
    carousel: {
      images: [mockUserAvatar, mockBlogImage, mockBlogImage],
    },
    diet: {
      planLength: 15,
      mealsPerDay: 2,
      caloriesPerDay: 1000,
    },
  },
];

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="">Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div>
          {mockBlogs.map(({ blog, carousel, diet }) => (
            <Link key={blog.id} to={`/blog/${blog.id}`}>
              <BlogItem
                blog={blog}
                leftColumn={<BlogLeftColumn avatar={blog.avatar} />}
                metaBar={
                  <BlogMetaBar
                    username={blog.userName}
                    createdAt={blog.createdAt}
                  />
                }
                carousel={<BlogCarousel images={carousel.images} />}
                diet={<BlogDiet {...diet} />}
              />
            </Link>
          ))}
        </div>

        <div className="mt-4"></div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

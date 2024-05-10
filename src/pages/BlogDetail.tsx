import { BlogCarousel } from "@/components/UI/Home/Blog/BlogCarousel";
import BlogItem from "@/components/UI/Home/Blog/BlogItem";
import { BlogMetaBar } from "@/components/UI/Home/Blog/BlogMetaBar";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBackOutline, heartOutline } from "ionicons/icons";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { mockBlogs } from "./Home";

const BlogDetail = () => {
  const match = useRouteMatch<{ id: string }>("/blog/:id");
  const foundBlog = mockBlogs.find((b) => b.blog.id === match?.params.id);

  if (!foundBlog) {
    return <p>Blog not found</p>;
  }

  const { blog, carousel, diet } = foundBlog;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <Link to="/home">
              <IonButton color={"dark"}>
                <div className="flex items-center gap-2">
                  <IonIcon icon={chevronBackOutline} />
                  Quay lại
                </div>
              </IonButton>
            </Link>
          </IonButtons>
          <IonTitle>Fooday</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <BlogItem
          blog={blog}
          metaBar={
            <BlogMetaBar
              username={blog.username}
              createdAt={blog.createdAt}
              avatar={blog.avatar}
            />
          }
          carousel={<BlogCarousel images={carousel.images} />}
        />

        <div className="h-[1px] bg-gray-300"></div>

        <ul>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                <article className="flex gap-2 p-4">
                  <div>
                    <IonAvatar className="w-8 h-8">
                      <img
                        alt="User avatar's head"
                        src={blog.avatar}
                        className="w-8 aspect-square object-cover"
                      />
                    </IonAvatar>
                  </div>

                  <div className="flex-1">
                    <BlogMetaBar
                      username={blog.username}
                      createdAt={blog.createdAt}
                    />
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Atque enim sit officiis necessitatibus facere, porro amet
                      earum omnis soluta. Culpa.
                    </p>
                    <img
                      src="https://images.pexels.com/photos/17714796/pexels-photo-17714796/free-photo-of-a-woman-with-long-hair-holding-a-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Image of a flower"
                      className="rounded-lg aspect-[5/2]"
                    />
                    <div>
                      <IonButton fill="clear">
                        <IonIcon icon={heartOutline} />
                      </IonButton>
                    </div>
                  </div>
                </article>
              </li>
            ))}
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default BlogDetail;

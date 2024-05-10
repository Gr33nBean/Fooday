import { FC } from "react";

export type BlogCarouselProps = {
  images: string[];
};

export const BlogCarousel: FC<BlogCarouselProps> = ({ images }) => {
  return (
    <div className="flex justify-start items-center gap-2 overflow-auto">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="image"
          className="w-[120px] rounded-xl aspect-[3/4] object-cover"
        ></img>
      ))}
    </div>
  );
};

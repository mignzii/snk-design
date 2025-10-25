import { Instagram } from "lucide-react";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";

const instagramPosts = [
  {
    image: lookbook1,
    likes: "2.3K",
  },
  {
    image: lookbook2,
    likes: "1.8K",
  },
  {
    image: lookbook3,
    likes: "3.1K",
  },
  {
    image: lookbook1,
    likes: "2.7K",
  },
  {
    image: lookbook2,
    likes: "1.9K",
  },
  {
    image: lookbook3,
    likes: "2.5K",
  },
];

export const LookbookSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Instagram className="h-6 w-6" />
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase">
              @hautecouture
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Suivez-nous sur Instagram pour découvrir nos dernières inspirations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-secondary/5"
            >
              <img
                src={post.image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white flex items-center gap-2">
                  <Instagram className="h-5 w-5" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

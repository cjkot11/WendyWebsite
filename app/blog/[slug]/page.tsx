import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityClient } from "@/lib/sanity/client";
import { postBySlugQuery, postSlugsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { format } from "date-fns";
import { PortableText } from "@portabletext/react";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Never cache this page

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  author: string;
  publishedAt: string;
  excerpt?: string;
  mainImage?: any;
  categories?: string[];
  body?: any[];
}

interface PortableTextImage {
  _type: "image";
  asset: any;
  alt?: string;
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: PortableTextImage }) => {
      if (!value?.asset) return null;
      return (
        <div className="relative w-full h-96 my-8 overflow-hidden rounded-lg">
          <Image
            src={urlFor(value.asset).width(1200).url()}
            alt={value.alt || "Blog post image"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
};

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await sanityClient.fetch<BlogPost>(postBySlugQuery, { slug });
    return post || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityClient.fetch<{ slug: string }[]>(postSlugsQuery);
    return slugs.map((item) => ({ slug: item.slug }));
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {post.categories?.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-center gap-16 mb-4">
            <img 
              src="/images/about/logo.jpeg" 
              alt="Time2Wander Logo" 
              className="h-32 w-auto"
            />
            <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
            <img 
              src="/images/about/logo.jpeg" 
              alt="Time2Wander Logo" 
              className="h-32 w-auto"
            />
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>By {post.author}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), "MMMM d, yyyy")}
            </time>
          </div>
        </div>

        {/* Main Image */}
        {post.mainImage && (
          <div className="relative w-full h-96 md:h-[500px] mb-12 overflow-hidden rounded-lg">
            <Image
              src={urlFor(post.mainImage).width(1200).height(600).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-8 italic">{post.excerpt}</p>
        )}

        {/* Body Content */}
        {post.body && (
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}
      </article>
    </div>
  );
}

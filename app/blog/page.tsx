import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "@/lib/sanity/client";
import { postsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  author: string;
  publishedAt: string;
  excerpt?: string;
  mainImage?: any;
  categories?: string[];
}

async function getPosts(): Promise<BlogPost[]> {
  try {
    // First, let's check if we can fetch any posts at all
    const allPosts = await sanityClient.fetch(`*[_type == "post"]`);
    console.log("All posts from Sanity:", JSON.stringify(allPosts, null, 2));
    
    const posts = await sanityClient.fetch<BlogPost[]>(postsQuery);
    console.log("Filtered posts:", JSON.stringify(posts, null, 2));
    return posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Travel Blog</h1>
          <p className="text-xl text-muted-foreground">
            Travel tips, destination guides, and travel insights from Wendy.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-2">No blog posts yet.</p>
            <p className="text-sm text-muted-foreground">
              Posts will appear here once they&apos;re published in Sanity CMS.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  {post.mainImage && (
                    <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(post.publishedAt), "MMM d, yyyy")}
                      </span>
                      {post.categories && post.categories.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {post.categories[0]}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    {post.excerpt && (
                      <CardDescription className="line-clamp-3 mt-2">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">By {post.author}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
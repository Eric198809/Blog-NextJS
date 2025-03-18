import { connectToDB } from "@/lib/utils/db/connectToDB";
import Link from "next/link";

const posts = [
  {
    author: "John Doe",
    title: " 5 CSS tricks",
  },
  {
    author: "Victor Wallas",
    title: " How to code a navbar",
  },
  {
    author: "Bruce Willis",
    title: " How to setup TypeScript",
  },
];

const page = async() => {

  await connectToDB()
  return (
    <div className="u-main-container u-padding-content-container">
      <h1 className="t-main-title">Restez à jout avec My Blog</h1>
      <p className="t-main-subtitle">Tech news and useful knowledge</p>
      <p className="mr-4 text-md text-zinc-900"> Derniers articles</p>
      <ul className="u-article-grid">
        {posts.map((post, id)=>(
<li key={id} className="rounded-sm shadow-md hover:shadow-xl hover:border hover:border-zinc-300">
  <div className="pt-5 px-5 pb-7">
    <div className="flex items-baseline gapx-4 text-xs ">
      <time className="text-gray-500 text-sm" datetime={new Date(). toISOString()}>{new Date().toLocaleString("fr-FR")}</time>

<Link className="ml-auto text-base text-gray-700 hover:text-gray-600 whitespace-nowrap truncate " href={`/categories/author/${post.author}`}>
{post.author}
</Link>
    </div>
    <Link href={`/articles/${post.title}`} className="inline-block mt-6 text-xl font-semibold text-zinc-800 hover:text-zinc-500 ">{post.title}</Link>
  </div>
</li>
        ))}
      </ul>
    </div>
  );
};

export default page;

import PostCard from "@/components/PostCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";

async function page() {
  const posts = await getPosts();
  return (
    <div className={styles.container}>
      {posts?.map((post) => (
        <div className={styles.post} key={post?._id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}

export default page;

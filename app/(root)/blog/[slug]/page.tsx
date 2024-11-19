import Image from "next/image";
import styles from "./singlepost.module.css";
import { getPost } from "@/lib/data";
import PostUser from "@/components/PostUser";

async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPost(slug);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={post?.img} alt="card" fill className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        <div className={styles.detail}>
          <PostUser id={post?.userId} />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.content}>{post?.desc}</div>
      </div>
    </div>
  );
}

export default page;

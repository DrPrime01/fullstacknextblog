import Image from "next/image";
import { getUser } from "@/lib/data";
import styles from "./postuser.module.css";

async function PostUser({ id }: { id: string }) {
  const user = await getUser(id);
  return (
    <div className={styles.container}>
      <Image
        src={user?.img ? user.img : "/noavatar.png"}
        alt="card"
        width={50}
        height={50}
        className={styles.avatar}
      />
      <div className={styles.text}>
        <span className={styles.title}>Author</span>
        <span className={styles.value}>{user?.username}</span>
      </div>
    </div>
  );
}

export default PostUser;

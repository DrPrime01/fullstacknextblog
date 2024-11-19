import { Suspense } from "react";
import styles from "./admin.module.css";
import AdminPosts from "@/components/AdminPosts";
import AdminPostForm from "@/components/AdminPostForm";
import AdminUsers from "@/components/AdminUsers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminUserForm from "@/components/AdminUserForm";

async function page() {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminPostForm userId={session?.user?.id} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminUserForm />
        </div>
      </div>
    </div>
  );
}

export default page;

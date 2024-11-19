import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div>
      <h2>404 | Not Found</h2>
      <p>Sorry, the page you&apos;re looking for does not exist</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}

export default NotFound;

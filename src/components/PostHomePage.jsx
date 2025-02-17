import { useEffect, useRef, useState } from "react";
import styles from "../css/homepagepost.module.css";
import defaultPath from "../utils/paths";

export default function HomePagePost() {
  const [postsRetrieved, setPostsRetrieved] = useState(0);
  let renderingList = useRef(0);

  useEffect(() => {
    async function RetrieveAllPosts() {
      const getPostsJson = await fetch(`${defaultPath}posts/All`);
      const parsePosts = await getPostsJson.json();
      renderingList.current = parsePosts.map(createPostsComponents);
      setPostsRetrieved(1);
    }
    RetrieveAllPosts();
  }, []);

  return (
    <div className={styles.container}>
      {postsRetrieved === 0 ? (
        <p className={styles.loadingMessage}>Retrieving Posts...</p>
      ) : (
        renderingList.current
      )}
    </div>
  );
}

function createPostsComponents(objectInIndex) {
  return (
    <section key={objectInIndex._id} className={styles.post}>
      <h1 className={styles.postTitle}>{objectInIndex.title}</h1>
      <p className={styles.postContent}>{objectInIndex.content}</p>
      <h2 className={styles.postAuthor}>By: {objectInIndex.author}</h2>
    </section>
  );
}
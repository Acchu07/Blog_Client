import styles from "../css/createpost.module.css";
import defaultPath from "../utils/paths";

export default function CreateNewPost({ setDisplayView, displayView }) {
  async function createNewPost(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;

    const response = await fetch(`${defaultPath}posts/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      setDisplayView(!displayView);
      const result = await response.json();
      console.log("Post created:", result);
    } else {
      console.error("Failed to create post");
    }
  }

  return (
    <form onSubmit={createNewPost} className={styles.form}>
      <label htmlFor="title" className={styles.label}>
        Title:
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className={styles.input}
        required
      />
      <label htmlFor="content" className={styles.label}>
        Content:
      </label>
      <textarea
        id="content"
        name="content"
        className={styles.textarea}
        required
      ></textarea>
      <button type="submit" className={styles.button}>
        Create Post
      </button>
    </form>
  );
}
import { useContext, useEffect, useState } from "react";
import { UserLoggedInContext } from "../context/userLoggedInContext";
import styles from '../css/postbyself.module.css'
import defaultPath from "../utils/paths";

export default function SelfPagePost() {
  const { userLoggedIn } = useContext(UserLoggedInContext);
  const [postBySelf, setPostBySelf] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    async function RetrieveAllPosts() {
      const getPostsJson = await fetch(`${defaultPath}posts/All/${userLoggedIn.userName}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const parsePosts = await getPostsJson.json();
      setPostBySelf(parsePosts);
    }
    RetrieveAllPosts();
  }, []);

  async function deletePost(postID) {
    const response = await fetch(`${defaultPath}posts/delete/${postID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      setPostBySelf(postBySelf.filter(post => post._id !== postID));
    } else {
      console.error('Failed to delete the post');
    }
  }

  function startEditing(post) {
    setEditingPostId(post._id);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  }

  async function saveEdit(postID) {
    const response = await fetch(`${defaultPath}posts/update/${postID}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editedTitle, content: editedContent })
    });

    if (response.ok) {
      setPostBySelf(postBySelf.map(post => post._id === postID ? { ...post, title: editedTitle, content: editedContent } : post));
      setEditingPostId(null);
    } else {
      console.error('Failed to update the post');
    }
  }

  return (
    <div className={styles.container}>
      {postBySelf.map(post => (
        <section key={post._id} className={styles.post}>
          {editingPostId === post._id ? (
            <div className={styles.editForm}>
              <label className={styles.editLabel}>Title</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className={styles.editInput}
              />
              <label className={styles.editLabel}>Description</label>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className={styles.editTextarea}
              />
              <button className={styles.button} onClick={() => saveEdit(post._id)}>Save</button>
            </div>
          ) : (
            <>
              <h1 className={styles.postTitle}>{post.title}</h1>
              <p className={styles.postContent}>{post.content}</p>
              <h3 className={styles.postAuthor}>By: {post.author}</h3>
              <div className={styles.buttonContainer}>
                <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => deletePost(post._id)}>Delete</button>
                <button className={styles.button} onClick={() => startEditing(post)}>Edit</button>
              </div>
            </>
          )}
        </section>
      ))}
    </div>
  );
}
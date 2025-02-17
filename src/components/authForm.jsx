import styles from '../css/authform.module.css'; // Import the CSS module

export default function AuthForm({ clicked, customData }) {
  function submittedForm(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    clicked(username, password);
  }

  return (
    <form className={styles.form} onSubmit={submittedForm}>
      <div>
        <label htmlFor="username" className={styles.label}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className={styles.input}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.input}
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        {customData}
      </button>
    </form>
  );
}
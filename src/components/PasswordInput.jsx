import styles from "./PasswordInput.module.css";

export default function PasswordInput({
  name,
  placeholder,
  value,
  onChange,
  required = false,
  showPassword,
  setShowPassword,
}) {
  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />

      <button
        type="button"
        className={styles.eyeButton}
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? "◐" : "◑"}
      </button>
    </div>
  );
}
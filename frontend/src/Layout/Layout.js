import styles from "./Layout.module.css";

export default function Layout(props) {
  return (
    <>
      <header className={`${styles.header}`}>{props.header}</header>
      <>{props.content}</>
      <footer className={`${styles.footer}`}>{props.footer}</footer>
    </>
  );
}
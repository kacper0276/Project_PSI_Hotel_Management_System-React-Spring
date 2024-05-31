import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="container">
      <p className="float-end"></p>
      <p>
        &copy; Tomasz oraz Kacper Renkel &middot;{" "}
        <Link href="#">Regulamin</Link> &middot; <Link href="#">Kontakt</Link>{" "}
        <Link href="#">Polityka prywatności</Link>
      </p>
    </footer>
  );
}

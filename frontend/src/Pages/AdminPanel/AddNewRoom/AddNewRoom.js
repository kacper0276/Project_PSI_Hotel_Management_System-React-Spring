import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./AddNewRoom.module.css";

export default function AddNewRoom() {
  useWebsiteTitle("Stwórz nową rezerwację");

  return <p>Stwórz nową ofertę pokoju</p>;
}

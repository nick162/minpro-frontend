import Image from "next/image";
import Jumbotron from "./components/Jumbotron";
import Event from "./event/page";

export default function Home() {
  return (
    <div>
      <Jumbotron />
      <Event />
    </div>
  );
}

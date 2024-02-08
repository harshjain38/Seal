/* eslint react/prop-types: 0 */
// eslint-disable-next-line
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import { useNavigate } from "react-router-dom";
import Logo from "../UI/Logo/logo";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="main-home">
      <Logo />

      <h1 className="head1-home">AVAILABLE NOW FOR EARLY ACCESS</h1>
      <h1 className="head2-home">SeAL</h1>
      <p className="head3-home">We present SeAL a novel framework designed to leverage the capabilities of advanced language models (LLMs) in handling transcribed speech. By simply using a single line of code, SeAL enables efficient processing of large audio transcripts encompassing few hundred thousand tokens, at one go. This streamlined approach facilitates tasks such as summarization and question answering with speed and effectiveness.</p>

      <button className="waitlist">Join Waitlist</button>
      <p className="try" onClick={() => navigate("/playground")}>Try in Playground</p>
    </div>
  );
}

export default Home;

/* eslint react/prop-types: 0 */
// eslint-disable-next-line
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import { useState } from "react";
// import ytdl from 'ytdl-core';
import Logo from "../UI/Logo/logo";
import InputForm from "./inputForm";
import "./playground.css";
// import loader1 from "./loader.mp4";
import loader2 from "./loader.gif";

function Playground({setTranscripts,setUserId}) {
  const [load, setLoad] = useState(false);

  return (
    <div className="main-play">
      <Logo />
      
      {
        load
        ? <div className="load">
            <div className="load-content">
              <Logo />
              {/* <img width="70" height="70" src={loader1} alt="Loading..." /> */}
              <img width="80" height="80" src={loader2} alt="Loading..." />
              {/* <img width="70" height="70" src="https://img.icons8.com/external-others-inmotus-design/67/000000/external-S-alphabet-others-inmotus-design-14.png" alt="external-S-alphabet-others-inmotus-design-14"/> */}
              <h2 className="load-head">This can take a few minutes. Files several hours long may take some time.</h2>
            </div>
          </div>
        : ""
      }

      <h1 className="head1-play">INTRODUCING</h1>
      <h1 className="head2-play">SeAL</h1>
      <p className="head3-play">We present SeAL a novel framework designed to leverage the capabilities of advanced language models (LLMs) in handling transcribed speech. By simply using a single line of code, SeAL enables efficient processing of large audio transcripts encompassing few hundred thousand tokens, at one go. This streamlined approach facilitates tasks such as summarization and question answering with speed and effectiveness.</p>

      <InputForm setTranscripts={setTranscripts} setUserId={setUserId} setLoad={setLoad} />
    </div>
  );
}

export default Playground;

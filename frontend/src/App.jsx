import Home from "./components/Home/home.jsx"
import Playground from "./components/Playground/playground.jsx"
import Transcript from "./components/Transcript/transcript.jsx"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [transcripts,setTranscripts] =useState([]);
  // const [audioLink,setAudioLink] =useState("");
  const [userId,setUserId] = useState("");

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/playground" element={<Playground setTranscripts={setTranscripts} setUserId={setUserId}/>} />
          <Route path="/playground/transcript" element={<Transcript transcripts={transcripts} userId={userId}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

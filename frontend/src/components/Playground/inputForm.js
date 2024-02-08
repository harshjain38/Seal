import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {v1} from "uuid";
import axios from "axios";
import classes from "./inputForm.module.css";

const InputForm = props => {
    const [link, setLink] = useState("");
    const navigate = useNavigate();

    const chat2 = async (e, link) => {
        e.preventDefault();

        props.setLoad(true);

        const uuidv1 = v1();
        const uuidV1 = uuidv1.split('-')[0];
        const id = `abc_${uuidV1}`;
        props.setUserId(id);

        try {
            const result = await axios.post("http://35.195.91.213/youtube_embed",
                {
                    user_id: id,
                    video_url: link
                },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                    },
                }
            );
            // youtubedl.exec(link, ['-x', '--audio-format', 'mp3'], {}, (err, output) => {
            //   if (err) throw err;
            //   const audioUrl = output[0].url;
            //   setAudioLink(audioUrl);
            // });
            setLink("");
            let resp = [];
            resp.push(result.data.transcript);
            props.setTranscripts(resp);
            props.setLoad(false);
            navigate("./transcript");
        }
        catch (err) {
            setLink("");
            props.setLoad(false);
            console.log(err);
        }
    };

    const uploadAudio = async () => {
        props.setLoad(true);

        const uuidv1 = v1();
        const uuidV1 = uuidv1.split('-')[0];
        const id = `def_${uuidV1}`;
        props.setUserId(id);

        try {
            const url = 'http://localhost:8080/audio_upload';

            const form = new FormData();
            form.append('user_id', id); 
            form.append('audio_file', document.getElementById('audioFile').files[0]); 

            const response = await axios.post(url, form, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": `multipart/form-data; boundary=${form._boundary}`,     
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                },
            });

            let resp = [];
            resp.push(response.data);
            props.setTranscripts(resp);
            props.setLoad(false);   
            navigate("./transcript");
        } 
        catch (err) {
            props.setLoad(false);
            alert("Something went wrong. Try again later!");
            console.error(err);
        }
    };

    return <form className={classes.inputForm} action="" onSubmit={(e) => chat2(e, link)}>
        <input
            className={classes.inp} type="url" name="link" value={link}
            placeholder="https://www.youtube.com/watch?v=hE97YT57Ti8h..."
            onChange={(e) => setLink(e.target.value)} required
        />
        <input className={classes.audioInput} type="file" accept="audio/*" id="audioFile" onChange={uploadAudio} />
        <button className={classes.processing} >Start Processing</button>
    </form>
}

export default InputForm;
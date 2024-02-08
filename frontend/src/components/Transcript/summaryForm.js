import axios from "axios";
import classes from "./summaryForm.module.css";

const SummaryForm = props => {

    const genSummary = async (e, tra) => {
        e.preventDefault();
        props.setSummary("Typing...");
        try {
            const response = await axios.post("http://35.195.91.213/youtube_summary",
                {
                    transcript: tra
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
            props.setSummary(response.data.summary);
        }
        catch (err) {
            props.setSummary("");
            console.log(err);
        }
    }

    return <form action="" onSubmit={(e) => genSummary(e, props.transcript)}>
        <button className={classes.generate}>Generate</button>
    </form>
}

export default SummaryForm;
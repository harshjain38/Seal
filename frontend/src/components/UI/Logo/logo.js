import React from "react";
import classes from "./logo.module.css";

const Logo = () => {
    return <div className={classes.main}>
        <img className={classes.logo} src="https://img.icons8.com/external-others-inmotus-design/67/000000/external-S-alphabet-others-inmotus-design-14.png" alt="external-S-alphabet-others-inmotus-design-14"/>
        <h2 className={classes["logo-name"]}>eAL</h2>
    </div>
}

export default Logo;
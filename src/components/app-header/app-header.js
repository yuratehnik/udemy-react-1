import React from "react";
import "./app-header.scss";

const AppHeader = ({liked, allPostsLength}) => {
    return (
        <div className="app-header d-flex">
            <h1>Yurii</h1>
        <h2>{allPostsLength} записей, из них понравилось {liked}</h2>
        </div>
    )
}

export default AppHeader;
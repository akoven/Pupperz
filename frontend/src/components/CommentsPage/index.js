import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";


const CommentsPage = () => {

    const image = useSelector(state => state.images)

    return(
        <h1>Comments Page</h1>
    )
}

export default CommentsPage;

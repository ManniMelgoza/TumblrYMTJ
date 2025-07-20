// import { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots } from "../../redux/post";
import './LandingPage.css';
import { useEffect } from "react";

const LandingPage = () => {
    const dispatch = useDispatch();

    const postsList = useSelector((state) => state.posts);
    console.log(postsList);
    const postsArr = Object.values(postsList);
    console.log(postsArr);

    useEffect(() => {
        dispatch(thunkGetAllSpots());
    }, [dispatch]);

    return (

        <h1>ReelQuotes</h1>
    )
}

export default LandingPage;

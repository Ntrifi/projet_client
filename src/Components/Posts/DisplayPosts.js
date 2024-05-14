import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../../Redux/actions/post";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

function DisplayPosts () {

    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllPosts())
    },[dispatch])
    const posts = useSelector((state) => state.postReducer.posts);
    const handleDelete =(id)=>{
        dispatch(deletePost(id))
        navigate('/')
    }
    return (
        <div className="pub-card">
        {posts &&
          posts.map((p) => (
            <Card className="card" style={{ width: "18rem" }} key={p._id}>
              <Card.Img
                style={{ height: "170px" }}
                variant="top"
                src={p.LinkImage}
              />
              <Card.Body>
                <Card.Title>{p.Title}</Card.Title>
                <Card.Text>{p.Description}</Card.Text>
                {isAuth && (
                  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </Button>
                    <Button variant="outline-secondary">
                      Update
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
      </div>
    )
}
export default DisplayPosts;
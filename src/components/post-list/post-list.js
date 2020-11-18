import React from "react";
import PostListItem from "../post-list-item/post-list-item";
import {ListGroup, ListGroupItem} from "reactstrap";
import "./post-list.scss";

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {


    const elements = posts.map((item) => {
        const {id, ...itemProps} = item;

        return (
            <ListGroupItem key={item.id}>
                <PostListItem 
                onToggleImportant={()=>onToggleImportant(id)}
                onToggleLiked={()=>onToggleLiked(id)}
                {...itemProps}
                onDelete={()=>onDelete(id)}/>
            </ListGroupItem>
        )
    })

    return (
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
    )
}

export default PostList;
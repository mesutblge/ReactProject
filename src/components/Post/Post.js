import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import React, { useEffect, useRef, useState } from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
function Post(props) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([""]);
  const [error, setError] = useState(null);
  const isInitialMount =useRef(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };
  const { title, text, userId, userName, postId } = props;
  const handleLike = () => {
    setLiked(!liked);
  };

  const refreshComments=()=>{
    fetch('/comments/getAllComment?postId='+postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }
  useEffect(()=>{

    if(isInitialMount.current)
    isInitialMount.current=false;
  else
  refreshComments();
  },[])


  return (
    <Card className="main">
      <CardHeader
        avatar={
          <Link className="link" to={{ pathname: '/users/' + userId }}>
            <Avatar sx={{ background:'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)',
              color:'white'}} aria-label="recipe">
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon style={liked ? { color: 'red' } : null} />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;

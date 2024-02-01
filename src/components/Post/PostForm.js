import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
import { Alert, Button, FormControl, InputAdornment, Snackbar } from '@mui/material';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
function PostForm(props) {
  const { userId, userName, refreshPosts } = props;
  const [text,setText]=useState("");
  const [title,setTitle]=useState("");
  const [isSent,setIsSent]=useState(false);


  const savePost=()=>{
    fetch("/posts/createPost",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        title:title,
        userId:userId,
        text:text,
      }),
    })
    .then((res)=>res.json())
    .catch((err)=>console.log(err))
  }

  const handleSubmit =()=>{
    savePost();
    setIsSent(true);
    refreshPosts();
    setTitle("");
    setText("");
    }

  const handleTitle =(value)=>{
    setTitle(value);
    setIsSent(false);

  }

  const handleText =(value)=>{
    setText(value);
    setIsSent(false);
  }

  const handleClose=(event,reason)=>{
    if(reason==="clickaway"){
      return;
    }
    setIsSent(false);
  }

  return (
<div>
  <Snackbar open={isSent} autoHideDuration={1000} onClose={handleClose}>
    <Alert onClose={handleClose} severity='success'>
      This is a success message!
    </Alert>
  </Snackbar>

    <Card className="main">
      <CardHeader
        avatar={
          <Link className="link" to={{ pathname: '/users/' + userId }}>
            <Avatar sx={{background:'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)',
              color:'white' }} aria-label="recipe">
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={<TextField
        id="outlined-adornment-amount"
        multiline
        placeholder="Title"
        inputProps={{maxLength : 25}}
        fullWidth
        value={title}
        onChange={(i)=>handleTitle(i.target.value)}
        >
        
        </TextField>}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
        <TextField
          id="outlined-adornment-amount"
          multiline
          placeholder="Text"
          fullWidth
          value={text}
          onChange={(i)=>handleText(i.target.value)}
          inputProps={{ maxLength: 250 }}
          InputProps={{
          endAdornment: ( 
            <InputAdornment position="end">
              <Button 
               style={{background:'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)',
              color:'white'}}
               variant="contained" 
               onClick={handleSubmit}

               >
                Post
              </Button>
            </InputAdornment>
        ),
      }}
    />
        </Typography>
      </CardContent>
    </Card>
</div>
  );
}

export default PostForm;

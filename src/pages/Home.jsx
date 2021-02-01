import { IonPage , IonContent, IonItem, IonCard } from '@ionic/react';
import React, { useState, useEffect, useContext } from 'react';

// Styles and assets
import './Home.css';
import "../App.css"

// Modules
import { API } from 'aws-amplify';
import { listPosts } from '../graphql/queries'
import { getCurrentUser } from "../Util";

// Components and pages
import { AppContext } from "../State"
import SigninToPostButton from "../components/SigninToPostButton";
import PostContentButton from "../components/PostContentButton"
import ProfileHeader from "../components/ProfileHeader"
import PostCard from "../components/PostCard"

const Home = () => {
  const [posts, setPosts] = useState([])
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    getCurrentUser().then(result => {
        console.log("CURRENT USER ON HOME ",result.data.getUserByEmail )
        dispatch({
          type: "getCurrentUser",
          payload: result.data.getUserByEmail
        })
    }).catch(err => console.log("ERROR: ", err))
  }, [])


  async function fetchPosts() {
    try {
      const postsData = await API.graphql({
        query: listPosts, 
        authMode: 'API_KEY'
      })
      const fetchedPosts = postsData.data.listPosts.items
      console.log("Fetched Posts", fetchedPosts)
      setPosts(fetchedPosts)
    } catch (err) { 
      console.log("ERROR:" , err) 
    }
  }

  console.log("Current User", state.currentUser)
  return (
    <IonPage >
      <ProfileHeader />
      <IonContent>
      {/* <PostContentButton />  */}
        { !state.currentUser ? <SigninToPostButton/> : <PostContentButton /> }
        <br></br><br></br><br></br>
          {
            posts.map((item, index)=> {
              return(
                <PostCard item={item} key={index}/>
              )
            })
          }
      </IonContent>
    </IonPage>
  );
};



export { Home };



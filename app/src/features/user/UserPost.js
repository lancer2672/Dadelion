import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
  } from "recyclerlistview";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AntDesign } from "@expo/vector-icons";


const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_WIDTH_WITH_MARGIN_L_R_12 = SCREEN_WIDTH - 24;

const UserPost = () => {
    const {user} = useSelector(state => state.auth)
    // const userPosts = useSelector(state =>state.post.posts)
    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    console.log("userPosts",userPosts);
    const [heart,setHeart] = useState(false);
    useEffect(()=>{
      getUserPosts()
    },[])
    const getUserPosts = async()=>{
      await axios.get('http://localhost:3000/post',{
        params:{
          user,
        }
      })
      .then( (res)=>{
        console.log(res.data.posts);
        if(!res)
        {
          setUserPosts([{description:"aa"}]);
        }
        else{
          console.log(res.data);
          setUserPosts(res.data.posts);
        }
        setLoading(false);
      })
      .catch(err => console.error("co loi gi do roi",err))
    }
    const items = userPosts.map((post, index) => {
      return {
        type: "NORMAL",
        item: {
          id: index,
          ...post,
        },
      };
    });
    
          const handleReact = () =>{
            setHeart(!heart);
          }
      const dataProvider = new DataProvider((r1, r2) => r1 != r2).cloneWithRows(
        items
      );
      const layoutProvider = new LayoutProvider(
        (i) => {
          return dataProvider.getDataForIndex(i).type;
        },
        (type, dim) => {
          switch (type) {
            case "NORMAL":
              dim.width = SCREEN_WIDTH;
              //Tuỳ thuộc vào độ dài của phần text mà set độ cao cho thẻ
              dim.height = 500;
              break;
            default:
              dim.width = 0;
              dim.height = 0;
          }
        }
      );
        /*#endregion*/
  
      const rowRenderer = (type, data) => {
        const { description } = data.item;
        return (

          <View style = {styles.postContainer}>
            <View style = {styles.header}>
              <TouchableOpacity onPress = {() => navigation.navigate("User")}>
                <Image source={require("./../../../assets/imgs/24.jpg")} style={styles.avatar} ></Image>
              </TouchableOpacity>
              <View style = {styles.userDescription}>
                <Text style = {{fontWeight:600}}>Username</Text>
                <Text>Time</Text>
              </View>
            </View>
            <View style = {styles.content}>
              <Text>{description}</Text>
            </View>
            <Image source={require("./../../../assets/imgs/24.jpg")} style={{width:SCREEN_WIDTH_WITH_MARGIN_L_R_12,height:350, resizeMode:"stretch"}}></Image>
            <View style= {styles.reactSection}>
            <TouchableOpacity onPress={handleReact} style = {styles.icon}>
                {heart == true? <AntDesign name="heart" size={24} color="red" />: 
                      <AntDesign name="hearto" size={24} color="black" />}
              </TouchableOpacity>
              <TouchableOpacity >
                  <Text style = {styles.comment}>Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      };
      console.count("RENDER")
  return (
        <View>
           {isLoading == true?<Text>LOading...</Text> :
            <RecyclerListView
            style={{ minWidth: 200, minHeight:200 }}
            rowRenderer={rowRenderer}
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
          ></RecyclerListView>  }
        </View>
  )
}

export default UserPost


const styles = StyleSheet.create({
    postContainer:{
      margin:12,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 1,
    }
    ,
    reactSection:{
      marginLeft:12,
      marginTop:8,
      flexDirection: "row",
      alignItems:'center',
      justifyContent: "space-evenly"
    },
    containerReact:{
      alignItems:'center'
    }
    ,
    comment:{
      height:16,
      backgroundColor:"red"
    },
    icon:{
  
    },
    avatar:{
      marginRight:12,
      width:40,
      height:40, 
      resizeMode:"stretch",
      borderRadius:50,
    },
    userDescription:{
      justifyContent:"center"
    },
  
    content:{
      marginTop:8,
      marginLeft:8,
      marginBottom:8,
    },
    header:{
      marginTop:8,
      marginLeft:8,
      flexDirection: "row",
    }
  })
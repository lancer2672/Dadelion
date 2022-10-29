import { StyleSheet, Text,Image, View, Dimensions } from 'react-native'
import React, {Component} from 'react'
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview'

const SCREEN_WIDTH = Dimensions.get('window').width;
//*
export class Post extends Component {
  constructor(props){
    super(props)
    console.log("FAKE POSTS",props.posts);
    const items = this.props.posts.map((post, index)=>{
      return {
        type:'NORMAL',
        item:{
            id: index,
            ...post
        }
      }
    })
    this.dataProvider = new DataProvider((r1, r2)=> r1 != r2 ).cloneWithRows(items)
    this.layoutProvider = new LayoutProvider((i)=>{
          return this.dataProvider.getDataForIndex(i).type;
      }, (type, dim)=>{ 
        switch(type){
          case 'NORMAL':
            dim.width = SCREEN_WIDTH;
            dim.height = 100;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      })
    
      this.rowRenderer = (type, data) =>{
        const {title, description} = data.item;
        return ( <View>
            <Text>{title}</Text>
            <Text>{description}</Text>
        </View>)
      }
      
  }
  render() {
    return (
        <RecyclerListView style={{ minHeight: 100, minWidth: 100 }} 
            rowRenderer = {this.rowRenderer}
            dataProvider = {this.dataProvider}
            layoutProvider = {this.layoutProvider}>
        </RecyclerListView>
    )
  }
}

export default Post

const styles = StyleSheet.create({
    PostImage:{
        width: 50,
        height: 50,
        resizeMode: 'center'
    }
})


// export class post extends Component {
//   constructor(props){
//         super(props)
//         console.log("POSTS",props.posts)
//   }
//   render() {
//     return (
//       <View>
//         <Text>post</Text>
//       </View>
//     )
//   }
// }

// export default post
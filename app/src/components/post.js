import { StyleSheet, Text,Image, View } from 'react-native'
import React, {Component} from 'react'
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview'


// //*
// export class post extends Component {
//   constructor(props){
//     super(props)
//     const items = this.props.posts.map((post, index)=>{
//     this.state = {
//       //condition to re-render 
//       dataProvider: new DataProvider((r1, r2)=> r1 != r2 ).cloneWithRows(items)
//     }
//       return {
//         type:'NORMAL',
//         item:{
//             id: index,
//             ...post
//         }
//       }
//     })
//     console.log(items);
   
//     this.layProvider = LayoutProvider((i)=>{
//         console.log("index",i);
//         return i;
//           return provider.getDataForIndex(i).type;
//       }, (type, dim)=>{ 
//         switch(type){
//           // case 'NORMAL':
//           //   dim.width = SCREEN_WIDTH;
//           //   dim.height = 100;
//           //   break;
//           default:
//             dim.width = 0;
//             dim.height = 0;
//         }
//       })
    
//       rowRenderer = (type, data) =>{
//         return null;
//         const {title, description} = data.item;
//         return ( <View>
//             <Text>{title}</Text>
//             <Text>{description}</Text>
//         </View>)
//       }
      
//   }
//   render() {
//     return (
//       <RecyclerListView
//         style= {{flex:1}}
//         rowRenderer = {rowRender}
//         dataProvider = {this.state.dataProvider}
//         layoutProvider = {this.rowRenderer}>
//     </RecyclerListView>
//     )
//   }
// }

// export default post

const styles = StyleSheet.create({
    PostImage:{
        width: 50,
        height: 50,
        resizeMode: 'center'
    }
})


export class post extends Component {
  constructor(props){
        super(props)
        console.log("POSTS",props.posts)
  }
  render() {
    return (
      <View>
        <Text>post</Text>
      </View>
    )
  }
}

export default post
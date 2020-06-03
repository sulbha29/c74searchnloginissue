import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import db from '../config'
import { ScrollView } from 'react-native-gesture-handler';



export default class Searchscreen extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        allTransactions: [],
        lastvisibletransaction:null,
        search:'',
      }
    }

    fetchMoreTransaction=async()=>{
     // var text=this.state.search.toUpperCase()
      var enteredText=text.split("");
      if(enteredText[0].toUpperCase==='B'){
        const query = await db.collection("transaction").where("bookid","==",text).startAfter(this.state.lastvisibletransaction).limit(10).get();
        query.docs.map((doc)=>{
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastvisibletransaction:doc
          })
        })
      }
        else if(enteredText[0].toUpperCase()==='S'){
          const query = await db.collection("transaction").where("studentId","==",text).startAfter(this.state.lastvisibletransaction).limit(10).get();
        query.docs.map((doc)=>{
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastvisibletransaction:doc
          })
        })
        }
      }
      searchTransactions=async(text)=>{
        var enteredText= text.split("")
       // var text=text.toUpperCase();
        if(enteredText[0].toUpperCase()==='B'){
          const transaction = await db.collection("transaction").where("bookid","==",text).get();
          transaction.docs.map((doc)=>{
            this.setState({
              allTransactions:[...this.state.allTransactions,doc.data()],
              lastvisibletransaction:doc
            })
          })
        }
        else if(enteredText[0].toUpperCase()==='S')
{         
   const transaction = await db.collection("transaction").where("studentId","==",text).get();
          transaction.docs.map((doc)=>{
            this.setState({
              allTransactions:[...this.state.allTransactions,doc.data()],
              lastvisibletransaction:doc
            })
        })
      }
      }
      componentDidMount=async()=>{
const query = await db.collection("transaction").limit(10).get();
query.docs.map((doc)=>{
  this.setState({
    alltransactions:[],
    lastvisibletransaction:doc
  })
})

    }

   
    render(){
      return(
        <View style ={styles.container}>
          <View style = {styles.searchBar}>
            <TextInput style ={styles.bar}
            placeholder="Enter Bookid or student id "
            onChangeText={(text)=>{this.setState({search:text})}}/>
            <TouchableOpacity style = {styles.searchButton}
            onPress={async()=>{
              this.searchTransactions(this.state.search)
            }}>
              <Text>Search</Text>
            </TouchableOpacity>
          </View>
        
<FlatList
data = {this.state.allTransactions}
renderItem ={({item})=>(
<View style ={{borderBottomWidth:2}}>
<Text> {"bookid:"+item.bookid} </Text>
  <Text> {"studentid:"+item.studentId} </Text>
  <Text> {"TransactionType:"+item.transactionType} </Text>
  <Text> {"Date:"+item.date.toDate()} </Text>
</View>
)}
keyExtractor={(item,index)=>index.toString()}
onEndReached={this.fetchMoreTransaction}
onEndThreshold={0.7}
/>
</View>
);
    }
  }
  const styles=StyleSheet.create({
    container:{
      flex:1,
      marginTop:20,
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green',
    }
  })
import React from 'react';
import{View,StyleSheet,Text,Image,TouchableOpacity,Alert,KeyboardAvoidingView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class LoginScreen extends React.Component{
   
   constructor(){
       super();
       this.state={
           emailId:'',
           password:''
       }
   } 
   login= async(emailId,password)=>{
       if(emailId && password){
           try{
               const response = await firebase.auth().signInWithEmailAndPassword(emailId,password)
          if(response){
              this.props.navigation.navigate("Transaction")
          }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found': Alert.alert("user doesnt exists")
                    break;
                    case 'auth/invalid-email': Alert.alert('incorrect email or password')
                }
            }
       }
       else{
           Alert.alert('enter email and password')
       }
   }
   render(){
        return(
        <View>
                <KeyboardAvoidingView style ={{alignItems:'center', marginTop:100}}>
                    <View>
                        <Image 
                        source = {require("../assets/booklogo.jpg")}
                        style = {{width:200,height:200}}/>
                        <Text style = {{textAlign:'center',fontSize:30}}>Wily</Text>
                </View>
                <View>
                <TextInput
                style = {styles.loginBox}
                placeholder = "abc@example.com"
                keyboardType='email address'
                onChangeText={(text)=>{
                    this.setState({
                    emailId:text
                })
    }}
    />
     <TextInput
                style = {styles.loginBox}
                secureTextEntry = {true}
                placeholder = "enter password"
               
                onChangeText={(text)=>{
                    this.setState({
                    password:text
                })
    }}
/>
</View>
<View>
    <TouchableOpacity style = {{height:30, width:90, borderWidth:1,marginTop:20}}
    onPress ={()=>{
        this.login(this.state.emailId,this.state.password)}}>
            <Text style = {{textAlign:'center'}}>Login</Text>
        </TouchableOpacity>
        </View>
       
    </KeyboardAvoidingView>
    </View>
        )
    }
}             


const styles = StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
    }
})
import colors from "../colors";
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button , TextInput,Alert} from 'react-native';

import axios from 'axios'

class CreateDatabases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProjectName : "",
      Num_tables: "",
      username: "",
      password: "",
      isloading: false,
    };
    this.checklogin = this.checklogin.bind(this);
    this.signup = this.signup.bind(this);
  }
  checklogin(){
    var X = {
      "username" : this.state.username,
      "password" : this.state.password,
    };
    var Y = JSON.stringify(X);

    axios.post('https://makeapibackend.herokuapp.com/getuser', Y)
    .then(response => {
      this.setState({isloading : false})
      if(response.data.toString() == "OK"){
        Alert.alert("Authenticated!");
        this.setState({valid: true});
        this.props.savedetails(this.state.username , this.state.password);
      }
      else{
        Alert.alert(response.data.toString());
      }
      
    }).catch(response =>{
      Alert.alert("Error" ,response);
    })
    
    return;
  }
  signup(){

    var X = {
      "username" : this.state.username,
      "password" : this.state.password,
    };
    var Y = JSON.stringify(X);

    axios.post('https://makeapibackend.herokuapp.com/save', Y)
    .then(response => {
      this.setState({isloading : false})
      if(response.data.toString() == "User added!"){
        Alert.alert("You can login now..");
      }
      else{
        Alert.alert(response.data.toString());
      }
    }).catch(response =>{
      Alert.alert("Error" ,response);
    })
      
    return;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex:3, alignContent: "center"}}>
          <Text style={styles.tagtext}>Design your own api</Text>
          <View >
             <TextInput
                style={styles.textInput}  
                placeholder="Project Name (only alphabets)"
                selectionColor={colors.blue}
                value= {this.state.ProjectName}
                onChangeText={ (e) => {
                  if( e=="" || (e[e.length-1] >= 'a' && e[e.length-1] <= 'z') || (e[e.length-1] >= 'A' && e[e.length-1] <= 'Z') ){}else return;
                  this.setState({ ProjectName: e})
                }}
            ></TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Number of tables required  (max: 10)"
                selectionColor={colors.blue}
                value= {(this.state.Num_tables != 0) ? this.state.Num_tables.toString() : ""}
                onChangeText={ (e) => {     
                  if(e=="" ||(e[e.length-1] >= '0' && e[e.length-1] <= '9')){}else return;
                  if(parseInt(e) > 10){e = "10"};
                  if(e=="")e = "0";
                    e = parseInt(e);
                    this.setState({ Num_tables: e})
                } }
            ></TextInput>
            <TextInput
                style={styles.textInput}
                placeholder="username"
                selectionColor={colors.blue}
                onChangeText={ (e) => {
                    this.setState({ username: e})
                } }
            ></TextInput>
            <TextInput
                style={styles.textInput}
                placeholder="password"
                selectionColor={colors.blue}
                onChangeText={ (e) => {
                    this.setState({ password: e})
                } }
            ></TextInput>
          </View>
        </View>
        <View style={styles.btn}>
          <View style={{flex : 1, marginRight: 10}}>
            <Button
              title="Sign up"
              color={ (this.state.isloading) ?  colors.gray : colors.red}
              onPress={()=>{
                this.setState({isloading : true});
                this.signup();
              }}
            />
          </View>
          <View style={{flex : 1 , marginRight: 10}}>
            <Button
              title="Login"
              color={ (this.state.isloading ) ?  colors.gray : colors.red}
              onPress={()=>{
                this.setState({isloading : true});
                this.checklogin();
              }}
            />
          </View>
          <View style={{flex : 1}}>
            <Button
              title="Proceed"
              color={(this.state.valid == false || this.state.projectName == "" || this.state.Num_tables == "") ? colors.gray : colors.red}
              onPress={()=>{
                if(this.state.valid == false || this.state.projectName == "" || this.state.Num_tables == "")return;
                this.props.addinfo(this.state);
                Alert.alert("Swipe");
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      paddingRight:20,
      flex: 1,
      paddingLeft:20,
      paddingTop:20,
      backgroundColor: colors.yellow,
      flexGrow: 100,
    },
    textInput:{
      backgroundColor:"#fff",
      marginTop:5,
      marginBottom:5,
      padding: 10,
      height: 40,
      borderRadius:5,
      color: "#000000",
      borderColor: "#000000",
      borderWidth: 1,
    },
    tagtext:{
      color: "black",
      marginTop: 50,
      marginBottom: 50,
      fontSize: 50,
      fontWeight: "700",
    },
    addbtn:{
      marginTop:10,
      marginBottom:10,
    },
    btn:{
      flex:1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems:"center"
    }
});

export default CreateDatabases;

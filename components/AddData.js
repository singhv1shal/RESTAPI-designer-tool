import colors from "../colors";
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Picker, ScrollView , TextInput, Alert, CheckBox} from 'react-native';


class AddData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      num: 1,
      value: [0],
      Routes: [],
     };
     this.changefields = this.changefields.bind(this);
  }
  changefields(data){
    var F = [];
    for(var i=0;i<this.state.Routes.length;i++){
      if(this.state.Routes[i].id != data.data.id){
        F.push(this.state.Routes[i]);
      }
    }
    F.push(data.data);
    this.setState({Routes : F},
       ()=>{
          // console.log(this.state.Routes)
        }
    );
  } 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <View style={{flex:1, alignContent: "center"}}>
          <Text style={styles.tagtext}>Add over Routes</Text>
          <Text style={styles.tagtextsmall}>Add data to models</Text>
          
        <View style={{flex:1, alignContent: "center" }}>

          <View style={{ flex:1, flexDirection:"row",marginBottom:10}}>
            <View style={{ flex:4, marginRight:5 }} >
            <TextInput
              style={styles.textInput}
              value= {(this.state.num != 0) ? this.state.num.toString() : ""}
              placeholder="Number of Routes  (max: 10)"
              selectionColor={colors.blue}
              onChangeText={ (e) => {                
                if(e=="" ||(e[e.length-1] >= '0' && e[e.length-1] <= '9')){}else return;
                if(parseInt(e) > 10){e = "10"};
                if(e=="")e = "0";
                  e = parseInt(e);
                  this.setState({num:e})
              } }
            ></TextInput>

            </View>
            <View style={{ flex:2 , marginTop:8}} >
              <Button 
                title="Routes"
                color={colors.red}
                onPress={()=>{
                  var cols = [] , F = []; 
                  for(var i=0;i<this.state.num;i++){
                    cols.push(i);
                  }
                  for(var i=0;i<Math.min(this.state.num , this.state.Routes.length);i++){ F.push(this.state.Routes[i]); }
                  for(var i=Math.min(this.state.num , this.state.Routes.length);i<this.state.num;i++){ F.push({id : i}); }
                  this.setState({
                    value: cols,
                    Routes : F
                  });
                }}
              />
            </View>
          </View>
          

          <View style={{flex:5}}>
            {this.state.value.map( (v) => <Onecol 
              key={v} 
              val={v} 
              models = {this.props.models}
              changefields = {this.changefields}
            /> )}
          </View>

          <View style={{
            flex:1,marginBottom:50,marginTop:50
          }}>
          <Button
            title="Submit"
            color={colors.red}
            onPress={()=>{
              // console.log(this.state.Routes)
              this.props.addRoutes(this.state.Routes);
              Alert.alert("Routed! Swipe");
            }}
          />
        </View>
        </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

class Onecol extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      id: this.props.val,
      Url: "",
      method:"POST",
      models_req : []
     };
     this.changemodelsarr = this.changemodelsarr.bind(this);
  }
  changemodelsarr(m,b){
    var M = [];
    for(var i=0;i<this.state.models_req.length;i++){
      if(this.state.models_req[i] != m){
        M.push(this.state.models_req[i]);
      }
    }
    if(b == true){ M.push(m); }
    this.setState({
      models_req: M
    },()=>{
      this.props.changefields({data : this.state}) 
    })
  }
  render() {
    return (
      <View style={{flex:1,
          borderWidth:1,
          backgroundColor: "#fff",
          borderRadius:20,
          padding:30,
          marginBottom:10,
        }} >
        <TextInput style={{flex:1}}
              style={styles.textInput}
              placeholder="URL"
              selectionColor={colors.blue}
              onChangeText={ (e) => { this.setState({Url:e},()=>{this.props.changefields({data : this.state});} ) } }
          ></TextInput>
        
        <Text style={{backgroundColor:colors.light_grey, padding:10, borderRadius:50,marginTop:5, marginBottom:5}}>
          Method type</Text>

        <Picker style={{flex:1 }} 
          selectedValue={this.state.method}
          onValueChange={
            (itemValue, itemIndex) => this.setState({method:itemValue},()=>{this.props.changefields({data : this.state});} )
          }
          >
          <Picker.Item label="GET" value="GET" />
          <Picker.Item label="POST" value="POST" />
        </Picker>   

        <Text style={{backgroundColor:colors.light_grey, padding:10, borderRadius:50,marginTop:5, marginBottom:5}}>
         Data to store</Text>
        <View>
          { this.props.models.map( (m) => 
                <CheckModels 
                  key = {m.id}
                  name = {m.TableName}
                  val = {m.id}
                  change={this.changemodelsarr}
                />
             ) }
        </View>
      </View>     
    );
  }
}

class CheckModels extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      checked:false
     };
  }
  render() {
    return (
      <View>
      <View style={{ flexDirection: 'row' }}>
        <CheckBox
          value={this.state.checked}
          onValueChange={() => this.setState({ checked: !this.state.checked },()=>{
            this.props.change(this.props.name, this.state.checked);
          })}
        />
        <Text style={{marginTop: 5}}>{this.props.name}</Text>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView:{
    paddingRight:20,
  },
    container: {
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
      marginBottom: 10,
      fontSize: 38,
      fontWeight: "700",
    },
    tagtextsmall:{
        color: "black",
        marginTop: 10,
        marginBottom: 30,
        fontSize: 25,
        fontWeight: "700",
    },
    addbtn:{
      marginTop:10,
      marginBottom:10,
    },
    btn:{
      flex:1,
      flexDirection: "row",
      justifyContent: "flex-end",
    },viewHolder:
    {
        height: 55,
        backgroundColor: '#26A69A',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },

    text:
    {
        color: 'white',
        fontSize: 25
    },

    btn:
    {
        position: 'absolute',
        right: 25,
        bottom: 25,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 15
    },

    btnImage:
    {
        resizeMode: 'contain',
        width: '100%',
        tintColor: 'white'
    }
});

export default AddData;

import colors from "../colors";
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Picker, ScrollView , TextInput, Alert, CheckBox} from 'react-native';


class CreateModels extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      num: 1,
      value: [0],
      Table_name:"",
      Fields:[],
     };
     this.changefields = this.changefields.bind(this);
  }
  
  changefields(data){
    var F = [];
    for(var i=0;i<this.state.Fields.length;i++){
      if(this.state.Fields[i].id != data.data.id){
        F.push(this.state.Fields[i]);
      }
    }
    F.push(data.data);
    this.setState({Fields : F},
       ()=>{
        //  console.log(this.state.Fields)
        }
    );
  } 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <View style={{flex:1, alignContent: "center"}}>
          <Text style={styles.tagtext}>Table {this.props.table_num }</Text>
          
        <View style={{flex:1, alignContent: "center" }}>
          
          <TextInput
            style={styles.textInput}
            placeholder="Table name"
            selectionColor={colors.blue}
            onChangeText={ (e) => {this.setState({Table_name:e })} }
          ></TextInput>

          <View style={{ flex:1, flexDirection:"row",marginBottom:10}}>
            <View style={{ flex:4, marginRight:5 }} >
            <TextInput
              style={styles.textInput}
              value= {(this.state.num != 0) ? this.state.num.toString() : ""}
              placeholder="Number of columns (max: 10)"
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
                title="Columns"
                color={colors.yellow}
                onPress={()=>{
                    var cols = [] , F = []; 
                    for(var i=0;i<this.state.num;i++){
                      cols.push(i);
                    }
                    for(var i=0;i<Math.min(this.state.num , this.state.Fields.length);i++){ F.push(this.state.Fields[i]); }
                    for(var i=Math.min(this.state.num , this.state.Fields.length);i<this.state.num;i++){ F.push({id : i}); }
                    this.setState({
                      value: cols,
                      Fields : F
                    });
                }}
              />
            </View>
          </View>

          <View style={{flex:5}}>
            {this.state.value.map( (v) => <Onecol 
              key={v.toString()} 
              val={v.toString()} 
              changefields = {this.changefields}
            /> )}
          </View>

          <View style={{ marginTop:150 , marginBottom : 50 , flex:1 }}>
          <Button
            title="Submit"
            color={colors.yellow}
            onPress={()=>{
              this.props.addtable({
                id : this.props.table_num,
                TableName: this.state.Table_name,
                Fields: this.state.Fields
              });
              Alert.alert("Added!");
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
    this.changekeys = this.changekeys.bind(this);
    this.state = { 
      Constraints:[],
      id: this.props.val,
      FieldName : "",
      Datatype:"IntegerField",
      default : ""
     };
  }
  changekeys(m,b){
    var M = [];
    for(var i=0;i<this.state.Constraints.length;i++){
      if(this.state.Constraints[i] != m){
        M.push(this.state.Constraints[i]);
      }
    }
    if(b == true){ M.push(m); }
    this.setState({
      Constraints: M
    },()=>{
      // console.log(this.state);
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
        <Text style={{backgroundColor:colors.light_grey, padding:10, borderRadius:10,marginTop:5, marginBottom:5}}>Field Number {this.props.val}</Text>
        <TextInput style={{flex:1}}
              style={styles.textInput}
              placeholder="Field name"
              selectionColor={colors.blue}
              onChangeText={ (e) => { this.setState({FieldName:e},()=>{this.props.changefields({data : this.state});} ) } }
          ></TextInput>

        <Text style={{backgroundColor:colors.light_grey, padding:10, borderRadius:50,marginTop:5, marginBottom:5}}>Data Type</Text>
        <Picker style={{flex:1 }} 
          selectedValue={this.state.Datatype}
          onValueChange={
            (itemValue, itemIndex) => this.setState({Datatype:itemValue},()=>{this.props.changefields({data : this.state});} )
          }
          >
          <Picker.Item label="IntegerField" value="IntegerField" />
          <Picker.Item label="CharField" value="CharField" />
          <Picker.Item label="TextField" value="TextField" />
          <Picker.Item label="DateField" value="DateField" />
          <Picker.Item label="EmailField" value="EmailField" />
          <Picker.Item label="URLField" value="URLField" />
        </Picker>

        <Text style={{backgroundColor:colors.light_grey, padding:10, borderRadius:50,marginTop:5, marginBottom:5}}>Constraints</Text>
        {
          [ "primary_key", "null", "unique" ].map((k) =>
            <CheckModels key={k} name={k}  change={this.changekeys} />
          )
        }
      
        <Text style={{backgroundColor:colors.light_grey, padding:10, borderRadius:50,marginTop:5, marginBottom:5}}>Default</Text>
        <TextInput style={{flex:1}}
              style={styles.textInput}
              placeholder="None"
              selectionColor={colors.blue}
              value = { ( this.state.Datatype == "DateField" ) ? "auto_now_add" : this.state.default}
              onChangeText={ (e) => { 
                if(this.state.Datatype != "IntegerField" && this.state.Datatype != "DateField"){
                  if(e.length > 0 && e[e.length -1] != "\""){
                    e = e.substring(0,e.length-1);
                  }
                  e = e.replace(/\"/g, "");
                  if(e != "")
                    e = "\""+e+"\"";
                }
                else{
                  if(e[e.length - 1] >= "0" && e[e.length - 1] <= "9" ){}else return;
                }
                this.setState({default:e},()=>{this.props.changefields({data : this.state});} ) } }
          ></TextInput>
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
      backgroundColor: colors.blue,
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
      color: "white",
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

});

export default CreateModels;

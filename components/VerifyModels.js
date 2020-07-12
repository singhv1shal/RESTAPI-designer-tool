import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button , Alert,ScrollView } from 'react-native';
import colors from "../colors";

class VerifyModels extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            ErrorLog : "Error logs comes here",
            valid: false,
         };
        this.validate = this.validate.bind(this);       
        this.allwords = this.allwords.bind(this);
        this.allnumber = this.allnumber.bind(this);
        this.adderrorlog = this.adderrorlog.bind(this);
    }
    
    allwords(x){
        for(var i=0;i<x.length;i++){
            if( (x[i] >= 'a' && x[i] <= 'z') )continue;
            if( (x[i] >= 'A' && x[i] <= 'Z') )continue;
            return false;
        }return true;
    }
    allnumber(x){
        for(var i=0;i<x.length;i++){
            if( (x[i] >= '0' && x[i] <= '9') )continue;
            return false;
        }return true;
    }
    
    adderrorlog(err){
        var error = this.state.ErrorLog;
        var idx = error.indexOf("\nstop")
        if(idx == -1){ idx = error.length;}
        this.setState({ErrorLog : error.substring(0,idx) + "\n>> "+err+'\n---finished rechecking'});
    }
    validate(){
        this.setState({valid : false});
        var tables = this.props.getModels();
        // console.log(tables);
        if(tables.length == 0 || tables.length < this.props.numoftables ) {this.adderrorlog("some/all models are not submitted"); return false;}
        for(var i=0;i<tables.length;i++){
            var pk = 0
            if( (tables[i].TableName).length == 0 ){this.adderrorlog("table name missing in model "+ i); return false;}
            if( this.allwords(tables[i].TableName) == false ){this.adderrorlog("table name can only contain only alphabets in model "+i);return false;}
            
            if( tables[i].Fields.length == 0 ){{this.adderrorlog("fields are missing in model "+ i); return false;}}
            
            for(var f=0;f<tables[i].Fields.length;f++){
                if( tables[i].Fields[f].FieldName.length == 0 ){this.adderrorlog("field name missing in model "+ i +", field "+ f); return false;}
                if( this.allwords(tables[i].Fields[f].FieldName) == false ){this.adderrorlog("field name can only contain only alphabets in model "+ i +", field "+ f); return false;}
                
                for(var j=0;j<tables[i].Fields[f].Constraints.length;j++){
                    if( tables[i].Fields[f].Constraints[j] == 'primary_key' )pk++;
                    if(pk > 1){this.adderrorlog("there can be only one primary key in a table, err in model "+ i +", field "+ f); return false;};
                }
            }
        }
        this.setState({valid : true , ErrorLog : ">> No error!!"});
        return true;
    }
    componentDidMount(){
        this.validate();
    }
    

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.tagtext}>Quick check</Text>
                <ScrollView style={{flex:5}}>
                <View style={{flex:3, alignContent: "center"}}>
                <View style={{
                    borderWidth:1,
                    borderRadius:5,
                    padding:10,
                    marginBottom:20,
                }}>
                    <Text style={{ color:colors.yellow, fontWeight:"700" }}>Error Logs:</Text>
                    <Text>
                        {this.state.ErrorLog}
                    </Text>
                </View>
                <View style={{
                    borderWidth:1,
                    borderRadius:5,
                    padding:10,
                    margintop:10,
                }}>
                    <Text style={{ color:colors.yellow, fontWeight:"700" }}>Instructions:</Text>
                    <Text style={{color:"#fff"}}>
                        You can press the "Ready?" button to unlock remaining steps.
                        In the next few steps you will define urls to manage your data.
                        the routes will be created accordingly, note: "Given" keyword means that you have to provide
                        the data so that a particular record is selected (in update, delete and querying the data), if you haven't selected anything in given. 
                        By deafult all of the records in the tables are selected.
                    </Text>
                </View>
                </View>
                </ScrollView>
                <View style={styles.btn}>
                <Button 
                    title="refresh"
                    color={colors.blue}
                    onPress={()=>{
                        this.setState({
                            ErrorLog : ">> revalidate.."
                        },() =>this.validate())
                    }}
                />
                <Button 
                    title="Proceed"
                    color={ (this.state.valid) ? colors.blue : colors.gray}
                    onPress={()=>{
                        if(this.validate() == false){Alert.alert("Check error log first"); return;}
                        Alert.alert("Unlocked");
                        this.props.proceed();}
                    }
                />
                </View>
            </SafeAreaView>
        );
    }
}

export default VerifyModels;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft:20,
      paddingRight:20,
      paddingTop:20,
      backgroundColor: colors.red,
      flexGrow: 100,
    },
    tagtext:{
      color: "white",
      marginTop: 50,
      marginBottom: 100,
      fontSize: 50,
      fontWeight: "700",
    },
    btn:{
      flex:0.2,
      flexDirection: "row",
      justifyContent: 'flex-end',
    }
});
  

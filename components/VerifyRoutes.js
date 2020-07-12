import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button , Alert } from 'react-native';
import colors from "../colors";

class VerifyRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            ErrorLog : "Waiting for the results please wait...",
            OK : false,
         };
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{flex:3, alignContent: "center"}}>
                <Text style={styles.tagtext}>Final check</Text>
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
                    <Text style={{color:"#fff"}} >
                        Your API look cool... :)
                        Note - After the built is finished you can check your make-api-extension and select "Get Project" from Command pallete in VSCode.
                        if you dont have "make-api-extension" yet you can download it from VSCode marketplace.
                    </Text>
                </View>
                </View>
                <View style={styles.btn}>
                <Button 
                    title="Ready?"
                    color={colors.blue}
                    onPress={()=>{
                        Alert.alert("Built");
                        this.setState({ OK : true });
                        this.props.proceed();
                    }}
                />
                </View>
            </SafeAreaView>
        );
    }
}

export default VerifyRoutes;

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
      flex:1,
      flexDirection: "row",
      justifyContent: "flex-end",
    }
});
  
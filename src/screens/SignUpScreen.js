import React,{ useState } from "react";
import { View, StyleSheet,TextInput,Button,Text } from "react-native";
import tailwind from "tailwind-rn";
export default function SignUp({ onLoginStatus }) {
    const [state, setState] = useState({
        userId: "",
        password: "",
        confirmpass: "",
        name: "",
        address: "",
        mobileNumber: "",
        email: "",
      });
      const onSignUp =()=>{
        const { userId, password,confirmpass,name,address,mobileNumber,email } = state;
      }
    
    return (
        <View style={tailwind("bg-blue-200 flex flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5")}>
            <Text>Name</Text>
            <TextInput 
                value={state.name}
                onChange={(name)=> setState({...state,name})}
                placeholder={"Name"}
                style={styles.input}
            />
        <Text>Username</Text>
          <TextInput
            value={state.userId}
            onChangeText={(userId) => setState({ ...state, userId })}
            placeholder={"UserId"}
            style={styles.input}
          />
          <Text>Password</Text>
          <TextInput
            value={state.password}
            onChangeText={(password) => setState({ ...state, password })}
            placeholder={"Password"}
            secureTextEntry={true}
            style={styles.input}
          />
          <Text>Confirm Password</Text>
          <TextInput
          value={state.confirmpass}
          onChangeText={(confirmpass)=> setState({...state, confirmpass})}
          placeholder = {"Confirm Password"}
          secureTextEntry={true}
          style = {styles.input} 
          />
          <Text>Address</Text>
          <TextInput
          value={state.address}
          onChangeText={(address)=>setState({...state,address})}
          placeholder={"Address"}
          style={styles.input}
          />
          <Text>Mobile</Text>
          <TextInput
          value={state.mobileNumber}
          onChangeText={(mobileNumber)=>setState({...state,mobileNumber})}
          placeholder={"Mobile Number"}
          style={styles.input}
          />
          <Text>Email</Text>
          <TextInput
          value={state.email}
          onChangeText={(email)=>setState({...state,email})}
          placeholder={"Email"}
          style={styles.input}
          />
          <Button title={"SignUP"} style={tailwind('bg-blue-400 py-4 text-center px-17 md:px-12 md:py-4 text-white rounded leading-tight text-xl md:text-base font-sans mt-4 mb-20')} onPress={onSignUp} />
          <Text  style={tailwind('text-base text-white text-right font-roboto leading-normal hover:underline mb-6')}>Already Have An Account,SignIn?</Text> 
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
      },
      input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 10,
      },
    });

//export default LoginScreen;

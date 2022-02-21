import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useClerk, useSignIn } from "@clerk/clerk-expo";
import { log } from "../logger";
import { styles } from "../components/Styles";
export default function SignInScreen({ navigation, }) {
    const { setSession } = useClerk();
    const signIn = useSignIn();
    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const onSignInPress = async () => {
        try {
            const completeSignIn = await signIn.create({
                identifier: emailAddress,
                password,
            });
            await setSession(completeSignIn.createdSessionId);
        }
        catch (err) {
            log("Error:> " + (err.errors ? err.errors[0].message : err));
        }
    };
    const onSignUpPress = () => navigation.replace("SignUp");
    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput autoCapitalize="none" value={emailAddress} style={styles.textInput} placeholder="Email..." placeholderTextColor="#000" onChangeText={(emailAddress) => setEmailAddress(emailAddress)} />
            </View>
            <View style={styles.inputView}>
                <TextInput value={password} style={styles.textInput} placeholder="Password..." placeholderTextColor="#000" secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
            </View>
            <TouchableOpacity style={styles.primaryButton} onPress={onSignInPress}>
                <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text>Have an account?</Text>
                <TouchableOpacity style={styles.secondaryButton} onPress={onSignUpPress}>
                    <Text style={styles.secondaryButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

//         React.createElement(View, { style: styles.container },
//         React.createElement(View, { style: styles.inputView },
//             React.createElement(TextInput, { autoCapitalize: "none", value: emailAddress, style: styles.textInput, placeholder: "Email...", placeholderTextColor: "#000", onChangeText: (emailAddress) => setEmailAddress(emailAddress) })),
//         React.createElement(View, { style: styles.inputView },
//             React.createElement(TextInput, { value: password, style: styles.textInput, placeholder: "Password...", placeholderTextColor: "#000", secureTextEntry: true, onChangeText: (password) => setPassword(password) })),
//         React.createElement(TouchableOpacity, { style: styles.primaryButton, onPress: onSignInPress },
//             React.createElement(Text, { style: styles.primaryButtonText }, "Sign in")),
//         React.createElement(View, { style: styles.footer },
//             React.createElement(Text, null, "Have an account?"),
//             React.createElement(TouchableOpacity, { style: styles.secondaryButton, onPress: onSignUpPress },
//                 React.createElement(Text, { style: styles.secondaryButtonText }, "Sign up")))));
// }
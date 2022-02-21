import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SignedIn, SignedOut, useClerk, useSession, useUser, } from "@clerk/clerk-expo";
import { log } from "../logger";
export default function SafeMyProfileScreen(props) {
    return (React.createElement(React.Fragment, null,
        React.createElement(SignedIn, null,
            React.createElement(MyProfileScreen, Object.assign({}, props))),
        React.createElement(SignedOut, null,
            React.createElement(View, { style: styles.container },
                React.createElement(Text, null, "Unauthorized")))));
}
function MyProfileScreen({ navigation }) {
    const { signOut } = useClerk();
    const { getToken } = useSession();
    const { firstName } = useUser();
    const [sessionToken, setSessionToken] = React.useState("");
    const onSignOutPress = async () => {
        try {
            await signOut();
        }
        catch (err) {
            // @ts-ignore
            log("Error:> " + (err.errors ? err.errors[0].message : err));
        }
    };
    React.useEffect(() => {
        const scheduler = setInterval(async () => {
            const token = await getToken();
            setSessionToken(token);
        }, 1000);
        return () => clearInterval(scheduler);
    }, []);
    return (
        <View style={styles.container}>
            <Text>Hello, {firstName}!</Text>
            <TouchableOpacity style={styles.link} onPress={onSignOutPress}>
                <Text style={styles.linkText}>Sign out</Text>
            </TouchableOpacity>
            <Text>{sessionToken}</Text>
        </View>
    );
}
        {/* React.createElement(View, { style: styles.container },
        React.createElement(Text, { style: styles.title },
            "Hello ",
            firstName),
        React.createElement(TouchableOpacity, { onPress: onSignOutPress, style: styles.link },
            React.createElement(Text, { style: styles.linkText }, "Sign out")),
        React.createElement(Text, { style: styles.token }, sessionToken)));
} */}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: "#2e78b7",
    },
    token: {
        marginTop: 15,
        paddingVertical: 15,
        fontSize: 15,
    },
});

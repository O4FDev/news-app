/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import { NavigationContainer } from "@react-navigation/native";
 import { createNativeStackNavigator } from "@react-navigation/native-stack";
 import * as React from "react";
 import SignUpScreen from "../screens/SignUpScreen";
 import SignInScreen from "../screens/SignInScreen";
 import VerifyCodeScreen from "../screens/VerifyCodeScreen";
 import MyProfileScreen from "../screens/MyProfileScreen";
 import LinkingConfiguration from "./LinkingConfiguration";
 import { ClerkLoaded, useUser } from "@clerk/clerk-expo";
 export default function Navigation() {
     return (
         <NavigationContainer linking={LinkingConfiguration}>
                <RootNavigator />
            </NavigationContainer>
        );
 }
 const Stack = createNativeStackNavigator();
 /**
  * Read more about the protected routes pattern in React Native
  *
  * https://reactnavigation.org/docs/auth-flow
  */
 const RootNavigator = () => {
     const { user, isSignedOut } = useUser({
         withAssertions: true,
     });
     return (
         <ClerkLoaded>
                <Stack.Navigator
                    // isSignedOut
                    screenOptions={{
                        headerShown: true,
                    }}
                >
                    {isSignedOut(user) ? (
                        <>
                            <Stack.Screen name="SignIn" component={SignInScreen} />
                            <Stack.Screen name="SignUp" component={SignUpScreen} />
                            <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="MyProfile" component={MyProfileScreen} />
                        </>
                    )}
                </Stack.Navigator>
            </ClerkLoaded>
        );
 }
//          React.createElement(ClerkLoaded, null,
//          React.createElement(Stack.Navigator, null, isSignedOut(user) ? (React.createElement(React.Fragment, null,
//              React.createElement(Stack.Screen, { name: "SignUp", component: SignUpScreen, options: { title: "Sign Up" } }),
//              React.createElement(Stack.Screen, { name: "SignIn", component: SignInScreen, options: { title: "Sign In" } }),
//              React.createElement(Stack.Screen, { name: "VerifyCode", component: VerifyCodeScreen, options: { title: "Sign Up" } }))) : (React.createElement(Stack.Screen, { name: "MyProfile", component: MyProfileScreen, options: { title: "MyProfile" } })))));
//  };
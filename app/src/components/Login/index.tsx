import { Navigate, useNavigate } from "react-router-dom";
import { defaultUserBtnsContainerStyle, errorMessageStyle, goToSignupContainerStyle, goToSignupStyle, loginBtnStyle, loginSampleUsersContainerStyle, loginStyle, loginUidFormStyle, noAccountStyle, userAvatarStyle, userBtnStyle, userNameAndUidContainerStyle, userNameStyle, userUidStyle, usingSampleUsersTextStyle } from "./style";
import { useContext, useEffect, useState } from "react";

import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatThemeContext } from "@cometchat/chat-uikit-react";
import { CometChatUIKit } from "@cometchat/chat-uikit-react"
import { LoginSignup } from "../LoginSignup";
import { TextInput } from "../TextInput";
import { users } from "../../sampleApp/sampledata";
import emailjs from "@emailjs/browser";

interface ILoginProps {
    loggedInUser: CometChat.User | null | undefined,
    setLoggedInUser: React.Dispatch<React.SetStateAction<CometChat.User | null | undefined>>
    setInterestingAsyncOpStarted: React.Dispatch<React.SetStateAction<boolean>>
};

type User = {
    name: string,
    uid: string,
    avatar: string
};

type UserJson = {
    users: User[]
}

export function Login(props: ILoginProps) {
    const {
        loggedInUser,
        setLoggedInUser,
        setInterestingAsyncOpStarted
    } = props;

    const [uid, setUid] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { theme } = useContext(CometChatThemeContext);
    const [defaultUsers, setDefaultUsers] = useState<User[]>([]);


    async function sendLoginNotification(email: string, device: string) {
        const templateParams = {
            to_email: email,
            device_info: device,
            login_time: new Date().toLocaleString(),
        };

        try {
            await emailjs.send(
                "service_fkrlu0s", // Replace with EmailJS service ID
                "template_wyqakvu", // Replace with EmailJS template ID
                templateParams,
                "NVBcx_uxKxWPN94Fj"
            );
            console.log("Email sent successfully!");
        } catch (error) {
            // // if (error.message.includes("insufficient authentication scopes")) {
            // //     console.error("EmailJS Gmail API error: Insufficient authentication scopes. Check Gmail permissions.");
            // } else {
            //     console.error("Error sending email:", error);
            // }
            console.log("EmailJS Gmail API error: ", error);
        }
    }

    async function fetchDefaultUsers() {
        try {
            const response = await fetch("https://assets.cometchat.io/sampleapp/sampledata.json");
            const data: UserJson = await response.json();
            console.log("trying");
            await sendLoginNotification("tonydawrabou@gmail.com","hello" );
            setDefaultUsers(data.users);
        }
        catch (error) {
            console.log("fetching default users failed, using fallback data", error);
            setDefaultUsers(users.users);
        }
    }

    async function login(uid: string) {
        try {
            setInterestingAsyncOpStarted(true);
            console.log("0 ");
            CometChatUIKit.login(uid)?.then(async loggedInUser => {
                console.log("looging in 1");
                if (loggedInUser) {
                    const email = "tonydawrabou@gmail.com";
                    const deviceInfo = navigator.userAgent;
                console.log("looging in 2");
                    // Send login notification 
                    await sendLoginNotification(email, deviceInfo);
                    console.log("looging in 3 ");
                    setLoggedInUser(loggedInUser);
                    navigate("/home");
                }

            })
        }
        catch (error) {
            console.log("login failed", error);
            if (error instanceof CometChat.CometChatException && error.message) {
                setErrorMessage(error.message);
            }
            console.log(error);
        }
        finally {
            setInterestingAsyncOpStarted(false);
        }
    }

    async function handleLoginWithUidFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(uid);
        }
        catch (error) {
            console.log(error);
        }
    }

    function getUserBtnWithKeyAdded({ name, uid, avatar }: User) {
        return (
            <button
                key={uid}
                onClick={() => login(uid)}
                style={userBtnStyle(theme)}
            >
                <img
                    src={avatar}
                    alt={`${name}'s avatar`}
                    style={userAvatarStyle()}
                />
                <span
                    style={userNameAndUidContainerStyle()}
                >
                    <span
                        style={userNameStyle(theme)}
                    >
                        {name}
                    </span>
                    <span
                        style={userUidStyle(theme)}
                    >
                        {uid}
                    </span>
                </span>
            </button>
        );
    }

    function getErrorMessage() {
        if (!errorMessage) {
            return null;
        }
        return (
            <div
                style={errorMessageStyle(theme)}
            >
                {errorMessage}
            </div>
        );
    }

    useEffect(() => {
        fetchDefaultUsers();
        return () => {
            setDefaultUsers([]);
        }
    }, [])

    // if (loggedInUser === undefined) {
    //     return null;
    // }

    if (loggedInUser) {
        return <Navigate to="/home" />;
    }
    return (
        <LoginSignup
            title="Login to one of your saved account"
        >
            <div
                style={loginStyle()}
            >
                <div
                    style={loginSampleUsersContainerStyle()}
                >
                    <div
                        style={usingSampleUsersTextStyle(theme)}
                    >
                        Existing Accounts
                    </div>
                    <div
                        style={defaultUserBtnsContainerStyle()}
                    >
                        {
                            defaultUsers.map(getUserBtnWithKeyAdded)
                        }
                    </div>
                </div>
                <form
                    onSubmit={handleLoginWithUidFormSubmit}
                    style={loginUidFormStyle()}
                >
                    <TextInput
                        labelText="Or else continue with login using UID"
                        placeholderText="Enter UID here"
                        value={uid}
                        onValueChange={setUid}
                        required
                    />
                    <button
                        style={loginBtnStyle(theme)}
                    >
                        Login
                    </button>
                </form>
                {getErrorMessage()}
                <div
                    style={goToSignupContainerStyle()}
                >
                    <div
                        style={noAccountStyle(theme)}
                    >
                        Don't have an account?
                    </div>
                    <button
                        onClick={() => navigate("/signup")}
                        style={goToSignupStyle(theme)}
                    >
                        sign up
                    </button>
                </div>
            </div>
        </LoginSignup>
    );
}

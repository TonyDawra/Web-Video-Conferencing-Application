import { useNavigate } from "react-router-dom";
import { CallLog, CallUser } from "@cometchat/calls-sdk-javascript";
import {
    CometChatCallLogHistory,
    CometChatIncomingCall,
    CometChatPalette,
    CometChatTheme,
    CometChatThemeContext,
    CometChatUIKit,
} from "@cometchat/chat-uikit-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export function CallLogHistoryWrapper({ isMobileView }: { isMobileView: boolean }) {
    const { state } = useLocation();
    const changeThemeToCustom = state?.changeThemeToCustom;
    const { theme } = useContext(CometChatThemeContext);
    const [loggedInUser, setLoggedInUser] = useState<any>(null);
    const [call, setCall] = useState<any>(null);
    const navigate = useNavigate(); // Hook to handle back navigation

    const themeContext = useMemo(() => {
        let res = theme;
        if (changeThemeToCustom) {
            res = new CometChatTheme({
                palette: new CometChatPalette({
                    mode: theme.palette.mode,
                    primary: {
                        light: "#D422C2",
                        dark: "#D422C2",
                    },
                    accent: {
                        light: "#07E676",
                        dark: "#B6F0D3",
                    },
                    accent50: {
                        light: "#39f",
                        dark: "#141414",
                    },
                    accent900: {
                        light: "white",
                        dark: "black",
                    },
                }),
            });
        }
        return { theme: res };
    }, [theme, changeThemeToCustom]);

    const getCall = useCallback(() => {
        const initiator = CallUser.getUserFromJson({
            name: loggedInUser?.name,
            avatar: loggedInUser?.avatar,
            uid: loggedInUser?.uid,
        });

        const receiver = CallUser.getUserFromJson({
            name: "Kevin",
            avatar:
                "https://data-us.cometchat.io/assets/images/avatars/spiderman.png",
            uid: "UID233",
        });

        const call = CallLog.callLogFromJson({
            initiator,
            receiver,
            participants: [
                {
                    uid: loggedInUser?.uid,
                    avatar: loggedInUser?.avatar,
                    name: loggedInUser?.name,
                    totalAudioMinutes: 120,
                    totalDurationInMinutes: 120,
                    // Other fields...
                },
            ],
        });

        setCall(call); // Setting the call object to state
    }, [loggedInUser]);

    useEffect(() => {
        // Call your function to fetch the logged-in user and call logs here.
        getCall();
    }, [getCall]);

    // **Back Button**
    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div style={{ position: "relative" }}>
            {/* Add your CometChatCallLogHistory component here */}
            <CometChatCallLogHistory />
            
            {/* Back Button positioned at bottom right */}
            <button
                onClick={handleBack}
                style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    fontSize: "16px",
                }}
            >
                Back
            </button>
        </div>
    );
}

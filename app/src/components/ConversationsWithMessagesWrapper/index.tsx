import { CometChatConversationsWithMessages, CometChatIncomingCall, CometChatPalette, CometChatTheme, CometChatThemeContext } from "@cometchat/chat-uikit-react";
import { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function ConversationsWithMessagesWrapper({ isMobileView }: { isMobileView: boolean }) {
    const { state } = useLocation();
    const changeThemeToCustom = state?.changeThemeToCustom;
    const { theme } = useContext(CometChatThemeContext);

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
                    }
                }),
            });
        }
        return { theme: res };
    }, [theme, changeThemeToCustom]);

    const navigate = useNavigate(); // Initialize navigate hook

    const handleBackButtonClick = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <CometChatThemeContext.Provider value={themeContext}>
            <button onClick={handleBackButtonClick} style={{ marginBottom: "10px", padding: "10px", color: "blue"}}>
                Back
            </button>
            
            <CometChatConversationsWithMessages 
                isMobileView={isMobileView} 
            />
            <CometChatIncomingCall />
        </CometChatThemeContext.Provider>
    );
}

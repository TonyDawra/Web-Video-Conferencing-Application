import { CometChatCallLogs, CometChatIncomingCall, CometChatPalette, CometChatTheme, CometChatThemeContext } from "@cometchat/chat-uikit-react";
import { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function CallLogsWrapper({ isMobileView }: { isMobileView: boolean }) {
    const { state } = useLocation();
    const changeThemeToCustom = state?.changeThemeToCustom;
    const { theme } = useContext(CometChatThemeContext);
    const navigate = useNavigate(); // useNavigate hook

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
            })
        }
        return { theme: res };
    }, [theme, changeThemeToCustom]);

    return (
        <CometChatThemeContext.Provider value={themeContext}>
            <div style={{ position: 'relative', height: '100vh' }}>
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)} 
                    style={{
                        position: 'absolute', 
                        bottom: '20px', 
                        right: '20px', 
                        padding: '10px 20px', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer',
                    }}
                >
                    Back
                </button>
                <CometChatCallLogs />
                <CometChatIncomingCall />
            </div>
        </CometChatThemeContext.Provider>
    );
}

import {
  CometChatContacts,
  CometChatPalette,
  CometChatTheme,
  CometChatThemeContext,
} from "@cometchat/chat-uikit-react";
import { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function ContactsWrapper() {
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
          },
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
      <button
        onClick={handleBackButtonClick}
        style={{
          position: "fixed",
          bottom: "20px",  // Position 20px from the bottom
          right: "20px",   // Position 20px from the right
          padding: "10px 20px",
          backgroundColor: "#007bff", // Blue color
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#0056b3"} // Darker blue on hover
        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#007bff"} // Reset to original blue
      >
        Back
      </button>
      <CometChatContacts contactsStyle={{}} title="" closeIconURL="" />
    </CometChatThemeContext.Provider>
  );
}

import { CardList } from "../CardList";
import { CometChatThemeContext } from "@cometchat/chat-uikit-react";
import { ICardProps } from "../Card";
import Localize from "../../assets/localize.png";
import SoundSmall from "../../assets/sound-small.png";
import Theme from "../../assets/theme.png";
import { fontHelper } from "@cometchat/uikit-resources";
import { useContext } from "react";

const cardDataList : Omit<ICardProps, "onClick">[] = [
    {
        title: "sound manager",
        description: "Play Diffrent Types of audio.",
        imageInfo: {
            url: SoundSmall,
            altText: "sound"
        }
    },
    {
        title: "theme",
        description: "Change style.",
        imageInfo: {
            url: Theme,
            altText: "theme"
        }
    },
    {
        title: "localize",
        description: "Detect a User language based on there location.",
        imageInfo: {
            url: Localize,
            altText: "language"
        }
    }
];

export function ResourcesCardList() {
    const { theme } = useContext(CometChatThemeContext);

    return (
        <CardList 
            title = "resources"
            cardDataList = {cardDataList}
            titleStyle = {{
                font: fontHelper(theme.typography.subtitle2),
                color: theme.palette.getAccent400()
            }}
        />
    );
}

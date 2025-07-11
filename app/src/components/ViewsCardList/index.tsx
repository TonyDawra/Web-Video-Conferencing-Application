import AudioBubble from "../../assets/audio-bubble.svg";
import Avatar from "../../assets/avatar.png";
import Badge from "../../assets/badge.png";
import CardBubble from "../../assets/card-bubble.svg";
import { CardList } from "../CardList";
import { CometChatThemeContext } from "@cometchat/chat-uikit-react";
import Conversation from "../../assets/conversation.png";
import FileBubble from "../../assets/file-bubble.svg";
import FormBubble from "../../assets/form-bubble.svg";
import SchedulerBubble from "../../assets/Schedule.svg"
import { ICardProps } from "../Card";
import ImageBubble from "../../assets/image-bubble.svg";
import Receipt from "../../assets/receipt.png";
import Status from "../../assets/status.png";
import TextBubble from "../../assets/text-bubble.svg";
import VideoBubble from "../../assets/video-bubble.svg";
import { fontHelper } from "@cometchat/uikit-resources";
import { useContext } from "react";

const cardDataList : Omit<ICardProps, "onClick">[] = [
    {
        title: "list item",
        description: "Displays data on a tile and that tile may contain leading, trailing, title and subtitle widgets.",
        imageInfo: {
            url: Conversation,
            altText: "list item"
        }
    },
    {
        title: "avatar",
        description: "Displays an image or a user/group avatar with fallback to the first two letters of the user/group name.",
        imageInfo: {
            url: Avatar,
            altText: "avatar"
        }
    },
    {
        title: "status indicator",
        description: "Check if a user is offline or online.",
        imageInfo: {
            url: Status,
            altText: "status indicator"
        }
    },
    {
        title: "badge",
        description: "Display the unread message count. It can be used in places like the conversation list item.",
        imageInfo: {
            url: Badge,
            altText: "badge"
        }
    },
    {
        title: "receipt",
        description: "Renders the receipts such as sending, sent, delivered, read and error state indicator of a message.",
        imageInfo: {
            url: Receipt,
            altText: "receipt"
        }
    },
    {
        title: "text bubble",
        description: "Displays a text message.",
        imageInfo: {
            url: TextBubble,
            altText: "text bubble"
        }
    },
    {
        title: "image bubble",
        description: "Displays a media message containing an image.",
        imageInfo: {
            url: ImageBubble,
            altText: "image"
        }
    },
    {
        title: "video bubble",
        description: "Displays a media message containing a video.",
        imageInfo: {
            url: VideoBubble,
            altText: "video"
        }
    },
    {
        title: "audio bubble",
        description: "Displays a media message containing an audio.",
        imageInfo: {
            url: AudioBubble,
            altText: "audio"
        }
    },
    {
        title: "file bubble",
        description: "Displays a media message containing a file.",
        imageInfo: {
            url: FileBubble,
            altText: "file"
        }
    },
    {
        title: "form bubble",
        description: "Displays a media message containing a form.",
        imageInfo: {
            url: FormBubble,
            altText: "form"
        }
    },
    {
        title: "scheduler bubble",
        description: "Displays a media message containing a Scheduler.",
        imageInfo: {
            url: SchedulerBubble,
            altText: "scheduler"
        }
    },
    {
        title: "card bubble",
        description: "Displays a media message containing a card.",
        imageInfo: {
            url: CardBubble,
            altText: "card"
        }
    }
];

export function ViewsCardList() {
    const { theme } = useContext(CometChatThemeContext);

    return (
        <CardList 
            title = "views"
            cardDataList = {cardDataList}
            titleStyle = {{
                font: fontHelper(theme.typography.subtitle2),
                color: theme.palette.getAccent400()
            }}
        />
    );
}

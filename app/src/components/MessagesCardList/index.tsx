import { ICardProps } from "../Card";
import Sidebar from "../../assets/sidebar.png";
import ListWrapper from "../../assets/listwrapper.png";
import List from "../../assets/list.png";
import Composer from "../../assets/composer.png";
import InfoIcon from "../../assets/info.svg"
import { CardList } from "../CardList";

const cardDataList : Omit<ICardProps, "onClick">[] = [
    {
        title: "messages",
        description: "Message a group.",
        imageInfo: {
            url: Sidebar,
            altText: "chat screen"
        }
    },
    {
        title: "message header",
        description: "View User/Group Info.",
        imageInfo: {
            url: ListWrapper,
            altText: "list wrapper"
        }
    },
    {
        title: "message list",
        description: "Main Chats.",
        imageInfo: {
            url: List,
            altText: "list"
        }
    },
    {
        title: "message composer",
        description: "Compose and Send Multitype-Message.",
        imageInfo: {
            url: Composer,
            altText: "composer"
        }
    },
    {
        title: "message information",
        description: "View Message Info.",
        imageInfo: {
            url: InfoIcon,
            altText: "message information"
        }
    }
];

export function MessagesCardList() {
    return (
        <CardList 
            title = "messages"
            cardDataList = {cardDataList}
        />
    );
}

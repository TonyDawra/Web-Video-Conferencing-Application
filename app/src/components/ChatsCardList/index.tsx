import { ICardProps } from "../Card";
import Sidebar from "../../assets/sidebar.png";
import ListWrapper from "../../assets/listwrapper.png";
import ContactIcon from "../../assets/contacts.svg"
import { CardList } from "../CardList";

const cardDataList : Omit<ICardProps, "onClick">[] = [
    {
        title: "conversations with messages",
        description: "Show all the conversations with the chat details.",
        imageInfo: {
            url: Sidebar,
            altText: "chat screen"
        }
    },
    {
        title: "conversations",
        description: "Recent Conversations.",
        imageInfo: {
            url: ListWrapper,
            altText: "list wrapper"
        }
    },
    {
        title: "contacts",
        description: "Show Contacts.",
        imageInfo: {
            url: ContactIcon,
            altText: "Contacts"
        }
    }
];

export function ChatsCardList() {
    return (
        <CardList 
            title = "chats"
            cardDataList = {cardDataList}
        />
    );
}

import { ICardProps } from "../Card";
import Sidebar from "../../assets/sidebar.png";
import ListWrapper from "../../assets/listwrapper.png";
import Details from "../../assets/details.svg";
import { CardList } from "../CardList";

const cardDataList : Omit<ICardProps, "onClick">[] = [
    {
        title: "users with messages",
        description: "List Available Users.",
        imageInfo: {
            url: Sidebar,
            altText: "chat screen"
        }
    },
    {
        title: "users",
        description: "List and search for User.",
        imageInfo: {
            url: ListWrapper,
            altText: "list wrapper"
        }
    },
    {
        title: "user details",
        description: "Details of the User",
        imageInfo: {
            url: Details,
            altText: "details"
        }
    }
];

export function UsersCardList() {
    return (
        <CardList 
            title = "users"
            cardDataList = {cardDataList}
        />
    );
}

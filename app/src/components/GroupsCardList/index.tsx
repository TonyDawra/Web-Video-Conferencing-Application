import { ICardProps } from "../Card";
import Sidebar from "../../assets/sidebar.png";
import ListWrapper from "../../assets/listwrapper.png";
import CreateGroup from "../../assets/create-group.svg";
import PasswordGroup from "../../assets/password-group.svg";
import GroupMembers from "../../assets/group-member.svg";
import AddMembers from "../../assets/add-members.svg";
import TransferOwnership from "../../assets/transfer-ownership-icon.svg";
import BannedMembers from "../../assets/ban-members.svg";
import Details from "../../assets/details.svg";
import { CardList } from "../CardList";

const cardDataList : Omit<ICardProps, "onClick">[] = [
    {
        title: "groups with messages",
        description: "Seearch Group and chat.",
        imageInfo: {
            url: Sidebar,
            altText: "chat screen"
        }
    },
    {
        title: "groups",
        description: "Search for groups.",
        imageInfo: {
            url: ListWrapper,
            altText: "list wrapper"
        }
    },
    {
        title: "create group",
        description: "Creat Group (Private, Password-Protected, Public).",
        imageInfo: {
            url: CreateGroup,
            altText: "create group"
        }
    },
    {
        title: "join protected group",
        description: "Join Password-Protected Groups.",
        imageInfo: {
            url: PasswordGroup,
            altText: "password protected group"
        }
    },
    {
        title: "group members",
        description: "View Group Mmebers.",
        imageInfo: {
            url: GroupMembers,
            altText: "group members"
        }
    },
    {
        title: "add members",
        description: "Add-Users to group.",
        imageInfo: {
            url: AddMembers,
            altText: "add members"
        }
    },
    {
        title: "transfer ownership",
        description: "Transfer Group Ownership.",
        imageInfo: {
            url: TransferOwnership,
            altText: "transfer ownership"
        }
    },
    {
        title: "group details",
        description: "More About Groups.",
        imageInfo: {
            url: Details,
            altText: "details"
        }
    }
];

export function GroupsCardList() {
    return (
        <CardList 
            title = "groups"
            cardDataList = {cardDataList}
        />
    );
}

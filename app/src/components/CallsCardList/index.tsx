import CallLogHistorySVG from "../../assets/call-log-history.svg";
import CallLogParticipantsSVG from "../../assets/call-log-participants.svg";
import CallLogRecordingsSVG from "../../assets/call-log-recordings.svg";
import CallLogSVG from "../../assets/call-logs.svg";
import { CardList } from "../CardList";
import { ICardProps } from "../Card";
import Sidebar from "../../assets/sidebar.png";

const cardDataList : Omit<ICardProps, "onClick">[] = [
    {
        title: "call buttons",
        description: "Initiate 1v1 and direct calling",
        imageInfo: {
            url: Sidebar,
            altText: "sidebar"
        }
    },
    {
        title: "call logs",
        description: "Display call logs",
        imageInfo: {
            url: CallLogSVG ,
            altText: "sidebar"
        }
    },
    {
        title: "call log details",
        description: "Display call log details",
        imageInfo: {
            url: CallLogSVG,
            altText: "sidebar"
        }
    },
    {
        title: "call log history",
        description: "Display call log history",
        imageInfo: {
            url: CallLogHistorySVG,
            altText: "sidebar"
        }
    },
    {
        title: "call log participants",
        description: "Display call log participants",
        imageInfo: {
            url: CallLogParticipantsSVG,
            altText: "sidebar"
        }
    },
    {
        title: "call log recordings",
        description: "Display call log recordings",
        imageInfo: {
            url: CallLogRecordingsSVG,
            altText: "sidebar"
        }
    },
    /*{
        title: "call logs with details",
        description: "Display call logs with details",
        imageInfo: {
            url: CallLogSVG,
            altText: "sidebar"
        }
    }*/
];

export function CallsCardList() {
    return (
        <CardList 
            title = "calls"
            cardDataList = {cardDataList}
        />
    );
}

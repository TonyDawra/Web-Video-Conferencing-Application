import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CometChatGroupMembers } from "@cometchat/chat-uikit-react";

type GroupMembersWrapperProps = { setSomeInterestingAsyncOperation : React.Dispatch<React.SetStateAction<boolean>>};

export function GroupMembersWrapper(props : GroupMembersWrapperProps) {
    const [group, setGroup] = useState<CometChat.Group>();
    const navigate = useNavigate();
    const { setSomeInterestingAsyncOperation, ...otherProps } = props;
    

    useEffect(() => {
        (async () => {
            const groupsRequest = new CometChat.GroupsRequestBuilder().setLimit(1).build();
            try {
                setSomeInterestingAsyncOperation(true);
                const [fetchedGroup] = await groupsRequest.fetchNext();
                setGroup(fetchedGroup);
            }
            catch(error) {
                console.log(error);
            }
            finally {
                setSomeInterestingAsyncOperation(false);
            }
        })();
    }, [setSomeInterestingAsyncOperation]);
    
    if (!group) {
        return null;
    }

    return (
        <div>
        <CometChatGroupMembers
            group = {group}
            onBack = {() => navigate(-1)}
            onClose = {() => navigate("/home/groups-module")}
            {...otherProps}
        />
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
                </div>
    );
}

import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useEffect, useState } from "react";
import { CometChatMessages } from "@cometchat/chat-uikit-react";
import { FormBubble } from "../CardList/Shared/Bubbles/FormBubble"; // Adjust the path accordingly

type MessagesWrapperProps = {
  setSomeInterestingAsyncOpStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export function MessagesWrapper(props: MessagesWrapperProps) {
  const [group, setGroup] = useState<CometChat.Group>();
  const { setSomeInterestingAsyncOpStarted, ...otherProps } = props;

  useEffect(() => {
    (async () => {
      const groupsRequest = new CometChat.GroupsRequestBuilder().setLimit(1).build();
      try {
        setSomeInterestingAsyncOpStarted(true);
        const [fetchGroup] = await groupsRequest.fetchNext();
        setGroup(fetchGroup);
      } catch (error) {
        console.log(error);
      } finally {
        setSomeInterestingAsyncOpStarted(false);
      }
    })();
  }, [setSomeInterestingAsyncOpStarted]);

  if (!group) {
    return null;
  }

  return (
    <div>
      <CometChatMessages group={group} {...otherProps} />
      <FormBubble
        activeComponent="form-bubble"
        handleCloseComponentModal={() => console.log("Form closed")}
        showComponentModal={true}
      />
    </div>
  );
}

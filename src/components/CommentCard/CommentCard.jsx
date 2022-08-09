import React from "react";
import DOMPurify from 'dompurify';

const CommentCard = ({comment}) => {

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(comment.content)
  })

  return <div className="comment">
          <div className="comment-txt"><b>Comment:</b><p dangerouslySetInnerHTML={sanitizedData()}></p></div>
          <p className="comment-author"><b>Author:</b> {comment.author.node.name}</p>
        </div>;
};

export default CommentCard;

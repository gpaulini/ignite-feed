import styles from "./Comment.module.css";
import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { ArrowBendUpLeft, Pencil, ThumbsUp, Trash } from "@phosphor-icons/react";
import { defaultAvatarURL, formatDateToReadable, formatDateToDescriptive } from "../common";

export const Comment = ({
  author,
  content,
  datePublished,
  likes,
  owner,
  replies,
  isReply
}: CommentProps) => {
  const [liked, setLiked] = useState(false);
  const [removePopup, setRemovePopup] = useState(false);
  const [totalReplies, setTotalReplies] = useState(replies ? replies.length : 0);

  let totalLikes = liked ? likes + 1 : likes;

  const handleRemoveComment = (event: React.MouseEvent<HTMLElement>) => {
    setRemovePopup(false);
    alert("A remover comentário...");
  };

  const handleLike = (event: React.MouseEvent<HTMLElement>) => {
    setLiked(!liked);
  };

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => { };

  //oldest at the top
  const sortedReplies = (replies && replies.length) ? replies.sort(
    (a, b) => new Date(a.datePublished).getTime() - new Date(b.datePublished).getTime()
  ) : [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.comment}>
        <div>
          <div className={styles.contentWrapper}>
            <div className={styles.contentHeader}>
              <div className={styles.avatarWrapper}>
                <Avatar imgSource={author.avatar || defaultAvatarURL} />
                <div>
                  <strong>{author.name}</strong>
                  <time
                    title={formatDateToReadable(datePublished)}
                    dateTime={datePublished}
                  >
                    {formatDateToDescriptive(datePublished)}
                  </time>
                </div>
              </div>
              {owner && (
                <div className={styles.contentHeaderOptions}>
                  <button className={styles.editIcon} onClick={handleEdit}>
                    <Pencil size={24} />
                  </button>
                  <button className={styles.trashIcon} onClick={() => setRemovePopup(true)}>
                    <Trash size={24} />
                  </button>
                </div>
              )}
            </div>
            <p>{content}</p>
          </div>
          <div className={styles.commentOptions}>
            <button
              className={`${styles.likeButton} ${liked ? styles.active : ""}`}
              onClick={handleLike}
            >
              <ThumbsUp size={20} /> Gostei {totalLikes > 0 && (' • ' + totalLikes)}
            </button>
            <button className={styles.replyButton}>
              <ArrowBendUpLeft size={20} /> Responder {(totalReplies > 0 && !isReply) && (' • ' + totalReplies)}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.replies}>
        {sortedReplies.map((e, i) => (
          <Comment
            author={e.author}
            content={e.content}
            datePublished={e.datePublished}
            likes={e.likes}
            owner={e.owner}
            isReply={true}
            key={`reply-${i}`}
          />
        ))}
      </div>

      {removePopup && (
        <div className={styles.removePopupShadow}>
          <div className={styles.removePopup}>
            <h3>Excluir comentário</h3>
            <p>Você tem certeza que gostaria de excluir esse comentário?</p>
            <div className={styles.removePopupOptions}>
              <button onClick={() => setRemovePopup(false)}>Cancelar</button>
              <button
                onClick={handleRemoveComment}
                className={styles.removeButton}
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

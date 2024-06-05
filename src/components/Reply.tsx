import styles from "./Reply.module.css";
import { useEffect, useState } from "react";
import { ArrowBendUpLeft, Pencil, ThumbsUp, Trash } from "@phosphor-icons/react";
import { defaultAvatarURL, formatDateToReadable, formatDateToDescriptive } from "../common";

export const Reply = ({ author, content, datePublished, likes, owner }: ReplyProps) => {
  const [liked, setLiked] = useState(false);
  const [removePopup, setRemovePopup] = useState(false);

  let totalLikes = liked ? likes + 1 : likes;

  const handleRemoveComment = (event: React.MouseEvent<HTMLElement>) => {
    setRemovePopup(false);
    alert("A remover comentário...");
  };

  const handleLike = (event: React.MouseEvent<HTMLElement>) => {
    setLiked(!liked);
  };

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    alert('A editar comentário...');
  };

  return (
    <>
      <div className={styles.reply}>
        <img src={author.avatar || defaultAvatarURL} />
        <div>
          <div className={styles.contentWrapper}>
            <div className={styles.contentHeader}>
              <div>
                <strong>{author.name}</strong>
                <time
                  title={formatDateToReadable(datePublished)}
                  dateTime={datePublished}
                >
                  {formatDateToDescriptive(datePublished)}
                </time>
              </div>
              {owner && (
                <div className={styles.contentHeaderOptions}>
                  <button className={styles.editIcon} onClick={handleEdit}>
                    <Pencil size={20} />
                  </button>
                  <button className={styles.trashIcon} onClick={() => setRemovePopup(true)}>
                    <Trash size={20} />
                  </button>
                </div>
              )}
            </div>
            <p>{content}</p>
          </div>
          <div className={styles.replyOptions}>
            <button
              className={`${styles.likeButton} ${liked ? styles.active : ""}`}
              onClick={handleLike}
            >
              <ThumbsUp size={20} /> Gostei • {totalLikes}
            </button>
            <button className={styles.replyButton}>
              <ArrowBendUpLeft size={20} /> Responder
            </button>
          </div>
        </div>
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
    </>
  );
};

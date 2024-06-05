import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { defaultAvatarURL, formatDateToReadable, formatDateToDescriptive } from "../common";
import { ChatTeardropText, ThumbsUp, ShareFat, Trash, PaperPlaneRight } from "@phosphor-icons/react";
import { useState } from "react";

export const Post = ({ author, content, datePublished, comments, likes, owner }: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [removePopup, setRemovePopup] = useState(false);
  const [totalComments, setTotalComments] = useState(comments ? comments.length : 0);
  const [showWriteComment, setShowWriteComment] = useState(false);

  let totalLikes = liked ? likes + 1 : likes;

  const handleRemovePost = (event: React.MouseEvent<HTMLElement>) => {
    setRemovePopup(false);
    alert("A remover post...");
  };

  const handleLike = (event: React.MouseEvent<HTMLElement>) => {
    setLiked(!liked);
  };

  const handleCommentButton = (event: React.MouseEvent<HTMLElement>) => {
    setShowWriteComment(!showWriteComment);
  };

  const handleWriteComment = (event: React.MouseEvent<HTMLElement>) => {
    alert("A enviar comentário...");
  };

  const sortedComments = (comments && comments.length) ? comments.sort(
    (a, b) => new Date(a.datePublished).getTime() - new Date(b.datePublished).getTime()
  ) : [];

  return (
    <div className={styles.wrapper}>
      <article className={styles.post}>
        <header className={styles.header}>
          <div className={styles.user}>
            <img src={author.avatar || defaultAvatarURL} />
            <div>
              <strong>{author.name}</strong>
              <span>{author.profession}</span>
            </div>
          </div>
          <time
            title={formatDateToReadable(datePublished)}
            dateTime={datePublished}
            className={styles.datePublished}
          >
            Publicado {formatDateToDescriptive(datePublished).toLowerCase()}
          </time>
        </header>
        <section className={styles.content}>
          {content}
          <div className={styles.options}>
            <button
              className={`${styles.likeButton} ${liked ? styles.active : ""}`}
              onClick={handleLike}
            >
              <ThumbsUp size={20} /> Gostei • {totalLikes}
            </button>
            <button className={styles.commentButton} onClick={handleCommentButton}>
              <ChatTeardropText size={20} /> Comentar • {totalComments}
            </button>
            <button className={styles.shareButton}>
              <ShareFat size={20} /> Compartilhar
            </button>
            {owner && (
              <button>
                <span className={styles.trashIcon}>
                  <Trash size={24} onClick={() => setRemovePopup(true)} />
                </span>
              </button>
            )}
          </div>
        </section>
        {showWriteComment && <section className={styles.writeComment}>
          {/* <strong>Deixe seu feedback</strong> */}
          <textarea autoFocus placeholder="Escreva um comentário..."></textarea>
          <button onClick={handleWriteComment}><PaperPlaneRight size={20} /></button>
        </section>}
        <section className={styles.commentsList}>
          {sortedComments.map((e, i) => (
            <Comment
              author={e.author}
              content={e.content}
              datePublished={e.datePublished}
              likes={e.likes}
              owner={e.owner}
              replies={e.replies}
              key={`comment-${i}`}
            />
          ))}
        </section>
      </article>

      {removePopup && (
        <div className={styles.removePopupShadow}>
          <div className={styles.removePopup}>
            <h3>Excluir post</h3>
            <p>Você tem certeza que gostaria de excluir esse post?</p>
            <div className={styles.removePopupOptions}>
              <button onClick={() => setRemovePopup(false)}>Cancelar</button>
              <button
                onClick={handleRemovePost}
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

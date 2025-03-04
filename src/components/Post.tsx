import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { currentUser, defaultAvatarURL, formatDateToReadable, formatDateToDescriptive, createNewCommentObject } from "../common";
import { ChatTeardropText, ThumbsUp, ShareFat, Trash, PaperPlaneRight } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { format } from 'date-fns';

export const Post = ({ author, content, datePublished, comments, likes, owner }: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [removePopup, setRemovePopup] = useState(false);
  const [postComments, setPostComments] = useState(comments);
  const [totalComments, setTotalComments] = useState(comments ? comments.length : 0);
  const [showWriteComment, setShowWriteComment] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    const commentText = textareaRef.current!.value;
    if (postComments?.length) {
      setPostComments([
        createNewCommentObject({
          author: currentUser,
          content: commentText,
          datePublished: format(new Date(), 'yyy-MM-dd HH:mm:ss'),
          likes: 0,
          owner: true,
          isReply: false
        }),
        ...postComments,
      ]);
      textareaRef.current!.value = '';
      setTotalComments(totalComments + 1);
    }
  };

  //most recent first
  const sortedComments = (postComments && postComments.length) ? postComments.sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  ) : [];

  return (
    <div className={styles.wrapper}>
      <article className={styles.post}>
        <header className={styles.header}>
          <div className={styles.user}>
            <Avatar imgSource={author.avatar || defaultAvatarURL} />
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
              <ThumbsUp size={20} /> Gostei {totalLikes && ' • ' + totalLikes}
            </button>
            <button className={styles.commentButton} onClick={handleCommentButton}>
              <ChatTeardropText size={20} /> Comentar {totalComments && ' • ' + totalComments}
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
          <textarea ref={textareaRef} autoFocus placeholder="Escreva um comentário..."></textarea>
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
              isReply={false}
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

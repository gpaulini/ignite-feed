interface ContentProps {
  readonly author: { name: string, profession?: string | null, avatar: string | null },
  readonly content: React.ReactNode | string,
  readonly datePublished: string,
  readonly likes: number,
  readonly owner: boolean
}

interface ReplyProps extends ContentProps { } //alias

interface CommentProps extends ContentProps {
  readonly replies: ReplyProps[] | null
}

interface PostProps extends ContentProps {
  readonly comments: CommentProps[] | null
}
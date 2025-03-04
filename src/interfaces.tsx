interface ContentProps {
  readonly author: { name: string, profession?: string | null, avatar: string | null },
  readonly content: React.ReactNode | string,
  readonly datePublished: string,
  readonly likes: number,
  readonly owner: boolean
}

interface CommentProps extends ContentProps {
  readonly replies?: CommentProps[]
  readonly isReply: boolean
}

interface PostProps extends ContentProps {
  readonly comments?: CommentProps[]
}

interface AvatarProps {
  readonly imgSource: string 
}
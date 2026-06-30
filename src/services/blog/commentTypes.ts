export type Comment = {
  id: string;
  blogId: string;
  author: {
    name: string;
    avatarImage?: string;
  };
  content: string;
  createdAt: string;
};


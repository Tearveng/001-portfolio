export type Posts = {
  __typename: string;
  id: string;
  title: string;
  description: string;
  created_at: Date;
  imageUrl: string;
  publicId: string;
  user: {
    __typename: string;
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    publicId: string;
  };
};

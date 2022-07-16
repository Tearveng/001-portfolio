import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      accessToken
      me {
        id
        name
        email
        imageUrl
        publicId
      }
      error
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      name
      email
      imageUrl
      publicId
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout {
      logout
    }
  }
`;

export const UPLOADPOST = gql`
  mutation Post(
    $title: String!
    $description: String!
    $imageUrl: String!
    $publicId: String!
  ) {
    savePost(
      title: $title
      description: $description
      imageUrl: $imageUrl
      publicId: $publicId
    ) {
      id
      title
      description
      imageUrl
      publicId
    }
  }
`;

export const POSTS = gql`
  query Posts($limit: Int!, $offset: Int!) {
    posts(limit: $limit, offset: $offset) {
      id
      title
      description
      imageUrl
      publicId
      created_at
      user {
        id
        name
        email
        imageUrl
        publicId
      }
      photos {
        id
        title
        description
        imageUrl
        publicId
      }
    }
  }
`;

export const SINGLE_POST = gql`
  query singlePost($id: String!) {
    post(id: $id) {
      id
      title
      description
      imageUrl
      publicId
      created_at
      user {
        id
        name
        email
        imageUrl
        publicId
      }
      photos {
        id
        title
        description
        imageUrl
        publicId
      }
    }
  }
`;

export const POSTs_SEARCH = gql`
  query postSearch($filter: String!) {
    postsSearch(filter: $filter) {
      id
      title
      description
      imageUrl
      publicId
      created_at
      user {
        id
        name
        email
        imageUrl
        publicId
      }
    }
  }
`;

export const ALL_POSTS_CACHE = gql`
  query postCache {
    postCache {
      id
      title
      description
      imageUrl
      publicId
      created_at
      user {
        id
        name
        email
        imageUrl
        publicId
      }
    }
  }
`;

export const SAVE_PHOTO = gql`
  mutation SavePhoto(
    $title: String!
    $description: String!
    $imageUrl: String!
    $postId: String!
  ) {
    savePhoto(
      title: $title
      description: $description
      imageUrl: $imageUrl
      postId: $postId
    ) {
      id
      title
      description
      imageUrl
    }
  }
`;

export const CONTACT_MESSAGE = gql`
  mutation($username: String!, $email: String!, $message: String!) {
    contactMessage(username: $username, email: $email, message: $message) {
      successful
      faild
    }
  }
`;

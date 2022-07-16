import { useMutation, useQuery } from "@apollo/client";
import { LOGIN, LOGOUT, ME } from "../graphql/graphq";

export const Authentication = () => {
  const { data, loading } = useQuery(ME);

  return {
    data,
    loading,
  };
};

export const SignInForm = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN, {
    update: (cache, { data }) => {
      if (data.userLogin.me) {
        const { me } = data.userLogin;
        cache.writeQuery({
          query: ME,
          data: {
            me: {
              id: me.id,
              name: me.name,
              email: me.email,
              imageUrl: me.imageUrl,
              publicId: me.publicId,
            },
          },
        });
      }
    },
  });

  return { login, data, loading, error };
};

export const Logout = () => {
  const [logout] = useMutation(LOGOUT);

  return { logout };
};

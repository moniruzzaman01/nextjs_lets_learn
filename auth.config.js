/** @type {import('next-auth').NextAuthConfig} */

const authConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [],
};

export default authConfig;

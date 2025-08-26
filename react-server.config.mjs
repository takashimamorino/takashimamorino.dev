export default {
  root: "src/app",
  page: {
    include: ["**/page.tsx"],
  },
  layout: {
    include: ["**/layout.tsx"],
  },
  adapter: [
    "@lazarv/react-server-adapter-vercel",
    {
      edge: true,
    },
  ],
};

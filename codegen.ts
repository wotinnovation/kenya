import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_BACKEND_URL || "http://10.255.254.100:4401/gql",
  documents: ["graphql/**/*.ts", "!graphql/generated/**"],
  generates: {
    "graphql/generated/schema-types.ts": {
      plugins: ["typescript"],
    },
    "graphql/generated/types.ts": {
      preset: "import-types",
      presetConfig: {
        typesPath: "./schema-types",
      },
      plugins: ["typescript-operations"],
    },
    "graphql/generated/index.tsx": {
      preset: "import-types",
      presetConfig: {
        typesPath: "./types",
      },
      plugins: ["typescript-react-apollo"],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;

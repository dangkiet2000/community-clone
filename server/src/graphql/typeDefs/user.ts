import { gql } from "graphql-tag";

const typeDefs = gql`
    type Mutation {
        createUsername(username: String!) : CreateUsernameResponseData
    }

    type Query {
        searchUsers(username: String!): [SearchedUser]
    }

    type SearchedUser {
        id: String
        username: String
    }

    type CreateUsernameResponseData {
        success: Boolean
        error: String
    }
`;

export default typeDefs;

export default `
import {
  CreateOrRenameUserStatus,
  IScuttlespaceUser,
  IPermission,
  IQuery,
  ICreateOrRenameUserArgs,
  ICreateOrRenameUserResult,
  IChangeUserStatusArgs,
  IChangeUserStatusResult,
  IMutation
} from "my-gql-types";
import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";

const getUserGQL = \`query GetUser($domain: String, $externalId: String, $username: String) {
  user(domain: $domain, externalId: $externalId, username: $username)
}\`;
export async function invokeGetUser(
  domain: string | undefined,
  externalId: string | undefined,
  username: string | undefined,
  apolloClient: ApolloClient<any>
): Promise<{
  user: IScuttlespaceUser | null;
}> {
  try {
    const result = await apolloClient.query({
      query: gql(getUserGQL),
      variables: {
        domain,
        externalId,
        username
      }
    });
    return result.data as any;
  } catch (ex) {
    throw ex;
  }
}

const createOrRenameUserGQL = \`mutation CreateOrRenameUser($args: CreateOrRenameUserArgs) {
  createOrRenameUser(input: $args)
}\`;
export async function invokeCreateOrRenameUser(
  args: ICreateOrRenameUserArgs | undefined,
  apolloClient: ApolloClient<any>
): Promise<{
  createOrRenameUser: ICreateOrRenameUserResult;
}> {
  try {
    const result = await apolloClient.mutate({
      mutation: gql(createOrRenameUserGQL),
      variables: {
        args
      }
    });
    return result.data as any;
  } catch (ex) {
    throw ex;
  }
}

const destroyUserGQL = \`mutation DestroyUser($args: ChangeUserStatusArgs) {
  destroyUser(input: $args)
}\`;
export async function invokeDestroyUser(
  args: IChangeUserStatusArgs | undefined,
  apolloClient: ApolloClient<any>
): Promise<{
  destroyUser: IChangeUserStatusResult;
}> {
  try {
    const result = await apolloClient.mutate({
      mutation: gql(destroyUserGQL),
      variables: {
        args
      }
    });
    return result.data as any;
  } catch (ex) {
    throw ex;
  }
}

const disableUserGQL = \`mutation DisableUser($args: ChangeUserStatusArgs) {
  disableUser(input: $args)
}\`;
export async function invokeDisableUser(
  args: IChangeUserStatusArgs | undefined,
  apolloClient: ApolloClient<any>
): Promise<{
  disableUser: IChangeUserStatusResult;
}> {
  try {
    const result = await apolloClient.mutate({
      mutation: gql(disableUserGQL),
      variables: {
        args
      }
    });
    return result.data as any;
  } catch (ex) {
    throw ex;
  }
}

const enableUserGQL = \`mutation EnableUser($args: ChangeUserStatusArgs) {
  enableUser(input: $args)
}\`;
export async function invokeEnableUser(
  args: IChangeUserStatusArgs | undefined,
  apolloClient: ApolloClient<any>
): Promise<{
  enableUser: IChangeUserStatusResult;
}> {
  try {
    const result = await apolloClient.mutate({
      mutation: gql(enableUserGQL),
      variables: {
        args
      }
    });
    return result.data as any;
  } catch (ex) {
    throw ex;
  }
}
`.trimLeft();

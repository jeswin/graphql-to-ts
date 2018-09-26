export default `
import { parseResult } from "my-graphql-result-parser";
import {
  IChangeUserStatusArgs,
  IChangeUserStatusResult,
  ICreateOrRenameUserArgs,
  ICreateOrRenameUserResult,
  IPermission,
  IScuttlespaceUser
} from "my-graphql-declarations";
import {
  createOrRenameUser,
  destroyUser,
  disableUser,
  enableUser,
  user
} from "./api";

export default {
  Mutation: {
    async createOrRenameUser(
      root: any,
      args: {
        input: ICreateOrRenameUserArgs;
      },
      context: any
    ): Promise<ICreateOrRenameUserResult> {
      const result = await createOrRenameUser(args, context);
      return await parseResult(result);
    },
    async enableUser(
      root: any,
      args: {
        input: IChangeUserStatusArgs;
      },
      context: any
    ): Promise<IChangeUserStatusResult> {
      const result = await enableUser(args, context);
      return await parseResult(result);
    },
    async disableUser(
      root: any,
      args: {
        input: IChangeUserStatusArgs;
      },
      context: any
    ): Promise<IChangeUserStatusResult> {
      const result = await disableUser(args, context);
      return await parseResult(result);
    },
    async destroyUser(
      root: any,
      args: {
        input: IChangeUserStatusArgs;
      },
      context: any
    ): Promise<IChangeUserStatusResult> {
      const result = await destroyUser(args, context);
      return await parseResult(result);
    }
  },
  Query: {
    async user(
      root: any,
      args: {
        domain: string | null;
        externalId: string | null;
        username: string | null;
      },
      context: any
    ): Promise<IScuttlespaceUser | null> {
      const result = await user(args, context);
      return await parseResult(result);
    }
  }
};
`.trimLeft();

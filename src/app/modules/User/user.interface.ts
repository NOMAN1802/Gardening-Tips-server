/* eslint-disable no-unused-vars */
import { Model, Schema } from 'mongoose';
import { USER_ROLE, USER_STATUS } from './user.constant';

export type TUser = {
  _id?: string;
  name: string;
  role: keyof typeof USER_ROLE;
  email: string;
  upVoteCount?: number;
  password: string;
  status: keyof typeof USER_STATUS;
  passwordChangedAt?: Date;
  followers: TUser[];
  following: TUser[];
  mobileNumber?: string;
  profilePhoto?: string;
  isVerified?: boolean;
  favoritesPosts?: Schema.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

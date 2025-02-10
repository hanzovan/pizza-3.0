import { Document } from "mongoose";
import { Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { ReactNode } from "react";

export type SvgProps = {
  className?: string;
  strokeWidth?: number;
};

export type SectionHeaderProps = {
  subHeader?: string;
  mainHeader: string;
};

export type CredentialType = {
  email: string;
  password: string;
};

export type UserType = Document & {
  name?: string;
  credentialAccount: boolean;
  email: string;
  password?: string;
  avatar?: string;
  phone?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  role?: string;
  isBlocked?: boolean;
  emailIsVerified?: boolean;
};

export type AuthUserType = {
  id: string;
  name?: string;
  credentialAccount: boolean;
  email: string;
  avatar?: string;
  phone?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  role?: string;
  isBlocked?: boolean;
  emailIsVerified?: boolean;
};

export type CustomUser = User & {
  role?: string;
  avatar?: string;
};

export type CustomAdapterUser = AdapterUser & {
  role?: string;
  avatar?: string;
};

export type CustomSessionUser = {
  id?: string | undefined;
  name?: string | null | undefined;
  email?: string | null;
  role?: string | undefined;
  avatar?: string | undefined;
};

export type JwtProps = {
  token: JWT;
  user: CustomUser | CustomAdapterUser | null;
};

export type SessionProps = {
  session: Session;
  token: JWT;
};

export type AppProviderProps = {
  children: ReactNode;
};

export type OAuthProfile = {
  id?: string;
  sub?: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  picture?: string;
  role?: string;
  isBlocked?: boolean;
  email_verified?: boolean;
  created_at?: string;
  updated_at?: string;
};

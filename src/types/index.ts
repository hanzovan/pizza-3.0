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
  trigger?: "signIn" | "signUp" | "update";
  session?: Session; 
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

export type UserFormProps = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  user: AuthUserType;
  setUser: React.Dispatch<React.SetStateAction<AuthUserType>>;
  isLoading: boolean;
}

export type CategoryType = {
  name: string;
  _id?: string;
}

export type ButtonNeedConfirmProps = {
  label: string;
  className: string;
  onProceed: React.MouseEventHandler<HTMLButtonElement>;
}

export type MenuItemType = {
  _id?: string | undefined;
  name: string | undefined;
  category: string | undefined;
  description: string | undefined;
  basePrice: number | undefined;
  image: string | undefined;
  sizes: { name: string; extraPrice: number}[];
  extraIngredients: { name: string; extraPrice: number}[];
}

export type MenuItemFormExtraFieldProps = {
  name: string;
  addLabel: string;
  fieldData: { name: string; extraPrice: number }[];
  updateFieldData: (newData: { name: string; extraPrice: number }[]) => void;
  formIsSubmiting: boolean;
}

export type MenuItemFormProps = {
  formIsSubmiting: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  menuItem: MenuItemType;
  setMenuItem: React.Dispatch<React.SetStateAction<MenuItemType>>;
}

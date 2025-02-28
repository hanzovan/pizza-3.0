import { UserModel } from "@/database/models";
import { AuthUserType, UserType } from "@/types";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const createUser = async (body: UserType) => {
  try {
    const email = body.email;
    const plainPassword = body.password;
    // look for user's info in the database
    const result = await UserModel.findOne({ email })
      .lean()
      .exec() as UserType | null;

    // get the name from email
    const name = email.split("@")[0];

    // if not found user, create new user
    if (!result) {
      if (!plainPassword) {
        return {
            isError: true,
            data: null,
            message: "Password is required to create credentials!"
        }
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(plainPassword, salt);
      const newUser = await UserModel.create({
        ...body,
        name,
        password: hashedPassword,
        credentialAccount: true
      });
      return {
        isError: false,
        data: newUser,
        message: "New user created successfully",
      };
    } else {
      return {
        isError: true,
        data: null,
        message: "User was already existed",
      };
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
        const validationErrors = Object.values(error.errors).map(err => err.message).join(", ");
        return {
            isError: true,
            data: null,
            message: validationErrors
        }
    }
    return {
        isError: true,
        data: null,
        message: error instanceof Error ? error.message : "An unknown error occurred"
    }
  }
};

const loginUser = async (email: string, passwordInput: string) => {
    try {
        const result = await UserModel.findOne({ email }).lean().exec() as UserType | null
        if (!result) {
            return {
                isError: true,
                data: null,
                message: "Invalid credentials!"
            }
        }

        if (!result.password) {
            return {
                isError: true,
                data: null,
                message: "This email was already registered with providers"
            }
        }

        const passwordMatched = bcrypt.compareSync(passwordInput, result.password)

        if (!passwordMatched) {
            return {
                isError: true,
                data: null,
                message: "Invalid credentials!"
            }
        }
        
        const {password: _, _id, ...otherUserInfo} = result as UserType & { _id: mongoose.Types.ObjectId}
        
        return {
            isError: false,
            data: { id: _id.toString(), ...otherUserInfo},
            message: "User existed!"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        }
    }
}

const findUser = async (filter: {_id?: string; email?: string}) => {
  try {
    const result = await UserModel.findOne(filter).lean().exec() as UserType | null;
    if (!result) {
      return {
        isError: true,
        data: null,
        message: 'User does not existed'
      }
    }
    const {password: _, _id, ...otherUserInfo} = result as UserType & { _id: mongoose.Types.ObjectId}

    return {
      isError: false,
      data: { id: _id.toString(), ...otherUserInfo },
      message: 'User finded!'
    }
  } catch (error) {
    return {
      isError: true,
      data: null,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    }
  }
}

const findAllUsers = async () => {
  try {
    // const results = await UserModel.find().select("-password");

    const results = await UserModel.find().lean().exec();

    if (!results || results.length === 0) {
      return {
        isError: true,
        data: null,
        message: "No users found"
      }
    }
    // convert _id to string for each user and return user info
    const sanitizedUsers = results.map(user => {
      const { password: _, _id, ...otherUserInfo } = user as unknown as UserType & { _id: mongoose.Types.ObjectId}
      return { id: _id.toString(), ...otherUserInfo}
    })

    return {
      isError: false,
      data: sanitizedUsers,
      message: "Users retrieved successfully"
    }
  } catch (error) {
    return {
      isError: true,
      data: null,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

const updateUser = async (userInfo: AuthUserType) => {
  try {
    const {email, ...otherUserInfo} = userInfo
    const result = await UserModel.findOneAndUpdate({ email }, otherUserInfo, {upsert: true})
    return {
      isError: false,
      data: result,
      message: 'User updated'
    }
  } catch (error) {
    return {
      isError: true,
      data: null,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    }
  }
}

const UserService = { createUser, loginUser, findUser, findAllUsers, updateUser };

export { UserService };

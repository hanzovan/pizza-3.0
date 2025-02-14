import { CategoryModel } from "@/database/models";
import { CategoryType } from "@/types";

const createCategory = async (body: CategoryType) => {
    try {
        const name = body.name;
        const newCategory = await CategoryModel.create({ name })

        return {
            isError: false,
            data: newCategory,
            message: "Create new category successfully"
        }
    } catch (error) {
        console.log(error);
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        }
    }
}

const findOneCategory = async (_id: string) => {
    try {
        const category = await CategoryModel.findOne({_id})
        return {
            isError: false,
            data: category,
            message: "Category founded!"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

const findAllCategories = async () => {
    try {
        const allCategories = await CategoryModel.find()

        return {
            isError: false,
            data: allCategories,
            message: "Find All Categories successfully"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        }
    }
}

const updateCategory = async (_id: string, newName: string) => {
    try {
        console.log(_id)
        console.log(newName)
        const updatedCategory = await CategoryModel.updateOne({_id}, {name: newName});
        return {
            isError: false,
            data: updatedCategory,
            message: "Updated category successfully"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

const deleteCategory = async (_id: string) => {
    try {
        await CategoryModel.deleteOne({_id});
        return {
            isError: false,
            data: null,
            message: "Category deleted successfully"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

const CategoryService = { createCategory, findAllCategories, findOneCategory, updateCategory, deleteCategory };

export { CategoryService };
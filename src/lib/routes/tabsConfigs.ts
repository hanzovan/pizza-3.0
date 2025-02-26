import { routes } from "./routes";

const userTabs = [
    routes.profile,
    routes.orders
]

const adminTabs = [
    routes.profile,
    routes.categories,
    routes.menu_item,
    routes.users,
    routes.orders,
]

const allTabs = { userTabs, adminTabs }

export { allTabs };
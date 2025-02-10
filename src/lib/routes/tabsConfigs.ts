import { routes } from "./routes";

const userTabs = [
    routes.profile,
    routes.my_orders
]

const adminTabs = [
    routes.profile,
    routes.categories,
    routes.menu_item,
    routes.users,
    routes.all_orders,
    routes.my_orders
]

const allTabs = { userTabs, adminTabs }

export { allTabs };
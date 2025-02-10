import { routes } from "./routes";

// mobile items
const publicMobileItems = [
    routes.login,
    routes.home,
    routes.menu,
    routes.about,
    routes.contact,
    routes.register,
]

const userMobileItems = [
    routes.profile,
    routes.home,
    routes.menu,
    routes.about,
    routes.contact,
    routes.logout
]

const adminMobileItems = [
    routes.profile,
    routes.home,
    routes.menu,
    routes.about,
    routes.contact,
    routes.logout
]

// larger screen items
const publicNavigatingItems = [
    routes.home,
    routes.menu,
    routes.about,
    routes.contact,
]

const userNavigatingItems = [
    routes.home,
    routes.menu,
    routes.about,
    routes.contact
]

const adminNavigatingItems = [
    routes.home,
    routes.menu,
    routes.about,
    routes.contact
]

const publicSettingItems = [
    routes.register,
    routes.login
]

const userSettingItems = [
    routes.profile,
    routes.logout
]

const adminSettingItems = [
    routes.profile,
    routes.logout
]


const mobileItems = {publicMobileItems, userMobileItems, adminMobileItems}
const navigatingItems = {publicNavigatingItems, userNavigatingItems, adminNavigatingItems}
const settingItems = {publicSettingItems, userSettingItems, adminSettingItems}

export { mobileItems, navigatingItems, settingItems };
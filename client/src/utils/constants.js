export const INNER_COMPONENTS = {
    HOME: 'home',
    DASHBOARD: 'dashboard',
    ABOUT: 'about',
    USERS_TABLE: 'users_table',
    EMPLOYEES_TABLE: 'employees_table',
    PRODUCTS_TABLE: 'products_table',
    PRODUCTS_VIEW: 'products_cards_view',
    CONTACT_US: 'contact_us',
    CONTACT_MESSAGES: 'contact_messages',
    CHAT: 'chat',
    PROFILE: 'profile'
};

export const USER_ROLE = {
    EMPLOYEE: 'Employee',
    ADMIN: 'Admin',
    CUSTOMER: 'customer'
};

export const MESSAGE_STATUS = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    FINISH: 'Finish'
};

export const PRODUCTS_KEY = 'product-list';

export const FLOORS = [];
for (let i = 0; i < 11; ++i) {
    FLOORS.push(i);
};
FLOORS.push('Above...')

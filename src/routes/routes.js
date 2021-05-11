import DashboardLayout from '../layout/DashboardLayout.vue'
import HomeLayout from '../layout/HomeLayout.vue'
// GeneralViews
import NotFound from '../admin/NotFoundPage.vue'
// Web page 
import Home from 'src/pages/Home.vue'
import Shop from 'src/pages/Shop.vue'
import Contact from 'src/pages/Contact.vue'
import About from 'src/pages/About.vue'
import ViewCart from 'src/pages/ViewCart.vue'

//CUSTOMER
import Register from 'src/pages/Register'
import Logincustomer from 'src/pages/Logincustomer.vue'

import Registration from 'src/client/Registration.vue'

// Admin pages
import Overview from 'src/admin/Overview.vue'
import UserProfile from 'src/admin/UserProfile.vue'
import ProductList from '../admin/ProductList.vue'
import Category from 'src/admin/Category.vue'
import Bill from 'src/admin/Bill.vue'
import Suppliers from 'src/admin/Suppliers.vue'
import Users from 'src/admin/Users.vue'
import Notifications from 'src/admin/Notifications.vue'
import Login from 'src/admin/Login.vue'



const routes = [{
        path: '/login',
        component: Login,
        // redirect: '/admin',
    },
    {
        path: '/',
        component: HomeLayout,
        redirect: '/home',
        meta: {
            isAuthen: true,
        },
        children: [{
            path: 'home',
            name: 'home',
            component: Home
        }, ]
    },
    {
        path: '/shop',
        name: 'shop',
        component: Shop
    },
    {
        path: '/registercustomer',
        name: 'register',
        component: Register
    },
    {
        path: '/logincustomer',
        name: 'logincustomer',
        component: Logincustomer
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact
    },
    {
        path: '/viewcart',
        name: 'viewcart',
        component: ViewCart
    },
    {
        path: '/admin',
        component: DashboardLayout,
        // redirect: '/admin/overview',
        beforeEnter: (to, from, next) => {
            const auth = localStorage.getItem("auth");
            if (!auth) {
                next('/login');
            } else {
                next();
            }
        },
        children: [{
                path: 'overview',
                name: 'Overview',
                component: Overview
            },
            {
                path: 'user',
                name: 'User',
                component: UserProfile
            },
            {
                path: 'product-list',
                name: 'Product List',
                component: ProductList
            },
            {
                path: 'bill',
                name: 'Bill',
                component: Bill
            },
            {
                path: 'category',
                name: 'Category',
                component: Category
            },
            {
                path: 'suppliers',
                name: 'Suppliers',
                component: Suppliers
            },
            {
                path: 'users',
                name: 'Users',
                component: Users
            },
            {
                path: 'notifications',
                name: 'Notifications',
                component: Notifications
            }
        ]
    },
    { path: '*', component: NotFound }

]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
//  *  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
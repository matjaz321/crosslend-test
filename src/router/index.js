import Vue from 'vue'
import VueRouter from 'vue-router'

import Welcome from '../screens/Welcome.vue'
import Documents from '../screens/Documents.vue'
import Page from '../screens/Page.vue'
import Contacts from '../screens/Contacts.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome
    },
    {
        path: '/documents',
        name: 'Documents',
        component: Documents
    },
    {
        path: '/page',
        name: 'Page',
        component: Page
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: Contacts
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

router.replace('/documents')

export default router

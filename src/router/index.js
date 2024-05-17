import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CheckoutView from "@/views/CheckoutView.vue";
import NewUserView from "@/views/NewAccountView.vue";
import ErrorView from "@/views/ErrorView.vue";
import MainEventView from "@/views/MainEventView.vue";
import FeatureCategoryView from "@/views/FeatureCategoryView.vue";
import EventDetailView from "@/views/EventDetailView.vue";
import EventsView from "@/views/EventsView.vue";
import EventTicketTypeView from "@/views/EventTicketTypeView.vue";
import EventTicketView from "@/views/EventTicketView.vue";

const routes = [
    {
        path: '/',
        name: 'homeRoute',
        component: HomeView
    },
    {
        path: '/checkout',
        name: 'checkoutRoute',
        component: CheckoutView
    },
    {
        path: '/new-user',
        name: 'newUserRoute',
        component: NewUserView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },
    {
        path: '/main-event',
        name: 'mainEventRoute',
        component: MainEventView
    },
    {
        path: '/feature-category',
        name: 'featureCategoryRoute',
        component: FeatureCategoryView
    },
    {
        path: '/events',
        name: 'eventsRoute',
        component: EventsView
    },
    {
        path: '/event-details',
        name: 'eventDetailRoute',
        component: EventDetailView
    },
    {
        path: '/event-ticket-type',
        name: 'eventTicketTypeRoute',
        component: EventTicketTypeView
    },
    {
        path: '/event-tickets',
        name: 'eventTicketRoute',
        component: EventTicketView
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

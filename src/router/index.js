import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CheckoutView from "@/views/CheckoutView.vue";
import NewUserView from "@/views/newaccount/NewAccountView.vue";
import ErrorView from "@/views/ErrorView.vue";
import MainEventView from "@/views/event/MainEventView.vue";
import FeatureCategoryView from "@/views/event/FeatureCategoryView.vue";
import EventDetailView from "@/views/event/EventDetailView.vue";
import EventsView from "@/views/event/EventsView.vue";
import EventTicketTypeView from "@/views/event/EventTicketTypeView.vue";
import EventTicketView from "@/views/event/EventTicketView.vue";
import EventView from "@/views/event/EventView.vue";

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
    {
        path: '/event',
        name: 'eventRoute',
        component: EventView
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

import { createStore } from 'vuex'

let basket = localStorage.getItem('basket');
let isLoggedIn = localStorage.getItem('nippy.token')
const store = createStore({
    state(){
        return {
            longitude: '',
            latitude: '',
            message: null,
            success: null,
            basket: basket ? JSON.parse(basket) : [],
            provider: null,
            overlay: false,
            isLoggedIn: isLoggedIn ? true : false,
        }
    },

    mutations: {
        store_location(state, payload) {
            state.latitude = payload.lat
            state.longitude = payload.long
        },
        add_alerts(state, payload){
            state.message = payload.msg
            state.success = payload.succ

            this.commit('clear_alerts');
        },
        clear_alerts(state){
            setTimeout(() => {
                state.message = null;
                state.success = null;
            }, 10000)
        },
        add_menu(state, payload){
            let found = state.basket.find(item => item.id == payload.menu.id);

            if (found) {
                found.quantity = payload.quantity;
            } else {
                payload.menu.quantity = payload.quantity
                payload.menu.provider = state.provider
                state.basket.push(payload.menu)
            }      
            this.commit('SAVE_menu');
        },
        SAVE_menu(state){
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        REMOVE_menu(state, menu) {
            let index = state.basket.indexOf(menu);
        
            state.basket.splice(index, 1);
    
            this.commit('SAVE_menu');
        },
        fetch_provider(state, provider){
            state.provider = provider
        },
        activate_overlay(state,overlay){
            state.overlay = overlay
        },
        login(payload){
            localStorage.setItem('nippy.user', payload.user)
            localStorage.setItem('nippy.token', payload.token)
        },
        logout(){
            localStorage.removeItem('nippy.user')
            localStorage.removeItem('nippy.token')
        }
    },

    getters:{
        longitude: state=> {
            return state.longitude;
        },
        latitude: state=> {
            return state.latitude;
        },
        message: state => {
            return state.message;
        },
        success: state => {
            return state.success;
        },
        basket: state => {
            return state.basket;
        },
        provider: state => {
            return state.provider
        },
        overlay: state => {
            return state.overlay
        }        ,
        isLoggedIn: state =>{
            return state.isLoggedIn
        }
    }

})

export default store

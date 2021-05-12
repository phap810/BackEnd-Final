import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
        state: {
            //admin
            status: '',
            token: localStorage.getItem('token') || '',
            username: {},
            //customer
            login:[],
            customer:[],
            customer_id: localStorage.getItem('id') || '',
        },
        getters: {
            isLoggedIn: state => !!state.token,
            authStatus: state => state.status,
        },
        actions: {
            login({ commit }, username) {
                return new Promise((resolve, reject) => {
                    commit('auth_request')
                    axios({ url: 'http://127.0.0.1:8000/api/login', data: username, method: 'POST' })
                        .then(resp => {
                            // if (resp.data.code == 500) {
                            //     alert(resp.data.message);
                            // } else {
                                alert("Đăng nhập thành công")
                                resp.data.data.map((resItem) => {
                                    console.log(resItem);
                                    localStorage.setItem('auth', JSON.stringify(resItem));
                                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + resItem.token
                                })
                            //}
                            console.log(resp.data.data[0].token, "TOKEN");
                            commit('auth_success', resp.data.data[0].token, username)
                            resolve(resp)
                        })
                        .catch(err => {
                            alert("Tài khoản hoặc mật khẩu không đúng!");
                            commit('auth_error')
                            localStorage.removeItem('auth')
                            reject(err)
                        })
                })
            },
            logincustomer({ commit }, login) {
                return new Promise((resolve, reject) => {
                    // commit('auth_request')
                    axios({ url: 'http://127.0.0.1:8000/api/login-customer', data: login, method: 'POST' })
                        .then(resp => {
                            if (resp.data.code == "500") {
                                alert("Tài khoản hoặc mật khẩu không đúng!");
                            } else {
                                alert("Đăng nhập thành công")
                                resp.data.data.map((resItem) => {
                                    localStorage.setItem('customer', JSON.stringify(resItem));
                                    // axios.defaults.headers.common.Authorization ="Authorization: customer_id="+resItem.id;
                                })
                            }
                            resolve(resp)
                        })
                        .catch(err => {
                            // commit('auth_error')
                            localStorage.removeItem('customer')
                            reject(err)
                        })
                })
            },
            register({ commit }, user) {
                return new Promise((resolve, reject) => {
                    commit('auth_request')
                    axios({ url: 'http://127.0.0.1:8000/auth/register/', data: user, method: 'POST' })
                        .then(resp => {
                            const { status_code, ...infor } = resp.data;
                            const info = {};
                            let token = JSON.parse(window.localStorage.getItem('auth'))
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.object.token
                            commit('auth_success', token.object.token, resp.data.username)
                            resolve(resp)
                        })
                        .catch(err => {
                            commit('auth_error', err)
                            reject(err)
                        })
                })
            },
            logout({ commit }) {
                return new Promise((resolve, reject) => {
                    commit('logout')
                    localStorage.removeItem('auth')
                    delete axios.defaults.headers.common['Authorization']
                    resolve()
                })
            },
            logoutcustomer({ commit }) {
                return new Promise((resolve, reject) => {
                    commit('logoutcustomer')
                    localStorage.removeItem('customer')
                    resolve()
                })
            },
        },
        mutations: {
            setFoodItemsById(state, items) {
                state.orderFood.push(items);
            },
            setFoodItems(state, items) {
                state.foodItems = items;
                console.log(state.foodItems);
            },
            auth_request(state) {
                state.status = 'loading'
                console.log(status);
            },
            auth_success(state, token, username) {
                state.status = 'success'
                state.token = token
                state.username = username
            },
            auth_error(state) {
                state.status = 'error'
            },
            logout(state) {
                state.status = ''
                state.token = ''
            },
        },
    })
export default store
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
        state: {
            // orderFood: [{
            //     id: null,
            //     count: 0,
            //     name: ''
            // }],
            // foodItems: [],
            status: '',
            token: localStorage.getItem('token') || '',
            username: {},
            auth:[],
            // admin: "",
            // superuser: "",
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
                            console.log(resp.data.code)
                            if (resp.data.code == "100") {
                                alert("Tài khoản hoặc mật khẩu không đúng!");
                            } else {
                                alert("Đăng nhập thành công")
                                console.log(resp.data.error)
                                console.log(resp.data.data, "dATA");
                                resp.data.data.map((resItem) => {
                                    console.log(resItem);
                                    localStorage.setItem('auth', JSON.stringify(resItem));
                                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + resItem.token
                                })
                            }
                            console.log(resp.data.token, "TOKEN");
                            commit('auth_success', resp.data.data[0].token, username)
                            resolve(resp)
                        })
                        .catch(err => {
                            commit('auth_error')
                            localStorage.removeItem('auth')
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
                    this.auth = {};
                    this.saveCats();
                    //localStorage.removeItem('auth')
                    //delete axios.defaults.headers.common['Authorization']
                    //resolve()
                })
            },
              saveCats() {
                const parsed = JSON.stringify(this.auth);
                localStorage.setItem("auth", parsed);
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
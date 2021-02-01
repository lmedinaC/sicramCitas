const axios = require('axios')

const state = {
    user: null, //TOKEN Y ID DEL USUARIO
    tipoUser: null,
    today : new Date(), //DÍA ACTUAL
    milisegundosinWeek : 604800000  // Tiempo en milisegundos de una seman
    
};

const getters = {
    //CONSEGUIR ID Y TOKEN DEL USUARIO
    getUsuario(state){
        return state.user
    },
    
    
    //CONSEGUIR TIPO DE USUARIO 
    getTipoUsuario(state){
        return state.tipoUser
    }
};

const mutations = {
    //PONE AL USUARIO
    setUsuario(state,payload){
        state.user = payload
    },
    
    //PONER TIPO DE USUARIO
    setTipoUsuario(state,payload){
        state.tipoUser = payload
    }
};

const actions = {
    //INICIAR SESION DOCTOR 
    loginDoctor({commit,dispatch},doctor){
        return axios
        .post("/signindoctor",{
          ...doctor
        })
        .then((res)=>{
            dispatch('guardarUsuario',res.data);
            dispatch('guardarTipoDeUsuario','doctor');
            console.log("DOCTOR: ",res.data)
            dispatch('perfilDoctor', res.data , { root: true })
            return Promise.resolve(true)
        })

        .catch((e)=>{
            console.log(e)
            return Promise.resolve(false)
        })
    },

    //INICIAR SESION ORGANIZACION
    loginOrganizacion({commit,dispatch },organizacion){
        
        return axios 
        .post("/signinorganizacion",{
          ...organizacion
        })
        .then((res)=>{
            console.log("ORGANIZACION : ",res.data)
            dispatch('guardarTipoDeUsuario','organizacion');
            dispatch('guardarUsuario',res.data);
            dispatch('perfilOrganizacion', res.data , { root: true })
            
            return Promise.resolve(true)
        })

        .catch((e)=>{
            console.log(e)
            return Promise.resolve(false)
        })
       
    },

    //INICIAR SESION PACIENTE
    loginPaciente({commit,dispatch },paciente){
        return axios
        .post("/signinuser",{
          ...paciente
        })
        .then((res)=>{
            dispatch('guardarUsuario',res.data);
            dispatch('guardarTipoDeUsuario','paciente');
            dispatch('perfilPaciente', res.data , { root: true })
            console.log("PACIENTE : ",res.data)
            
            return Promise.resolve(true)
        })

        .catch((e)=>{
            console.log(e)
            return Promise.resolve(false)
        })
    },

    //GUARDAR EL ROL DE USUARIO
    guardarTipoDeUsuario({commit},payload){
        localStorage.setItem('tipoUser',payload)
        commit('setTipoUsuario',payload)
    },

    //GUADAR USUARIO EN EL LOCALSTORAGE
    guardarUsuario({commit},payload){
        localStorage.setItem('day',Date())
        localStorage.setItem('user',JSON.stringify(payload))
        commit('setUsuario',payload)
    },

    //VER SI USUARIO SE ENCUENTRA LOGEADO
    leerUsuario({commit,dispatch}){ 
        const user = JSON.parse(localStorage.getItem('user'))
        const day = new Date(localStorage.getItem('day') ); 
        const tipoUser =  localStorage.getItem('tipoUser')
        const difDay = (state.today.getTime()-day.getTime())/ state.milisegundosinWeek
        console.log(difDay)
        
        if(user){
            if(difDay <=1){
                dispatch('guardarUsuario',user)
                dispatch('guardarTipoDeUsuario',tipoUser)
                switch(tipoUser){
                    case 'paciente' : dispatch('perfilPaciente', user , { root: true }); break;
                    case 'doctor':  dispatch('perfilDoctor', user , { root: true });break;
                    case 'organizacion':  dispatch('perfilOrganizacion', user , { root: true });break;
                }
            }else{ //EL TOKEN YA NO SIRVE PORQUE PASÓ UNA SEMANA.
                dispatch('cerrarSesion')
            }
        }else{
            commit('setUsuario',null)
            commit('setTipoUsuario',null)
        }
        
    },

    //CERRAR SESION DEL USUARIO 
    cerrarSesion({commit}){
        localStorage.removeItem('user')
        localStorage.removeItem('tipoUser')
        commit('setUsuario',null)
        commit('setTipoUsuario',null)
        window.location.assign("/");
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
}
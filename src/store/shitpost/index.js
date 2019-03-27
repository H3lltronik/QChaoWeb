/* eslint-disable */
import axios from 'axios'
import router from '../../router'

export default({
    state: {
        publicaciones: []
    },
    mutations: {
        setPublicaciones (state, payload) {
            let auxPublicaciones = payload
            let urlBase = payload.urlBase
            // Completar url de las imagenes del shitpost
            auxPublicaciones.forEach(element => {
                element.imagen = urlBase + 'media/shitpost/' + element.imagen
            });
            // Hacer url de las imagenes del perfil de quien publico
            auxPublicaciones.forEach(element => {
                element.perfilImagen = urlBase + 'media/usuarios/' + element.idUsuario + '.jpg'
            });
            console.log("Publicaciones", auxPublicaciones)
            state.publicaciones = auxPublicaciones
        },
        addPublicacion (state, publicacion) {
            state.publicaciones.push(publicacion)
        },
        setComentario (state, comentario) {
            let publicacion = state.publicaciones.find(auxFind => {
                return auxFind.idShitpost == comentario.idShitpost
            })
            publicacion.comentarios.push(comentario)
        },
        añadirLike (state, idShitpost) {
            let publicacion = state.publicaciones.find(auxFind => {
                return auxFind.idShitpost == idShitpost
            })
            publicacion.likes++;
        },
        removerLike (state, idShitpost) {
            let publicacion = state.publicaciones.find(auxFind => {
                return auxFind.idShitpost == idShitpost
            })
            publicacion.likes--;
        }
    },
    actions: {
        loadShitpost ({commit, getters}) {
            axios.post('http://localhost/QChao/conexiones/contenido/shitpost/getAllShitpost.php').then(response => {
                let contenidos = response.data.contenido
                contenidos.urlBase = getters.urlBase
                console.log("Contenidos", contenidos)
                commit('setPublicaciones', contenidos)
            })
        },
        comentar ({commit}, comentario) {
            let formData = new FormData ()
            formData.set('idUsuario', comentario.idUsuario)
            formData.set('idShitpost', comentario.idShitpost)
            formData.set('comentario', comentario.comentario)
            axios.post('http://localhost/Qchao/conexiones/contenido/shitpost/comentar.php', formData).then(response => {
                if (response.data.status == 'OK') {
                    alert ('Comentario añadido')
                        commit('setComentario', comentario)
                }
                else 
                    alert (response.data.response)
            }).catch(error => {

            })
        },
        indicarLike ({commit}, publicacion) {
            let formData = new FormData ()
            formData.set('idUsuario', publicacion.idUsuario)
            formData.set('idShitpost', publicacion.idShitpost)

            axios.post('http://localhost/Qchao/conexiones/contenido/shitpost/meGusta.php', formData).then(response => {
                let data = response.data
                if (data.status.includes('OK')) {
                    if (data.add) {
                        commit('añadirLike', publicacion.idShitpost)
                    } else {
                        commit('removerLike', publicacion.idShitpost)
                    }
                } else {
                    alert(data.status)
                }
            }).catch(error => {

            })
        },
        publicarShitpost ({commit}, publicacion) {
            let formData = new FormData();
            formData.append('idUsuario', publicacion.idUsuario);
            formData.append('descripcion', publicacion.descripcion);
            formData.append('tags', JSON.stringify(publicacion.tags));
            formData.append('file', publicacion.file);
            axios.post('http://localhost/Qchao/conexiones/contenido/shitpost/nuevoShitpost.php',
                formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(response => {
                let data = response.data
                let newPublicacion = {
                    comentarios: [],
                    descripcion: publicacion.descripcion,
                    fecha: data.fecha,
                    idShitpost: data.idShitpost,
                    idUsuario: publicacion.idUsuario,
                    imagen: 'http://localhost/QChao/media/shitpost/' + data.fichero,
                    likes: 0,
                    nombre: publicacion.nombreUsuario,
                    perfilImagen: 'http://192.168.0.85/QChao/media/usuarios/' + publicacion.idUsuario + '.jpg',
                    tipo: data.tipo,
                }
                commit('addPublicacion', newPublicacion)
                console.log("Subido xd", response.data)
                console.log("Nueva publicacion", newPublicacion)
            }).catch(function(){
                console.log('FAILURE!!');
            });
        }
    },
    getters: {
        getShitpost (state) {
            return state.publicaciones.reverse()
        }
    }
})

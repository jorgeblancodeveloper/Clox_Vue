Vue.filter('time', function(value) {
    let minutes = parseInt(Math.floor((value) / 60));
    let seconds = parseInt((value - ((minutes * 60))) % 60);
    let dMins = minutes;
    let dSecs = (seconds > 9 ? seconds : '0' + seconds);
    return dMins + ":" + dSecs;
});

Vue.component('mimodal', {
    data: function() {
        return {
            mitexto: "Sesion..."
        }
    },
    props: ['msj','alert'],
    template: '<div class="modal"> <main> <h2>{{msj}}</h2><input v-model="mitexto" v-if="alert==0" type="text" ref="title">  <div class="botonera"> <div><button @click="send()">Confirmar</button> </div></div></main></div>',
    methods: {
        send: function() {
            this.$emit('recibido', this.mitexto)
        }
    }
})

var vm = new Vue({
    el: '#app',
    data: {
        reset:0,
        a: {
            backup: "",
            act_time: 240,
            act_rounds: 4,
            act_desc: 60,
            act_preaviso: 1,
            act_preaviso_text: ["asalto", "descanso", "asalto y descanso", "nada"],
            act_idioma_text: ["Español", "Catalan", "ingles"],
            panel_text: ["", "Opciones", "Sonidos", "Sesiones", "Trainer", "Combate"],
            act_sonidos_text: ["sirena", "campana", "dong", "buzzer", "slap", "timbre"],
            sonido_asaltos: 1,
            sonido_descanso: 0,
            sonido_preaviso: 2,
            sonido_fin: 3,
            click: "mp3/click.mp3",
            fail: "mp3/fail.mp3",
            act_idioma: 0,
            act_theme_text: ["black", "color", "white"],
            running_text: ["", "BOX", "REST", "PAUSE", "...", "FIN"],
            sonidos_mp3: ["mp3/sirena.mp3", "mp3/campana.mp3", "mp3/dong.mp3", "mp3/buzzer.mp3", "mp3/slap.mp3", "mp3/timbre.mp3"],
            act_theme: 1,
            sesiontitle: "",
            sesionName: "Nombre sesion",
            rounds: 0,
            segundos: 60,
            minutos: 2,
            running: 0,
            sts_panel: 0,

            sesiones: [{
                    nombre: "combate",
                    rounds: 1,
                    time: 240,
                    desc: 60,
                    preaviso: 0
                },
                {
                    nombre: "calentamiento",
                    rounds: 2,
                    time: 180,
                    desc: 60,
                    preaviso: 0
                },
                {
                    nombre: "entrenamiento",
                    rounds: 3,
                    time: 180,
                    desc: 60,
                    preaviso: 0
                }
            ],
        }
    },

    created: function() {
        var myself = this;
        window.addEventListener('beforeunload', function() {
        if (this.reset==0){
            myself.saveall();}
        }, false);
        if (localStorage.backup) {
            this.a = JSON.parse(localStorage.backup);
        }
    },

    methods: {
        reset: function() {
          localStorage.clear();
          reset=1;
          location.reload();
        },
        saveall: function() {
            this.a.running = 0;
            this.a.sts_panel = 0;
            this.a.backup = JSON.stringify(this.a);
            localStorage.backup = this.a.backup;
        },
        playSound(sound) {
            if (sound) {
                var audio = new Audio(sound);
                audio.play();
            }
        },
        pause: function(desc) {
            if (this.a.running == 3) {
                this.go();
            } else if (this.a.running == 1) {
                this.a.running = 3;
                clearInterval(this.a.crono);
            } else if (this.a.running == 2) {
                this.a.running = 3;
                clearInterval(this.a.descrono);
            } else if (this.a.running == 4) {
                this.a.running = 3;
                clearInterval(this.a.crono);
            }
        },
        resume: function() {
            this.go();
        },
        kill: function() {
            this.a.running = 0;
            clearInterval(this.a.crono);
            clearInterval(this.a.descrono);
        },
        start: function() {
            this.a.rounds = this.a.act_rounds;
            this.a.minutos = this.a.act_time;
            this.go();
        },
        back: function(){
            if (this.a.sts_panel < 5){
                this.a.sts_panel = 0;
            } else {
                this.kill();
                this.a.sts_panel = 0;
            }
        },
        go: function(desc) {
            this.a.sts_panel=5;
            const myself = this.a;
            const my = this;
            this.playSound(this.a.sonidos_mp3[myself.sonido_asaltos]);
            asalto();
            function asalto() {         
                my.a.crono = setInterval(
                    function() {
                        my.a.running = 1;
                        my.a.minutos--;
                        if (my.a.minutos == 0) {
                            clearInterval(my.a.crono);
                            if (my.a.rounds > 1) {
                                my.a.minutos = my.a.act_desc;
                                descanso();
                            } else {
                                my.a.running = 5;
                            }
                        }

                        function descanso() {
                        my.playSound(myself.sonidos_mp3[myself.sonido_descanso]);
                            my.a.running = 2;
                            my.a.descrono = setInterval(
                                function() {
                                    my.a.minutos--;
                                    if (my.a.minutos < 0) {
                                        clearInterval(my.a.descrono);
                                        if (my.a.rounds > 0) {
                                            my.a.minutos = my.a.act_time;
                                            my.a.rounds--;
                                            asalto();
                                        } else {
                                             my.playSound(my.a.sonidos_mp3[my.a.sonido_fin]);
                                        }
                                    }

                                }, 100);
                        }
                    }, 100);
            }


        },
        add: function(variable, valor) {
            this.playSound(this.a.click);
            if (valor == undefined) valor = 1;
            if (this.a[variable + "_text"]) {
                if (this.a[variable] > this.a[variable + "_text"].length) {
                    this.a[variable] = 0;
                    return
                }
            }
            this.a[variable] += valor * 1;
        },
        sub: function(variable, valor) {
            this.playSound(this.a.click);
            if (valor == undefined) valor = 1;
            if (this.a[variable + "_text"]) {
                if (this.a[variable] == 0) {
                    this.a[variable] = this.a[variable + "_text"].length - 1;
                    return
                }
            }
            this.a[variable] -= (1 * valor) * (this.a[variable] > 0);
        },
        setSesion(sesion) {
            this.a.act_rounds = sesion.rounds;
            this.a.act_time = sesion.time;
            this.a.act_desc = sesion.desc;
            this.a.act_preaviso = sesion.preaviso;

        },
        deleteSesion(event, item) {
            event.target.parentElement.className += " delete";
            const todoIndex = this.a.sesiones.indexOf(item);
            var missesiones = this.a.sesiones;
            setTimeout(function() {
                missesiones.splice(todoIndex, 1);
            }, 800);
        },
        close(datos) {
            var newitem = {
                nombre: datos,
                rounds: this.a.act_rounds,
                time: this.a.act_time,
                desc: this.a.act_desc,
                preaviso: this.a.act_preaviso
            }
            this.a.sesiones.push(newitem);
            this.a.sesiontitle = "";
        },
        addSesion() {
            if ( document.querySelector(".botonera .activa")){
            this.a.sesiontitle = "¿Nombre de la sesion?";
        } else { 
            this.a.sesiontitle = "vetalamierda";
        }
        }
    }
})
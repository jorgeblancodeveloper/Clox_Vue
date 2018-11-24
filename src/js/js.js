var vm = new Vue({
    el: '#app',
    data: {
        act_time: 4,
        act_rounds: 4,
        act_desc: 1,
        act_preaviso: 1,
        act_preaviso_text: ["asalto", "descanso", "asalto y descanso", "nada"],
        act_idioma_text: ["Español", "Catalan", "ingles"],
        act_sonidos_text: ["sirena", "campana", "dong", "buzzer", "slap", "timbre"],
        sonido_asaltos: 1,
        sonido_descanso: 0,
        sonido_preaviso: 2,
        sonido_fin: 3,
        act_idioma: 0,
        act_theme_text: ["black", "color", "white"],
        act_theme: 1,
        sesionName: "nombre",
        segundos: 60,
        minutos: 2,
        sesiones: [{
                nombre: "combate",
                rounds: 1,
                time: 3,
                desc: 60,
                preaviso: 0
            },
            {
                nombre: "calentamiento",
                rounds: 2,
                time: 2,
                desc: 60,
                preaviso: 0
            },
            {
                nombre: "entrenamiento",
                rounds: 3,
                time: 1,
                desc: 60,
                preaviso: 0
            }
        ],
      running: false

    },
    methods: {
        pause: function() {
            this.running=false;
            clearInterval(this.crono);
             this.segundos=60;
        },
        go: function() {
            const myself = this;
            this.running=true;
             myself.crono = setInterval(
                function() {
                    myself.segundos--;
                }, 1000);
        },
        add: function(variable) {
            if (this[variable + "_text"]) {
                if (this[variable] > this[variable + "_text"].length) {
                    this[variable] = 0;
                    return
                }
            }
            this[variable]++;
        },
        sub: function(variable) {
            if (this[variable + "_text"]) {
                if (this[variable] == 0) {
                    this[variable] = this[variable + "_text"].length - 1;
                    return
                }
            }
            this[variable] -= 1 * (this[variable] > 0);
        },
        deleteSesion(sesion) {
            const todoIndex = this.sesiones.indexOf(sesion);
            this.sesiones.splice(todoIndex, 1);
        },
        addSesion() {
            var newitem = {
                nombre: this.sesionName,
                rounds: this.act_rounds,
                time: this.act_time,
                desc: this.act_desc,
                preaviso: this.act_preaviso
            }
            this.sesiones.push(newitem);
            console.log(this.sesiones);
        }
    }
})

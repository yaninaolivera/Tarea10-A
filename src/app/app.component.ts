import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent {
  fecha: string;

  constructor(private datePipe: DatePipe) {
    const fechaFormateada = this.datePipe.transform(new Date(), 'EEEE MMMM d, Y');
    this.fecha = fechaFormateada ? fechaFormateada : '';
  }

  categoria = {nombre: "Groceries", icono: "fa fa-shopping-cart", color: "text-white"}
  moneda = "S/";
  numero_anterior = "";
  operando = "";
  numero_actual = "0";
  icono_resultado = "fa fa-check";

  ngOnInit() {
    document.addEventListener('keydown', event => {
      if ('0123456789'.indexOf(event.key) !== -1) {
        this.numero(event.key);
      }else if (event.key === '*') {
        this.operador("×");
      }else if (event.key === '/') {
        this.operador("÷");
      }else if (event.key === '+') {
        this.operador("+");
      }else if (event.key === '-') {
        this.operador("–");
      }else if (event.key === 'Backspace') {
        this.operacion("delete");
      }else if (event.key === 'Enter') {
        this.operacion("check");
      }else if (event.key === '.') {
        this.operacion("punto");
      }
    });
  }

  operador(signo:string){
    this.operacion("check");
    this.operando = signo;
    if(this.numero_anterior === ""){
      this.numero_anterior = this.numero_actual;
      this.numero_actual = "";
    }
    this.icono_resultado = "fa fa-equals";
  }
  numero(numero:string){
    if(this.operando === ""){
      this.numero_anterior = "";
      this.icono_resultado = "fa fa-check";
    }
    if(this.numero_actual === "0"){
      this.numero_actual = numero
    }else{
      this.numero_actual += numero
    }
  }
  operacion(tipo:string){
    if(tipo === "delete"){
      if (this.numero_actual === "") {
        if (this.operando !== "") {
          this.operando = ""
        }
      }
      if(this.numero_actual !== ""){
        this.numero_actual = this.numero_actual.substring(0, this.numero_actual.length - 1);
      }
      if (this.operando === "" && this.numero_anterior !== "") {
        this.numero_actual = this.numero_anterior;
        this.numero_anterior = ""
      }
    }
    if(tipo === "clear"){
      this.numero_anterior = "";
      this.operando = "";
      this.numero_actual = "0";
    }
    if(tipo === "check"){
      if(this.operando !== ""){
        if(this.numero_anterior === ""){
          this.numero_anterior = "0";
        }
        if(this.numero_actual === ""){
          this.numero_actual = "0";
          if (this.operando === "×" || this.operando === "÷") {
            this.numero_actual = "1";
          }
        }
        if(this.operando === "+"){
          this.numero_anterior = String(parseFloat(this.numero_anterior) + parseFloat(this.numero_actual))
        } else if (this.operando === "–"){
          this.numero_anterior = String(parseFloat(this.numero_anterior) - parseFloat(this.numero_actual))
        }else if(this.operando === "×"){
          this.numero_anterior = String(parseFloat(this.numero_anterior) * parseFloat(this.numero_actual))
        }else if(this.operando === "÷"){
          this.numero_anterior = String(parseFloat(this.numero_anterior) / parseFloat(this.numero_actual))
        }

        this.operando = "";
        this.numero_actual = "";
      }else{
        this.operando = "";
      }
    }

    if(tipo === "punto"){
      if(this.operando === ""){
        this.numero_anterior = ""
      }
      if(this.numero_actual === ""){
        this.numero_actual = "0."
      }else if(this.numero_actual.indexOf(".") === -1){
        this.numero_actual += "."
      }
    }

    if(this.operando === ""){
      this.icono_resultado = "fa fa-check";
    }
  }
}

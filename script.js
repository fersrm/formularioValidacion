const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresionesRegulares = {
    nombre:/^[a-zA-ZÀ-ÿ]{2,20}$/,
    apellido:/^[a-zA-ZÀ-ÿ\s]{2,20}$/,
    email:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.]+$/,
    clave:/^[a-zA-Z0-9\_\-]{8,20}$/
}
const campos ={
    nombre:false,
    apellido:false,
    email:false,
    clave:false
}

const validarFromulario = (e) =>{
    switch (e.target.name){
        case "nombre":
           validarCampo(expresionesRegulares.nombre,e.target,'nombre');
        break;
        case "apellido":
            validarCampo(expresionesRegulares.apellido,e.target,'apellido');
        break;
        case "email":
            validarCampo(expresionesRegulares.email,e.target,'email');
        break;
        case "clave":
            validarCampo(expresionesRegulares.clave,e.target,'clave');
        break;
    }
}
const validarCampo = (expresion,input,campo)=>{
    if(expresion.test(input.value)){
        document.getElementById(campo).classList.remove('error');
        document.getElementById(campo).classList.add('correcto');
        campos[campo] = true;
    }else{
        const mensaje=document.querySelector(`#${input.name} .alerta span`);
        if(input.value == ''){
            mensaje.innerHTML="cannot be empty";// pueden ser div con clases y mensajes diferentes que se activen
            if(campo == "email"){
                document.querySelector(`#${campo} input`).placeholder="email@example.com";
            }else{
                document.querySelector(`#${campo} input`).placeholder=" ";
            }
        }else{
            mensaje.innerHTML="does not correspond";
        }
        document.getElementById(campo).classList.add('error');
        campos[campo] = false;
    }
}
inputs.forEach((i) =>{
    i.addEventListener('keyup',validarFromulario);
    i.addEventListener('blur',validarFromulario);
});

formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    inputs.forEach((i) =>{
        //console.log(i.value,i.name);
        validarCampo(expresionesRegulares[i.name],i,i.name);
    });
    if(campos.nombre && campos.apellido && campos.email && campos.clave){
        formulario.reset();
        alert("enviado");
    }

});
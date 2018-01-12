export class Validator {

constructor(form, config) {
    this.elForm = form;
    this.els = config.fields || {}
    this.init();
}

init() {
    this.addFormListener();
}

addFormListener() {
    let formSelector = this.elForm 
    let elForm = document.querySelector(formSelector);
    elForm.addEventListener('submit', this.validate.bind(this), false);
}

validate(e) {
    const elFields = this.els;
    for(let field in elFields) {
        let el = document.querySelector(field);
        let elVal = el.value;

        if(elFields[field].require || elVal === '') {
            console.log(`${el.name} is required`);
        }
         if(elVal.length > elFields[field].maxlength ) {
            console.log(`${el.name} is too long`);
          }
        }
       
        e.preventDefault();
    }

}

const form = new Validator('#form1', {
    fields: {
        '#title_input': {
            required: true,
            maxlength: 2
        }
    }
})
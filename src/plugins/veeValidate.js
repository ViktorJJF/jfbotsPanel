import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, confirmed, length, email } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});

extend("email", {
  ...email,
  message: "This field must be a valid email",
});

extend("confirmed", {
  ...confirmed,
  message: "Las contraseñas no concuerdan",
});

extend("length", {
  ...length,
  message: "This field must have 2 options",
});

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

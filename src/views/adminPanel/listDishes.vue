<template>
  <div>
    <content-title title="Platos disponibles"></content-title>
    <div class="main-content-inner">
      <div class="row">
        <div class="col-lg-8 mt-5">
          <div class="card">
            <div class="card-body">
              <b-row align-h="between" class="mb-3 mx-1">
                <b class="header-title">
                  Total de platos:
                  {{ dishes.length }}
                </b>
                <b-button variant="primary" v-b-modal.modal-lg
                  >Agregar</b-button
                >
              </b-row>
              <div class="single-table">
                <div class="table-responsive">
                  <b-table
                    :table-class="['table', 'text-center']"
                    :thead-tr-class="[
                      'text-uppercase',
                      'bg-success',
                      'text-white',
                    ]"
                    responsive
                    id="my-table"
                    :items="dishes"
                    :per-page="perPage"
                    :current-page="currentPage"
                    :fields="fields"
                  >
                    <template v-slot:cell(N°)="data">
                      {{ data.index + 1 }}
                    </template>
                    <template v-slot:cell(actions)>
                      <b-button size="sm" variant="primary" v-b-modal.modal-lg
                        ><b-icon icon="pencil"></b-icon
                      ></b-button>
                      <b-button size="sm" variant="danger" @click="deleteItem"
                        ><b-icon icon="trash"></b-icon
                      ></b-button>
                    </template>
                  </b-table>
                  <b-modal
                    id="modal-lg"
                    title="Edición de plato"
                    button-size="sm"
                  >
                    <b-form>
                      <b-form-group label="Nombre" label-for="input-1">
                        <b-form-input
                          id="input-1"
                          type="email"
                          required
                          placeholder="Ingresa el nombre"
                        ></b-form-input>
                      </b-form-group>
                      <b-row>
                        <b-col sm="6"
                          ><b-form-group label="Precio" label-for="input-2">
                            <b-form-input
                              id="input-2"
                              type="email"
                              required
                              placeholder="S/."
                            ></b-form-input> </b-form-group
                        ></b-col>
                        <b-col sm="6"
                          ><b-form-group label="Tipo" label-for="input-3">
                            <b-form-select
                              id="input-3"
                              v-model="selectedDishesTypes"
                              :options="dishesTypes"
                              text-field="name"
                              label-field="Seleccione el tipo"
                              value-field="_id"
                            ></b-form-select> </b-form-group
                        ></b-col>
                      </b-row>
                    </b-form>
                    <template v-slot:modal-footer>
                      <b-button variant="success" class="float-right">
                        Guardar
                      </b-button>
                      <b-button variant="outline-danger" class="float-right">
                        Cancelar
                      </b-button>
                    </template>
                  </b-modal>
                </div>
              </div>
              <b-alert variant="danger" show v-show="dishes.length === 0"
                >Aún no hubo interacciones con tu chatbot</b-alert
              >
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
              ></b-pagination>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mt-5">
          <div class="card">
            <div class="card-body">
              <b-row align-h="between" class="mb-3 mx-1">
                <b class="header-title">
                  Tipos
                </b>
                <b-button variant="primary" v-b-modal.modal-lg
                  >Agregar</b-button
                >
              </b-row>
              <div class="single-table">
                <div class="table-responsive">
                  <table class="table text-center">
                    <thead class="text-uppercase bg-warning">
                      <tr class="text-white">
                        <th scope="col">N°</th>
                        <th scope="col">Nombre</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(dishesType, idy) in dishesTypes"
                        :key="dishesType.id"
                      >
                        <th scope="row">{{ idy + 1 }}</th>
                        <td>{{ dishesType.name }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contentTitle from "@/components/adminPanel/contentTitle";
export default {
  components: {
    contentTitle,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      dishes: [],
      dishesTypes: [
        { _id: 1, name: "Entrada" },
        { _id: 2, name: "Segundo" },
        { _id: 1, name: "Postre" },
      ],
      selectedDishesTypes: "1",
      fields: [
        "N°",
        { key: "name", label: "Nombre" },
        { key: "price", label: "Precio" },
        { key: "img", label: "Imagen" },
        { key: "type", label: "Tipo" },
        "actions",
      ],
    };
  },
  async mounted() {
    this.initialData();
    console.log(this.$store.state.dishes);
  },
  methods: {
    async initialData() {
      this.dishes = [];
    },
    deleteItem() {
      confirm("deseas?");
    },
  },
  computed: {
    rows() {
      return this.dishes.length;
    },
  },
};
</script>

<style lang="scss" scoped></style>

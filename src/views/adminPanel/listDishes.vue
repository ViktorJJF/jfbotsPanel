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
                <custom-modal
                  :title="dishesModalTitle"
                  ref="myModal"
                  @onOpenModal="onOpenDishModal"
                >
                  <b-form slot="body">
                    <b-form-group label="Nombre" label-for="input-1">
                      <b-form-input
                        v-model="newDish.name"
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
                            v-model="newDish.price"
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
                            v-model="newDish.type"
                            :options="dishesTypes"
                            text-field="name"
                            label-field="Seleccione el tipo"
                            value-field="_id"
                          ></b-form-select> </b-form-group
                      ></b-col> </b-row
                    ><b-button
                      slot="saveButton"
                      @click="
                        editedIndexDishes > -1
                          ? updateDish(newDish._id, newDish)
                          : createDish(newDish)
                      "
                      variant="success"
                      class="float-right"
                    >
                      Guardar
                    </b-button>
                  </b-form>
                  <b-button
                    slot="saveButton"
                    @click="
                      editedIndexDishes > -1
                        ? updateDish(newDish._id, newDish)
                        : createDish(newDish)
                    "
                    variant="success"
                    class="float-right"
                  >
                    Guardar
                  </b-button>
                  <b-button
                    slot="cancelButton"
                    @click="closeDishModal()"
                    variant="danger"
                    class="float-right"
                  >
                    Cancelar
                  </b-button>
                </custom-modal>
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
                      <b>{{ data.index + 1 }}</b>
                    </template>
                    <template v-slot:cell(actions)="data">
                      <b-button
                        size="sm"
                        variant="primary"
                        @click="editDish(data.item)"
                        ><b-icon icon="pencil"></b-icon
                      ></b-button>
                      <b-button
                        size="sm"
                        variant="danger"
                        @click="deleteDish(data.item._id)"
                        ><b-icon icon="trash"></b-icon
                      ></b-button>
                    </template>
                  </b-table>
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
                <b class="header-title"> Tipos</b>
                <custom-modal ref="myModal2" @onOpenModal="onOpenDishTypeModal">
                  <b-form slot="body">
                    <b-form-group label="Nombre" label-for="input-1">
                      <b-form-input
                        v-model="newDishType.name"
                        id="input-1"
                        type="text"
                        required
                        placeholder="Ingresa el nombre"
                      ></b-form-input>
                    </b-form-group>
                  </b-form>
                  <b-button
                    slot="saveButton"
                    @click="
                      editedIndexDishesTypes > -1
                        ? updateDishType(newDishType._id, newDishType)
                        : createDishType(newDishType)
                    "
                    variant="success"
                    class="float-right"
                  >
                    Guardar
                  </b-button>
                </custom-modal>
              </b-row>
              <div class="single-table">
                <div class="table-responsive">
                  <table class="table text-center">
                    <thead class="text-uppercase bg-warning">
                      <tr class="text-white">
                        <th scope="col">N°</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(dishesType, idy) in dishesTypes"
                        :key="dishesType.id"
                      >
                        <th scope="row">{{ idy + 1 }}</th>
                        <td>{{ dishesType.name }}</td>
                        <td>
                          <b-button
                            size="sm"
                            variant="primary"
                            @click="editDishType(dishesType)"
                            ><b-icon icon="pencil"></b-icon
                          ></b-button>
                          <b-button
                            size="sm"
                            variant="danger"
                            @click="deleteDishType(dishesType._id)"
                            ><b-icon icon="trash"></b-icon
                          ></b-button>
                        </td>
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
import customModal from "@/components/customModal";
import dishObject from "@/classes/dish";
import dishTypeObject from "@/classes/dishType";
import api from "@/services/api";

export default {
  components: {
    contentTitle,
    customModal,
  },
  data() {
    return {
      dishes: [],
      editedIndexDishes: -1,
      dishesTypes: [],
      editedIndexDishesTypes: -1,
      perPage: 10,
      currentPage: 1,
      newDish: dishObject(),
      newDishType: dishTypeObject(),
      selectedDishType: "1",
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
  },
  methods: {
    async initialData() {
      //dishes
      this.$store.commit("showLoadingScreen");
      try {
        if (this.$store.state.dishes.length > 0)
          this.dishes = this.$store.state.dishes;
        else this.dishes = await this.$store.dispatch("getDishes");
        this.dishesTypes = (await api.getDishesTypes()).data.payload;
      } catch (error) {
        this.$store.commit("showErr");
        console.log(error);
      } finally {
        this.$store.commit("showLoadingScreen", false);
      }
    },
    onOpenDishModal() {
      this.clearDishesForm();
    },
    createDish() {
      this.$refs.myModal.hideModal();
      this.$store.dispatch("createDish", this.newDish).then((createdDish) => {
        this.dishes.push(createdDish);
      });
      this.newDish = dishObject();
    },
    deleteDish(id) {
      if (confirm("¿Seguro que deseas eliminar este ítem?")) {
        this.$store
          .dispatch("deleteDish", id)
          .then(() => this.dishes.splice(id, 1));
      }
    },
    editDish(dish) {
      this.editedIndexDishes = this.dishes.indexOf(dish);
      this.newDish = this.$deepCopy(dish);
      this.$refs.myModal.showModal();
    },
    updateDish(id, newDish) {
      console.log("actualizando dish: ", id, newDish);
      this.$store
        .dispatch("updateDish", { id, data: newDish })
        .then((newDish) => {
          let dishIndex = this.dishes.findIndex((dish) => dish._id == id);
          console.log("el indice encontrado: ", dishIndex);
          Object.assign(this.dishes[dishIndex], newDish);
        });
      this.$refs.myModal.hideModal();
    },
    closeDishModal() {
      this.clearDishesForm();
      this.$refs.myModal.hideModal();
    },
    clearDishesForm() {
      this.editedIndexDishes = -1;
      this.newDish = dishObject();
    },
    //dishes types methods
    createDishType() {
      this.$refs.myModal2.hideModal();
      api
        .createDishType(this.newDishType)
        .then((item) => {
          this.dishesTypes.push(item.data.payload);
          this.$store.commit("showSuccess");
        })
        .catch(() => this.$store.commit("showErr"));
      this.newDish = dishTypeObject();
    },
    deleteDishType(id) {
      if (confirm("¿Seguro que deseas eliminar este ítem?")) {
        api
          .deleteDishType(id)
          .then(() => {
            let dishTypeIndex = this.dishesTypes.findIndex(
              (dish) => dish._id == id
            );
            this.dishesTypes.splice(dishTypeIndex, 1);
            this.$store.commit("showSuccess");
          })
          .catch(() => {
            this.$store.commit("showErr");
          });
        this.$refs.myModal2.hideModal();
      }
    },
    editDishType(dishType) {
      console.log("llego este dishType: ", dishType);
      this.editedIndexDishesTypes = this.dishesTypes.indexOf(dishType);
      console.log("el indice es: ", this.dishesTypes);
      this.newDishType = this.$deepCopy(dishType);
      this.$refs.myModal2.showModal();
    },
    updateDishType(id, newDishType) {
      api
        .updateDishType(id, newDishType)
        .then((res) => {
          let dishTypeIndex = this.dishesTypes.findIndex(
            (dish) => dish._id == id
          );
          Object.assign(this.dishesTypes[dishTypeIndex], res.data.payload);
          this.$store.commit("showSuccess");
        })
        .catch(() => {
          this.$store.commit("showErr");
        });
      this.$refs.myModal2.hideModal();
    },
    onOpenDishTypeModal() {
      this.clearDishesTypesForm();
    },
    clearDishesTypesForm() {
      this.editedIndexDishesTypes = -1;
      this.newDishType = dishTypeObject();
    },
  },
  computed: {
    rows() {
      return this.dishes.length;
    },
    dishesModalTitle() {
      return this.editedIndexDishes > -1
        ? "Edición de Plato"
        : "Crear nuevo plato";
    },
  },
};
</script>

<style lang="scss" scoped></style>

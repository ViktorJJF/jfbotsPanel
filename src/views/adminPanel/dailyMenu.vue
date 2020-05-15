<template>
  <div>
    <content-title title="Menú de hoy"></content-title>
    <div class="main content-inner">
      <div class="row">
        <div class="col-lg-12 mt-5">
          <div class="card">
            <div class="card-body">
              <h4 class="header-title">
                Pedidos pendientes a través del <b>chatbot</b>:
              </h4>
              <p>
                Selecciona los tipos de platos que el chatbot mostrará como
                parte del menú diario (si lo hubiera) (Ejemplo: Entradas,
                Segundos, Postres). Si aún no creaste los tipos de platos,
                ingresa
                <router-link :to="{ name: 'listDishes' }">
                  aquí
                </router-link>
              </p>
              <div class="single-table">
                <b-form-checkbox
                  v-for="dishesType in dishesTypes"
                  :key="dishesType._id"
                  v-model="selectedTypes"
                  :value="dishesType._id"
                  :unchecked-value="dishesType._id"
                  name="flavour-4a"
                  inline
                  @change="updateDishTypeToMenu(dishesType._id)"
                  ref="checkboxForm"
                  >{{ dishesType.name }}
                </b-form-checkbox>
                <b-card-group deck>
                  <b-card
                    v-for="type in selectedTypes"
                    :key="type._id"
                    class="card-max-width mt-3"
                    border-variant="primary"
                    :header="getDishType(type)"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
                  >
                    <b-card-text>
                      <ul>
                        <li
                          v-for="dish in getDishesByType(type)"
                          :key="dish._id"
                        >
                          ✔️ {{ dish.name }}
                        </li>
                      </ul>
                      <p v-show="getDishesByType(type).length === 0">
                        ⚠️ No cuentas con platos en esta categoría
                      </p>
                    </b-card-text>
                  </b-card>
                </b-card-group>
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
import api from "@/services/api";
import { mapGetters } from "vuex";
export default {
  components: {
    contentTitle,
  },
  data() {
    return {
      selectedTypes: [],
      dishesTypes: [],
    };
  },
  mounted() {
    this.initialData();
  },
  methods: {
    async initialData() {
      //get dishes types
      this.$store.commit("showLoadingScreen");
      try {
        this.dishesTypes = (await api.getDishesTypes()).data.payload;
        for (const dishType of this.dishesTypes) {
          if (dishType.isMenu) this.selectedTypes.push(dishType._id);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.$store.commit("showLoadingScreen", false);
      }
    },
    getDishType(typeId) {
      return this.dishesTypes.find((type) => type._id == typeId).name;
    },
    async updateDishTypeToMenu(dishTypeId) {
      this.$store.commit("showLoadingScreen");
      try {
        let dishTypeIndex = this.dishesTypes.findIndex(
          (type) => type._id == dishTypeId
        );
        this.dishesTypes[dishTypeIndex].isMenu = !this.dishesTypes[
          dishTypeIndex
        ].isMenu;
        await api.updateDishType(dishTypeId, {
          isMenu: this.dishesTypes[dishTypeIndex].isMenu,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.$store.commit("showLoadingScreen", false);
      }
    },
  },
  computed: {
    ...mapGetters(["getDishesByType"]),
  },
};
</script>

<style lang="scss" scoped>
.card-max-width {
  max-width: 800px;
}
</style>

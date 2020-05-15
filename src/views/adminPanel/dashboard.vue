<template>
  <div>
    <content-title title="Panel de control"></content-title>
    <b-row align-h="center">
      <b-img
        src="assets/images/botProfile.png"
        fluid
        alt="Chatbot Restobot"
        width="300px"
      ></b-img>
    </b-row>
    <b-row align-h="center" class="mb-3">
      <b-card title="¡¡Bienvenido!!" style="max-width: 30rem;">
        <b-card-text>
          <p>
            Estamos emocionados que hayas escogido ampliar tus canales de
            atención al cliente con nuestro amigo <b>Restobot</b>.
          </p>
          <p>
            Esta página será empleada para mostrar
            <b>analíticas</b> próximamente
          </p>
        </b-card-text>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import contentTitle from "@/components/adminPanel/contentTitle";
export default {
  components: {
    contentTitle,
  },
};
</script>

<style lang="scss" scoped></style>
